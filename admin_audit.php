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

    $authStmt = $pdo->prepare('SELECT is_admin, can_view_audit FROM users WHERE id = :uid LIMIT 1');
    $authStmt->execute([':uid' => (int)$_SESSION['user_id']]);
    $authUser = $authStmt->fetch(PDO::FETCH_ASSOC);

    $isSuperAdmin = ((int)$_SESSION['user_id'] === 5);
    $isAdmin = $isSuperAdmin || ((int)($authUser['is_admin'] ?? 0) === 1);
    $canViewAudit = $isSuperAdmin || ((int)($authUser['can_view_audit'] ?? 0) === 1);

    if (!$isAdmin || !$canViewAudit) {
        http_response_code(403);
        echo json_encode(['error' => 'Audit access required']);
        exit;
    }

    $limit = (int)($_GET['limit'] ?? 100);
    if ($limit < 10) {
        $limit = 10;
    }
    if ($limit > 300) {
        $limit = 300;
    }

    $stmt = $pdo->prepare(
        'SELECT a.id, a.user_id, a.action, a.details, a.ip, a.timestamp, u.first_name, u.last_name
         FROM audit_log a
         LEFT JOIN users u ON u.id = a.user_id
         ORDER BY a.timestamp DESC
         LIMIT :limit'
    );
    $stmt->bindValue(':limit', $limit, PDO::PARAM_INT);
    $stmt->execute();
    $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode([
        'success' => true,
        'rows' => $rows,
        'meta' => [
            'is_super_admin' => $isSuperAdmin,
            'can_view_audit' => $canViewAudit,
            'limit' => $limit,
        ],
    ]);
    exit;
} catch (Throwable $e) {
    error_log('admin_audit.php error: ' . $e->getMessage());
    http_response_code(500);
    echo json_encode(['error' => 'Failed to load audit log']);
    exit;
}
