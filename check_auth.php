<?php
/**
 * Проверка авторизации пользователя
 * Возвращает JSON с информацией о текущем пользователе или 401 если не авторизован
 */

session_start();

header('Content-Type: application/json; charset=utf-8');

// Проверяем, авторизован ли пользователь
if (empty($_SESSION['user_id'])) {
    http_response_code(401);
    echo json_encode([
        'authenticated' => false,
        'message' => 'Not authenticated'
    ]);
    exit;
}

// Пользователь авторизован - возвращаем его данные
$firstName = trim((string)($_SESSION['first_name'] ?? ''));
$lastName = trim((string)($_SESSION['last_name'] ?? ''));
$userName = trim((string)($_SESSION['user_name'] ?? ''));
$avatarData = '';
$isAdmin = ((int)($_SESSION['user_id'] ?? 0) === 5);
$canViewAudit = ((int)($_SESSION['user_id'] ?? 0) === 5);
$hidePresenceMode = false;
$lastActivityAt = '';
$isOnline = false;

$fullName = trim($firstName . ' ' . $lastName);
if ($fullName === '' && $userName !== '') {
    $fullName = $userName;
}

try {
    require_once __DIR__ . '/config_security.php';
    require_once __DIR__ . '/DatabaseManager.php';

    $config = require __DIR__ . '/config_security.php';
    $dbManager = getDatabaseManager($config);
    $pdo = $dbManager->initializeDatabase();

    $stmt = $pdo->prepare('SELECT avatar_data, is_admin, can_view_audit, hide_presence_mode, is_active, blocked_at, force_logout_at, last_activity_at FROM users WHERE id = :uid LIMIT 1');
    $stmt->execute([':uid' => (int)$_SESSION['user_id']]);
    $userRow = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$userRow) {
        $_SESSION = [];
        session_destroy();
        http_response_code(401);
        echo json_encode([
            'authenticated' => false,
            'message' => 'User not found'
        ]);
        exit;
    }

    if ((int)($userRow['is_active'] ?? 1) !== 1 || !empty($userRow['blocked_at'])) {
        $_SESSION = [];
        session_destroy();
        http_response_code(423);
        echo json_encode([
            'authenticated' => false,
            'message' => 'Account blocked'
        ]);
        exit;
    }

    $loginTimeEpoch = (int)($_SESSION['login_time'] ?? 0);
    $forceLogoutAt = trim((string)($userRow['force_logout_at'] ?? ''));
    if ($forceLogoutAt !== '' && $loginTimeEpoch > 0) {
        $forceLogoutTs = strtotime($forceLogoutAt) ?: 0;
        if ($forceLogoutTs > $loginTimeEpoch) {
            $_SESSION = [];
            session_destroy();
            http_response_code(401);
            echo json_encode([
                'authenticated' => false,
                'message' => 'Session revoked by administrator'
            ]);
            exit;
        }
    }

    $hidePresenceMode = ((int)($_SESSION['user_id'] ?? 0) === 5) && ((int)($userRow['hide_presence_mode'] ?? 0) === 1);

    $nowIso = date('c');
    if (!$hidePresenceMode) {
        $touchStmt = $pdo->prepare('UPDATE users SET last_activity_at = :activity WHERE id = :uid');
        $touchStmt->execute([
            ':activity' => $nowIso,
            ':uid' => (int)$_SESSION['user_id']
        ]);
        $lastActivityAt = $nowIso;
        $isOnline = true;
    } else {
        $lastActivityAt = (string)($userRow['last_activity_at'] ?? '');
        $isOnline = false;
    }

    $avatarData = trim((string)($userRow['avatar_data'] ?? ''));
    $isAdmin = ((int)($_SESSION['user_id'] ?? 0) === 5) || ((int)($userRow['is_admin'] ?? 0) === 1);
    $canViewAudit = ((int)($_SESSION['user_id'] ?? 0) === 5) || ((int)($userRow['can_view_audit'] ?? 0) === 1);
} catch (Throwable $e) {
    error_log('Failed to load avatar in check_auth.php: ' . $e->getMessage());
}

http_response_code(200);
echo json_encode([
    'authenticated' => true,
    'user_id' => $_SESSION['user_id'],
    'first_name' => $firstName,
    'last_name' => $lastName,
    'user_name' => $userName,
    'avatar_data' => $avatarData,
    'is_admin' => $isAdmin,
    'can_view_audit' => $canViewAudit,
    'hide_presence_mode' => $hidePresenceMode,
    'last_activity_at' => $lastActivityAt,
    'is_online' => $isOnline,
    'login_time' => $_SESSION['login_time'] ?? '',
    'full_name' => $fullName
]);
?>
