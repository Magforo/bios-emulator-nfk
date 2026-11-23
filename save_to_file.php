<?php
declare(strict_types=1);
// Secure user registration endpoint with comprehensive protection mechanisms

// Prevent displaying errors to users
error_reporting(E_ALL);
ini_set('display_errors', '0');
ini_set('log_errors', '1');
ini_set('error_log', __DIR__ . '/security_logs/php_errors.log');

session_start();
session_regenerate_id(true);

// Load configuration
$config = require __DIR__ . '/config_security.php';

// Security headers
header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: DENY');
header('X-XSS-Protection: 1; mode=block');
header('Strict-Transport-Security: max-age=31536000; includeSubDomains');
header('Referrer-Policy: strict-origin-when-cross-origin');
header('Permissions-Policy: geolocation=(), microphone=(), camera=()');
header('Cache-Control: no-cache, no-store, must-revalidate');

// Verify HTTPS in production
if (!empty($_SERVER['HTTP_HOST']) && strpos($_SERVER['HTTP_HOST'], 'localhost') === false) {
    if (empty($_SERVER['HTTPS']) || $_SERVER['HTTPS'] === 'off') {
        http_response_code(403);
        echo json_encode(['error' => 'HTTPS required']);
        exit;
    }
}

// Allow only POST with correct Content-Type
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

// Validate Content-Type (accept both urlencoded and multipart form data)
$contentType = $_SERVER['CONTENT_TYPE'] ?? '';
if (strpos($contentType, 'application/x-www-form-urlencoded') === false && 
    strpos($contentType, 'multipart/form-data') === false) {
    http_response_code(415);
    echo json_encode(['error' => 'Invalid Content-Type. Use: application/x-www-form-urlencoded or multipart/form-data']);
    exit;
}

// Load security helpers
require_once __DIR__ . '/SecurityLogger.php';
require_once __DIR__ . '/DatabaseManager.php';

$logger = getSecurityLogger();
$ip = $_SERVER['REMOTE_ADDR'] ?? '0.0.0.0';


// Rate-limiting per IP (only counts FAILED attempts, not successful ones)
$logDir = $config['logging']['security_log_path'];

if (!is_dir($logDir)) {
    @mkdir($logDir, 0700, true);
}

$rateLimit = $logDir . '/rate_limit.json';
$rateLimitData = [];

if (file_exists($rateLimit)) {
    $content = file_get_contents($rateLimit);
    if ($content !== false) {
        $rateLimitData = json_decode($content, true) ?? [];
    }
}

// Clean old entries (older than the time window)
$currentTime = time();
$timeWindow = $config['rate_limit']['time_window'];
foreach ($rateLimitData as $key => $data) {
    if ($currentTime - $data['time'] > $timeWindow) {
        unset($rateLimitData[$key]);
    }
}

// Check IP-based rate limiting (only failed attempts)
$regAttemptLimit = $config['rate_limit']['registration_attempts'];
if (!isset($rateLimitData[$ip])) {
    $rateLimitData[$ip] = ['count' => 0, 'time' => $currentTime];
}

if ($regAttemptLimit[$ip]['count'] >= $regAttemptLimit) {
    $logger->logRateLimitExceeded('registration', $ip);
    http_response_code(429);
    echo json_encode(['error' => 'Too many registration attempts. Try again later.']);
    exit;
}

// Helper function to increment rate limit and return error
function failWithRateLimit($ip, &$rateLimitData, $rateLimit, $statusCode, $message) {
    $currentTime = time();
    if (!isset($rateLimitData[$ip])) {
        $rateLimitData[$ip] = ['count' => 0, 'time' => $currentTime];
    }
    $rateLimitData[$ip]['count']++;
    @file_put_contents($rateLimit, json_encode($rateLimitData), LOCK_EX);
    @chmod($rateLimit, 0600);
    
    http_response_code($statusCode);
    echo json_encode(['error' => $message]);
    exit;
}

// CSRF protection: require token from client that matches session token
if (empty($_SESSION['csrf_token'])) {
    // Generate a new CSRF token if it doesn't exist
    $_SESSION['csrf_token'] = bin2hex(random_bytes($config['csrf']['token_length']));
    $_SESSION['csrf_token_time'] = time();
}

$csrf = $_POST['csrf_token'] ?? '';
if (empty($csrf) || !is_string($csrf)) {
    failWithRateLimit($ip, $rateLimitData, $rateLimit, 400, 'Invalid CSRF token');
}

// Use constant-time comparison to prevent timing attacks
if (!hash_equals($_SESSION['csrf_token'], $csrf)) {
    failWithRateLimit($ip, $rateLimitData, $rateLimit, 403, 'CSRF validation failed');
}

// Collect and validate input
$firstName = trim((string)($_POST['first_name'] ?? ''));
$secondName = trim((string)($_POST['second_name'] ?? ''));
$password = $_POST['password'] ?? '';
$confirmPassword = $_POST['confirm_password'] ?? '';

// Validate password confirmation
if ($password !== $confirmPassword) {
    failWithRateLimit($ip, $rateLimitData, $rateLimit, 400, 'Passwords do not match');
}

// Clear passwords from POST array for security
unset($_POST['password'], $_POST['confirm_password']);

// Basic server-side validation
if ($firstName === '' || $secondName === '') {
    failWithRateLimit($ip, $rateLimitData, $rateLimit, 400, 'First name and last name are required');
}

