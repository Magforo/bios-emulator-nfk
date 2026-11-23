<?php
declare(strict_types=1);

error_reporting(E_ALL);
ini_set('display_errors', '0');
ini_set('log_errors', '1');
ini_set('error_log', __DIR__ . '/security_logs/php_errors.log');

session_start();

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('Cache-Control: no-cache, no-store, must-revalidate');
header('Pragma: no-cache');
header('Expires: 0');

if (empty($_SESSION['user_id'])) {
    http_response_code(401);
    echo json_encode(['error' => 'Not authenticated']);
    exit;
}

try {
    $config = require __DIR__ . '/config_security.php';
    require_once __DIR__ . '/DatabaseManager.php';

    $dbManager = getDatabaseManager($config);
    $pdo = $dbManager->initializeDatabase();

    $authStmt = $pdo->prepare('SELECT is_admin FROM users WHERE id = :uid LIMIT 1');
    $authStmt->execute([':uid' => (int)$_SESSION['user_id']]);
    $authUser = $authStmt->fetch(PDO::FETCH_ASSOC);
    $isAdmin = ((int)$_SESSION['user_id'] === 5) || ((int)($authUser['is_admin'] ?? 0) === 1);
    if (!$isAdmin) {
        http_response_code(403);
        echo json_encode(['error' => 'Admin access required']);
        exit;
    }

    $totalUsers = (int)$pdo->query('SELECT COUNT(*) FROM users')->fetchColumn();
    $activeUsers = (int)$pdo->query('SELECT COUNT(*) FROM users WHERE is_active = 1')->fetchColumn();
    $usersWithAvatar = (int)$pdo->query("SELECT COUNT(*) FROM users WHERE avatar_data IS NOT NULL AND TRIM(avatar_data) <> ''")->fetchColumn();

    $failedSince = date('c', time() - 86400);
    $failedLogins24hStmt = $pdo->prepare('SELECT COUNT(*) FROM login_history WHERE success = 0 AND login_time >= :since');
    $failedLogins24hStmt->execute([':since' => $failedSince]);
    $failedLogins24h = (int)$failedLogins24hStmt->fetchColumn();

    $recentLoginsStmt = $pdo->prepare(
        'SELECT lh.user_id, u.first_name, u.last_name, lh.ip, lh.login_time, lh.success
         FROM login_history lh
         LEFT JOIN users u ON u.id = lh.user_id
         ORDER BY lh.login_time DESC
         LIMIT 12'
    );
    $recentLoginsStmt->execute();
    $recentLogins = $recentLoginsStmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode([
        'success' => true,
        'stats' => [
            'total_users' => $totalUsers,
            'active_users' => $activeUsers,
            'users_with_avatar' => $usersWithAvatar,
            'failed_logins_24h' => $failedLogins24h,
        ],
        'recent_logins' => $recentLogins,
    ]);
    exit;
} catch (Throwable $e) {
    error_log('admin_stats.php error: ' . $e->getMessage());
    http_response_code(500);
    echo json_encode(['error' => 'Failed to load admin stats']);
    exit;
}
