<?php
declare(strict_types=1);

// Secure login endpoint
error_reporting(E_ALL);
ini_set('display_errors', '0');
ini_set('log_errors', '1');
ini_set('error_log', __DIR__ . '/security_logs/php_errors.log');

session_start();
session_regenerate_id(true);

// Security headers
header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: DENY');
header('X-XSS-Protection: 1; mode=block');
header('Strict-Transport-Security: max-age=31536000; includeSubDomains');
header('Referrer-Policy: strict-origin-when-cross-origin');

// Verify HTTPS in production
if (!empty($_SERVER['HTTP_HOST']) && strpos($_SERVER['HTTP_HOST'], 'localhost') === false) {
    if (empty($_SERVER['HTTPS']) || $_SERVER['HTTPS'] === 'off') {
        http_response_code(403);
        echo json_encode(['error' => 'HTTPS required']);
        exit;
    }
}

// Allow only POST
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
    echo json_encode(['error' => 'Invalid Content-Type']);
    exit;
}

$ip = $_SERVER['REMOTE_ADDR'] ?? '0.0.0.0';
$logDir = __DIR__ . '/security_logs';

if (!is_dir($logDir)) {
    @mkdir($logDir, 0700, true);
}

// CSRF protection
if (empty($_SESSION['csrf_token'])) {
    $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
}

$csrf = $_POST['csrf_token'] ?? '';
if (empty($csrf) || !hash_equals($_SESSION['csrf_token'], $csrf)) {
    http_response_code(403);
    echo json_encode(['error' => 'CSRF validation failed']);
    exit;
}

// Validate input
$firstName = trim((string)($_POST['first_name'] ?? ''));
$secondName = trim((string)($_POST['second_name'] ?? ''));
$password = $_POST['password'] ?? '';

// Basic validation
if ($firstName === '' || $secondName === '' || $password === '') {
    http_response_code(400);
    echo json_encode(['error' => 'All fields are required']);
    exit;
}

if (!is_string($password) || mb_strlen($password) < 1) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid password']);
    exit;
}

// Sanitize names
if (!preg_match('/^[\p{L}\s\-\']+$/u', $firstName) || !preg_match('/^[\p{L}\s\-\']+$/u', $secondName)) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid characters in name']);
    exit;
}

if (mb_strlen($firstName) > 100 || mb_strlen($secondName) > 100) {
    http_response_code(400);
    echo json_encode(['error' => 'Name too long']);
    exit;
}

