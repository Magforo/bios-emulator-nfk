<?php
declare(strict_types=1);
/**
 * Смена пароля для авторизованного пользователя
 */

error_reporting(E_ALL);
ini_set('display_errors', '0');
ini_set('log_errors', '1');
ini_set('error_log', __DIR__ . '/security_logs/php_errors.log');

session_start();

// Load configuration
$config = require __DIR__ . '/config_security.php';

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('Strict-Transport-Security: max-age=31536000; includeSubDomains');

// Verify HTTPS in production
if (!empty($_SERVER['HTTP_HOST']) && strpos($_SERVER['HTTP_HOST'], 'localhost') === false) {
    if (empty($_SERVER['HTTPS']) || $_SERVER['HTTPS'] === 'off') {
        http_response_code(403);
        echo json_encode(['error' => 'HTTPS required']);
        exit;
    }
}

// Check if user is logged in
if (empty($_SESSION['user_id'])) {
    http_response_code(401);
    echo json_encode(['error' => 'Not authenticated']);
    exit;
}

// Only allow POST
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

require_once __DIR__ . '/SecurityLogger.php';
require_once __DIR__ . '/DatabaseManager.php';

$logger = getSecurityLogger();
$ip = $_SERVER['REMOTE_ADDR'] ?? '0.0.0.0';
$userId = $_SESSION['user_id'];

// Get input
$oldPassword = $_POST['old_password'] ?? '';
$newPassword = $_POST['new_password'] ?? '';
$confirmPassword = $_POST['confirm_password'] ?? '';

// Validate input
if (!is_string($oldPassword) || !is_string($newPassword) || !is_string($confirmPassword)) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid input']);
    exit;
}

if ($oldPassword === '' || $newPassword === '' || $confirmPassword === '') {
    http_response_code(400);
    echo json_encode(['error' => 'All fields are required']);
    exit;
}

// Check if new passwords match
if ($newPassword !== $confirmPassword) {
    http_response_code(400);
    echo json_encode(['error' => 'New passwords do not match']);
    exit;
}

// Check if new password is same as old
if ($oldPassword === $newPassword) {
    http_response_code(400);
    echo json_encode(['error' => 'New password must be different from old password']);
    exit;
}

// Validate new password strength
$passwordMinLength = $config['password']['min_length'];
$passwordMaxLength = $config['password']['max_length'];

if (mb_strlen($newPassword) < $passwordMinLength) {
    http_response_code(400);
    echo json_encode(['error' => "Password must be at least $passwordMinLength characters"]);
    exit;
}

if (mb_strlen($newPassword) > $passwordMaxLength) {
    http_response_code(400);
    echo json_encode(['error' => 'Password is too long']);
    exit;
}

// Check password strength
$passwordStrength = [
    'hasUppercase' => $config['password']['require_uppercase'] ? preg_match('/[A-Z]/', $newPassword) : true,
    'hasLowercase' => $config['password']['require_lowercase'] ? preg_match('/[a-z]/', $newPassword) : true,
    'hasNumber' => $config['password']['require_numbers'] ? preg_match('/[0-9]/', $newPassword) : true,
    'hasSpecial' => $config['password']['require_special_chars'] ? preg_match('/[!@#$%^&*(),.?":{}|<>]/', $newPassword) : true
];

if (!array_reduce($passwordStrength, function($carry, $item) { return $carry && $item; }, true)) {
    http_response_code(400);
    echo json_encode(['error' => 'Password must contain uppercase, lowercase, numbers, and special characters']);
    exit;
}

try {
    // Get connection to database
    $dbManager = getDatabaseManager($config);
    $pdo = $dbManager->initializeDatabase();

    // Get user and verify old password
    $stmt = $pdo->prepare('SELECT password_hash FROM users WHERE id = :uid');
    $stmt->execute([':uid' => $userId]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$user) {
        $logger->logInvalidInput('user_not_found', $ip);
        http_response_code(404);
        echo json_encode(['error' => 'User not found']);
        exit;
    }

    // Verify old password
    if (!password_verify($oldPassword, $user['password_hash'])) {
        $logger->logSuspiciousActivity('PASSWORD_CHANGE_FAILED', $ip, "User ID: $userId - Old password incorrect");
        http_response_code(401);
        echo json_encode(['error' => 'Current password is incorrect']);
        exit;
    }

    // Check password history (prevent reuse of last 5 passwords)
    $passwordHistoryCount = $config['account']['password_history_count'];
    $historyStmt = $pdo->prepare("
        SELECT password_hash FROM password_history 
        WHERE user_id = :uid 
        ORDER BY created_at DESC 
        LIMIT :count
    ");
    $historyStmt->bindValue(':uid', $userId, PDO::PARAM_INT);
    $historyStmt->bindValue(':count', $passwordHistoryCount, PDO::PARAM_INT);
    $historyStmt->execute();
    
    $passwordHistory = $historyStmt->fetchAll(PDO::FETCH_ASSOC);
    
    foreach ($passwordHistory as $oldHash) {
        if (password_verify($newPassword, $oldHash['password_hash'])) {
            http_response_code(400);
            echo json_encode(['error' => "Cannot reuse one of your last $passwordHistoryCount passwords"]);
            exit;
        }
    }

    // Hash new password
    $passwordOptions = [
        'memory_cost' => PASSWORD_ARGON2_DEFAULT_MEMORY_COST,
        'time_cost' => PASSWORD_ARGON2_DEFAULT_TIME_COST,
        'threads' => PASSWORD_ARGON2_DEFAULT_THREADS
    ];
    $newPasswordHash = password_hash($newPassword, PASSWORD_ARGON2ID, $passwordOptions);

    // Update password
    $updateStmt = $pdo->prepare('UPDATE users SET password_hash = :ph, updated_at = :ua WHERE id = :uid');
    $result = $updateStmt->execute([
        ':ph' => $newPasswordHash,
        ':ua' => date('c'),
        ':uid' => $userId
    ]);

    if (!$result) {
        throw new Exception('Failed to update password');
    }

    // Store in password history
    $historyInsertStmt = $pdo->prepare('INSERT INTO password_history (user_id, password_hash, created_at) VALUES (:uid, :ph, :ca)');
    $historyInsertStmt->execute([
        ':uid' => $userId,
        ':ph' => $newPasswordHash,
        ':ca' => date('c')
    ]);

    // Log password change
    error_log("Password changed for user ID: $userId from IP: $ip at " . date('Y-m-d H:i:s'));

    // Clear sensitive data
    $oldPassword = null;
    $newPassword = null;
    $confirmPassword = null;

    http_response_code(200);
    echo json_encode([
        'success' => true,
        'message' => 'Password changed successfully'
    ]);
    exit;

} catch (PDOException $e) {
    error_log('Database error during password change: ' . $e->getMessage());
    http_response_code(500);
    echo json_encode(['error' => 'Database error occurred']);
    exit;
} catch (Throwable $e) {
    error_log('Unexpected error during password change: ' . $e->getMessage());
    http_response_code(500);
    echo json_encode(['error' => 'An error occurred']);
    exit;
}
?>
