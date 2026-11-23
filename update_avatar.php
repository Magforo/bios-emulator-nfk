<?php
declare(strict_types=1);

error_reporting(E_ALL);
ini_set('display_errors', '0');
ini_set('log_errors', '1');
ini_set('error_log', __DIR__ . '/security_logs/php_errors.log');

session_start();

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('Strict-Transport-Security: max-age=31536000; includeSubDomains');

if (!empty($_SERVER['HTTP_HOST']) && strpos($_SERVER['HTTP_HOST'], 'localhost') === false) {
    if (empty($_SERVER['HTTPS']) || $_SERVER['HTTPS'] === 'off') {
        http_response_code(403);
        echo json_encode(['error' => 'HTTPS required']);
        exit;
    }
}

if (empty($_SESSION['user_id'])) {
    http_response_code(401);
    echo json_encode(['error' => 'Not authenticated']);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

$contentType = $_SERVER['CONTENT_TYPE'] ?? '';
if (strpos($contentType, 'application/x-www-form-urlencoded') === false &&
    strpos($contentType, 'multipart/form-data') === false) {
    http_response_code(415);
    echo json_encode(['error' => 'Invalid Content-Type']);
    exit;
}

$csrf = $_POST['csrf_token'] ?? '';
if (!is_string($csrf) || $csrf === '' || empty($_SESSION['csrf_token']) || !hash_equals($_SESSION['csrf_token'], $csrf)) {
    http_response_code(403);
    echo json_encode(['error' => 'CSRF validation failed']);
    exit;
}

$avatarData = trim((string)($_POST['avatar_data'] ?? ''));

if ($avatarData !== '') {
    if (!preg_match('#^data:image/(png|jpeg|jpg|webp|gif);base64,#i', $avatarData)) {
        http_response_code(400);
        echo json_encode(['error' => 'Unsupported image format']);
        exit;
    }

    $base64 = preg_replace('#^data:image/[^;]+;base64,#i', '', $avatarData);
    if (!is_string($base64) || $base64 === '') {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid image data']);
        exit;
    }

    $binary = base64_decode($base64, true);
    if ($binary === false) {
        http_response_code(400);
        echo json_encode(['error' => 'Corrupted image data']);
        exit;
    }

    if (strlen($binary) > 1024 * 1024) {
        http_response_code(400);
        echo json_encode(['error' => 'Avatar must be less than 1MB']);
        exit;
    }
}

try {
    $config = require __DIR__ . '/config_security.php';
    require_once __DIR__ . '/DatabaseManager.php';

    $dbManager = getDatabaseManager($config);
    $pdo = $dbManager->initializeDatabase();

    $stmt = $pdo->prepare('UPDATE users SET avatar_data = :avatar, avatar_updated_at = :updated, updated_at = :updated WHERE id = :uid');
    $stmt->execute([
        ':avatar' => $avatarData,
        ':updated' => date('c'),
        ':uid' => (int)$_SESSION['user_id']
    ]);

    echo json_encode([
        'success' => true,
        'avatar_data' => $avatarData
    ]);
    exit;
} catch (Throwable $e) {
    error_log('Avatar update failed: ' . $e->getMessage());
    http_response_code(500);
    echo json_encode(['error' => 'Failed to save avatar']);
    exit;
}