try {
    // Connect to database
    $dbFile = __DIR__ . '/data/userdata.sqlite';
    if (!file_exists($dbFile)) {
        http_response_code(401);
        echo json_encode(['error' => 'Invalid credentials']);
        exit;
    }

    $config = require __DIR__ . '/config_security.php';
    require_once __DIR__ . '/DatabaseManager.php';
    $dbManager = getDatabaseManager($config);
    $pdo = $dbManager->initializeDatabase();

    // Find user by name
    $stmt = $pdo->prepare('SELECT id, password_hash, locked_until, is_active, blocked_at, hide_presence_mode FROM users WHERE first_name = :fn AND last_name = :ln LIMIT 1');
    $stmt->execute([
        ':fn' => $firstName,
        ':ln' => $secondName
    ]);

    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    // Check if user exists and is not locked
    if (!$user) {
        error_log("Login failed: User not found ($firstName $secondName) from IP: $ip");
        http_response_code(401);
        echo json_encode(['error' => 'Invalid credentials']);
        exit;
    }

    if ((int)($user['is_active'] ?? 1) !== 1 || !empty($user['blocked_at'])) {
        http_response_code(423);
        echo json_encode(['error' => 'Account is blocked. Contact administrator.']);
        error_log("Blocked account login attempt: User ID {$user['id']} from IP: $ip");
        exit;
    }

    // Check if user account is locked
    if (!empty($user['locked_until'])) {
        $lockedUntil = strtotime($user['locked_until']);
        if ($lockedUntil > time()) {
            http_response_code(429);
            echo json_encode(['error' => 'Account is temporarily locked. Try again later.']);
            error_log("Locked account login attempt: User ID {$user['id']} from IP: $ip");
            exit;
        } else {
            // Unlock account
            $unlockStmt = $pdo->prepare('UPDATE users SET locked_until = NULL, login_attempts = 0 WHERE id = :id');
            $unlockStmt->execute([':id' => $user['id']]);
        }
    }

    // Verify password
    if (!password_verify($password, $user['password_hash'])) {
        // Update failed login attempt
        $failStmt = $pdo->prepare('UPDATE users SET login_attempts = login_attempts + 1 WHERE id = :id');
        $failStmt->execute([':id' => $user['id']]);

        // Lock account after 5 failed attempts
        $attempts = ($user['login_attempts'] ?? 0) + 1;
        if ($attempts >= 5) {
            $lockUntil = date('c', time() + 1800); // Lock for 30 minutes
            $lockStmt = $pdo->prepare('UPDATE users SET locked_until = :locked WHERE id = :id');
            $lockStmt->execute([
                ':locked' => $lockUntil,
                ':id' => $user['id']
            ]);
            error_log("Account locked due to too many failed attempts: User ID {$user['id']} from IP: $ip");
            http_response_code(429);
            echo json_encode(['error' => 'Too many failed login attempts. Account locked for 30 minutes.']);
            exit;
        }

        error_log("Failed login attempt for user ID {$user['id']} from IP: $ip (attempt {$attempts})");
        
        // Log failed attempt
        $logStmt = $pdo->prepare('INSERT INTO login_history (user_id, ip, user_agent, login_time, success) VALUES (:uid, :ip, :ua, :time, 0)');
        $logStmt->execute([
            ':uid' => $user['id'],
            ':ip' => $ip,
            ':ua' => substr($_SERVER['HTTP_USER_AGENT'] ?? 'Unknown', 0, 255),
            ':time' => date('c')
        ]);
        
        http_response_code(401);
        echo json_encode(['error' => 'Invalid credentials']);
        exit;
    }

    // Successful login
    // Reset login attempts, but keep login/activity frozen for super admin hidden mode
    $hidePresenceMode = ((int)$user['id'] === 5) && ((int)($user['hide_presence_mode'] ?? 0) === 1);
    if ($hidePresenceMode) {
        $resetStmt = $pdo->prepare('UPDATE users SET login_attempts = 0, locked_until = NULL, force_logout_at = NULL WHERE id = :id');
        $resetStmt->execute([
            ':id' => $user['id']
        ]);
    } else {
        $resetStmt = $pdo->prepare('UPDATE users SET login_attempts = 0, locked_until = NULL, last_login = :last, last_activity_at = :activity, force_logout_at = NULL WHERE id = :id');
        $resetStmt->execute([
            ':last' => date('c'),
            ':activity' => date('c'),
            ':id' => $user['id']
        ]);
    }

    // Log successful login
    $logStmt = $pdo->prepare('INSERT INTO login_history (user_id, ip, user_agent, login_time, success) VALUES (:uid, :ip, :ua, :time, 1)');
    $logStmt->execute([
        ':uid' => $user['id'],
        ':ip' => $ip,
        ':ua' => substr($_SERVER['HTTP_USER_AGENT'] ?? 'Unknown', 0, 255),
        ':time' => date('c')
    ]);

    // Create secure session
    $_SESSION['user_id'] = (int)$user['id'];
    $_SESSION['user_name'] = $firstName . ' ' . $secondName;
    $_SESSION['login_time'] = time();
    $_SESSION['ip'] = $ip;
    $_SESSION['user_agent'] = $_SERVER['HTTP_USER_AGENT'] ?? '';

    error_log("User logged in successfully: User ID {$user['id']} ($firstName $secondName) from IP: $ip");

    // Clear password from memory
    $password = null;

    http_response_code(200);
    echo json_encode([
        'success' => true,
        'message' => 'Login successful',
        'user_id' => (int)$user['id']
    ]);
    exit;

} catch (PDOException $e) {
    error_log('Database error during login: ' . $e->getMessage());
    http_response_code(500);
    echo json_encode(['error' => 'Server error occurred']);
    exit;
} catch (Throwable $e) {
    error_log('Unexpected error during login: ' . $e->getMessage());
    http_response_code(500);
    echo json_encode(['error' => 'An error occurred']);
    exit;
}
?>