if (mb_strlen($firstName) > 100 || mb_strlen($secondName) > 100) {
    failWithRateLimit($ip, $rateLimitData, $rateLimit, 400, 'Name is too long');
}

// Password requirements from config
$passwordMinLength = $config['password']['min_length'];
$passwordMaxLength = $config['password']['max_length'];
if (!is_string($password) || mb_strlen($password) < $passwordMinLength) {
    failWithRateLimit($ip, $rateLimitData, $rateLimit, 400, "Password must be at least $passwordMinLength characters");
}

if (mb_strlen($password) > $passwordMaxLength) {
    failWithRateLimit($ip, $rateLimitData, $rateLimit, 400, 'Password is too long');
}

// Password strength validation
$passwordStrength = [
    'hasUppercase' => $config['password']['require_uppercase'] ? preg_match('/[A-Z]/', $password) : true,
    'hasLowercase' => $config['password']['require_lowercase'] ? preg_match('/[a-z]/', $password) : true,
    'hasNumber' => $config['password']['require_numbers'] ? preg_match('/[0-9]/', $password) : true,
    'hasSpecial' => $config['password']['require_special_chars'] ? preg_match('/[!@#$%^&*(),.?":{}|<>]/', $password) : true
];

if (!array_reduce($passwordStrength, function($carry, $item) { return $carry && $item; }, true)) {
    failWithRateLimit($ip, $rateLimitData, $rateLimit, 400, 'Password must contain uppercase, lowercase, numbers, and special characters');
}

// Prevent common weak passwords
$commonPasswords = ['Password1!', '12345678!A', 'Qwerty1!@', 'Admin123!@'];
if (in_array($password, $commonPasswords, true)) {
    failWithRateLimit($ip, $rateLimitData, $rateLimit, 400, 'This password is too common. Please choose a different password.');
}

// Validate name characters (letters, spaces, hyphens, apostrophes)
if (!preg_match('/^[\p{L}\s\-\']+$/u', $firstName) || !preg_match('/^[\p{L}\s\-\']+$/u', $secondName)) {
    failWithRateLimit($ip, $rateLimitData, $rateLimit, 400, 'Name contains invalid characters');
}

// Prevent SQL injection through character validation
if (preg_match('/[;"\'\\\]/', $firstName . $secondName)) {
    failWithRateLimit($ip, $rateLimitData, $rateLimit, 400, 'Invalid characters in name');
}

try {
    // Initialize database
    $dbManager = getDatabaseManager($config);
    $pdo = $dbManager->initializeDatabase();

    // Check if user already exists (prevent duplicate registrations)
    $checkStmt = $pdo->prepare('SELECT id FROM users WHERE first_name = :fn AND last_name = :ln');
    $checkStmt->execute([
        ':fn' => $firstName,
        ':ln' => $secondName
    ]);

    if ($checkStmt->fetch()) {
        failWithRateLimit($ip, $rateLimitData, $rateLimit, 409, 'User with this name already exists');
    }

    // Hash the password securely (uses argon2id)
    $passwordOptions = [
        'memory_cost' => PASSWORD_ARGON2_DEFAULT_MEMORY_COST,
        'time_cost' => PASSWORD_ARGON2_DEFAULT_TIME_COST,
        'threads' => PASSWORD_ARGON2_DEFAULT_THREADS
    ];
    $passwordHash = password_hash($password, PASSWORD_ARGON2ID, $passwordOptions);

    // Get user agent (for security audit trail)
    $userAgent = $_SERVER['HTTP_USER_AGENT'] ?? 'Unknown';
    $userAgent = substr($userAgent, 0, 255);

    // Insert user using prepared statement (prevents SQL injection)
    $stmt = $pdo->prepare('INSERT INTO users (first_name, last_name, password_hash, created_at, ip, user_agent) 
                           VALUES (:fn, :ln, :ph, :ca, :ip, :ua)');
    
    $result = $stmt->execute([
        ':fn' => $firstName,
        ':ln' => $secondName,
        ':ph' => $passwordHash,
        ':ca' => date('c'),
        ':ip' => $ip,
        ':ua' => $userAgent
    ]);

    if (!$result) {
        throw new Exception('Failed to insert user');
    }

    // Also store in password history
    $userId = $pdo->lastInsertId();
    $historyStmt = $pdo->prepare('INSERT INTO password_history (user_id, password_hash, created_at) 
                                  VALUES (:uid, :ph, :ca)');
    $historyStmt->execute([
        ':uid' => $userId,
        ':ph' => $passwordHash,
        ':ca' => date('c')
    ]);

    // Log successful registration
    $logger->logRegistration($firstName, $secondName, $ip, $userId);

    // Clear sensitive variables from memory
    $password = null;
    $confirmPassword = null;
    $passwordHash = null;

    http_response_code(201);
    echo json_encode([
        'success' => true, 
        'message' => 'User registered successfully. You can now log in.',
        'user_id' => (int)$userId
    ]);
    exit;

} catch (PDOException $e) {
    error_log('Database error during registration: ' . $e->getMessage());
    http_response_code(500);
    echo json_encode(['error' => 'Database error occurred. Please try again later.']);
    exit;
} catch (Throwable $e) {
    error_log('Unexpected error during registration: ' . $e->getMessage());
    http_response_code(500);
    echo json_encode(['error' => 'An error occurred. Please try again later.']);
    exit;
}


?>
