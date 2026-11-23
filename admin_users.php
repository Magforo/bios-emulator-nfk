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

    $authStmt = $pdo->prepare('SELECT is_admin, can_view_audit, hide_presence_mode FROM users WHERE id = :uid LIMIT 1');
    $authStmt->execute([':uid' => (int)$_SESSION['user_id']]);
    $authUser = $authStmt->fetch(PDO::FETCH_ASSOC);
    $actorUserId = (int)$_SESSION['user_id'];
    $isSuperAdmin = ($actorUserId === 5);
    $canViewAudit = $isSuperAdmin || ((int)($authUser['can_view_audit'] ?? 0) === 1);

    $isAdmin = $isSuperAdmin || ((int)($authUser['is_admin'] ?? 0) === 1);
    if (!$isAdmin) {
        http_response_code(403);
        echo json_encode(['error' => 'Admin access required']);
        exit;
    }

    $logAdminAction = static function (string $action, array $details = []) use ($pdo, $actorUserId): void {
        try {
            $auditStmt = $pdo->prepare('INSERT INTO audit_log (user_id, action, details, ip, timestamp) VALUES (:uid, :action, :details, :ip, :time)');
            $auditStmt->execute([
                ':uid' => $actorUserId,
                ':action' => $action,
                ':details' => json_encode($details, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES),
                ':ip' => $_SERVER['REMOTE_ADDR'] ?? '0.0.0.0',
                ':time' => date('c')
            ]);
        } catch (Throwable $e) {
            error_log('Failed to write audit log: ' . $e->getMessage());
        }
    };

    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        $stmt = $pdo->query('SELECT id, first_name, last_name, avatar_data, last_login, is_admin, is_active, blocked_at, can_view_audit, hide_presence_mode, last_activity_at FROM users ORDER BY id ASC');
        $users = $stmt->fetchAll(PDO::FETCH_ASSOC);

        $nowTs = time();
        foreach ($users as &$user) {
            $lastActivity = trim((string)($user['last_activity_at'] ?? ''));
            $lastActivityTs = $lastActivity !== '' ? (strtotime($lastActivity) ?: 0) : 0;
            $user['is_online'] = $lastActivityTs > 0 && ($nowTs - $lastActivityTs <= 300);
            if ((int)($user['id'] ?? 0) === 5 && (int)($user['hide_presence_mode'] ?? 0) === 1) {
                $user['is_online'] = false;
            }
        }
        unset($user);

        echo json_encode([
            'success' => true,
            'users' => $users,
            'actor' => [
                'user_id' => $actorUserId,
                'is_super_admin' => $isSuperAdmin,
                'is_admin' => $isAdmin,
                'can_view_audit' => $canViewAudit,
                'hide_presence_mode' => ((int)($authUser['hide_presence_mode'] ?? 0) === 1),
            ],
        ]);
        exit;
    }

    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        http_response_code(405);
        echo json_encode(['error' => 'Method not allowed']);
        exit;
    }

    $csrf = $_POST['csrf_token'] ?? '';
    if (!is_string($csrf) || $csrf === '' || empty($_SESSION['csrf_token']) || !hash_equals($_SESSION['csrf_token'], $csrf)) {
        http_response_code(403);
        echo json_encode(['error' => 'CSRF validation failed']);
        exit;
    }

    $action = trim((string)($_POST['action'] ?? ''));
    $targetUserId = (int)($_POST['target_user_id'] ?? 0);

    if ($targetUserId <= 0) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid target user']);
        exit;
    }

    if ($targetUserId === 5 && $action !== 'set_hide_presence_mode') {
        http_response_code(403);
        echo json_encode(['error' => 'Super admin (ID 5) is immutable']);
        exit;
    }

    if (!in_array($action, ['grant_admin', 'revoke_admin', 'block_user', 'unblock_user', 'force_logout', 'grant_audit', 'revoke_audit', 'set_hide_presence_mode'], true)) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid action']);
        exit;
    }

    if ($action === 'revoke_admin' && $targetUserId === (int)$_SESSION['user_id']) {
        http_response_code(403);
        echo json_encode(['error' => 'You cannot revoke your own admin access']);
        exit;
    }

    if (($action === 'block_user' || $action === 'force_logout') && $targetUserId === (int)$_SESSION['user_id']) {
        http_response_code(403);
        echo json_encode(['error' => 'You cannot apply this action to your own account']);
        exit;
    }

    $targetStmt = $pdo->prepare('SELECT id, is_admin, is_active, can_view_audit FROM users WHERE id = :uid LIMIT 1');
    $targetStmt->execute([':uid' => $targetUserId]);
    $targetUser = $targetStmt->fetch(PDO::FETCH_ASSOC);

    if (!$targetUser) {
        http_response_code(404);
        echo json_encode(['error' => 'User not found']);
        exit;
    }

    if (($action === 'grant_audit' || $action === 'revoke_audit') && !$isSuperAdmin) {
        http_response_code(403);
        echo json_encode(['error' => 'Only super admin can manage audit access']);
        exit;
    }

    if ($action === 'set_hide_presence_mode') {
        if (!$isSuperAdmin || $actorUserId !== 5 || $targetUserId !== 5) {
            http_response_code(403);
            echo json_encode(['error' => 'Only super admin (ID 5) can change this mode']);
            exit;
        }
    }

    $newValue = 0;
    if ($action === 'grant_admin' || $action === 'revoke_admin') {
        $newValue = $action === 'grant_admin' ? 1 : 0;
        $updateStmt = $pdo->prepare('UPDATE users SET is_admin = :value, updated_at = :updated WHERE id = :uid');
        $updateStmt->execute([
            ':value' => $newValue,
            ':updated' => date('c'),
            ':uid' => $targetUserId,
        ]);
    }

    if ($action === 'block_user' || $action === 'unblock_user') {
        $newValue = $action === 'block_user' ? 0 : 1;
        $blockedAt = $action === 'block_user' ? date('c') : null;
        $updateStmt = $pdo->prepare('UPDATE users SET is_active = :value, blocked_at = :blocked_at, updated_at = :updated WHERE id = :uid');
        $updateStmt->execute([
            ':value' => $newValue,
            ':blocked_at' => $blockedAt,
            ':updated' => date('c'),
            ':uid' => $targetUserId,
        ]);
    }

    if ($action === 'force_logout') {
        $newValue = 1;
        $updateStmt = $pdo->prepare('UPDATE users SET force_logout_at = :force_at, updated_at = :updated WHERE id = :uid');
        $updateStmt->execute([
            ':force_at' => date('c'),
            ':updated' => date('c'),
            ':uid' => $targetUserId,
        ]);
    }

    if ($action === 'grant_audit' || $action === 'revoke_audit') {
        $newValue = $action === 'grant_audit' ? 1 : 0;
        $updateStmt = $pdo->prepare('UPDATE users SET can_view_audit = :value, updated_at = :updated WHERE id = :uid');
        $updateStmt->execute([
            ':value' => $newValue,
            ':updated' => date('c'),
            ':uid' => $targetUserId,
        ]);
    }

    if ($action === 'set_hide_presence_mode') {
        $requestedMode = (int)($_POST['hide_presence_mode'] ?? -1);
        if ($requestedMode !== 0 && $requestedMode !== 1) {
            http_response_code(400);
            echo json_encode(['error' => 'Invalid hide presence mode value']);
            exit;
        }

        $newValue = $requestedMode;
        $updateStmt = $pdo->prepare('UPDATE users SET hide_presence_mode = :value, updated_at = :updated WHERE id = 5');
        $updateStmt->execute([
            ':value' => $newValue,
            ':updated' => date('c'),
        ]);
    }

    $logAdminAction('ADMIN_USER_ACTION', [
        'action' => $action,
        'target_user_id' => $targetUserId,
        'actor_user_id' => $actorUserId,
    ]);

    echo json_encode([
        'success' => true,
        'action' => $action,
        'target_user_id' => $targetUserId,
        'value' => $newValue,
    ]);
    exit;
} catch (Throwable $e) {
    error_log('admin_users.php error: ' . $e->getMessage());
    http_response_code(500);
    echo json_encode(['error' => 'Failed to process admin user request']);
    exit;
}
