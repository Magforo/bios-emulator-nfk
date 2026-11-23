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

    $actorUserId = (int)$_SESSION['user_id'];

    $authStmt = $pdo->prepare('SELECT is_admin FROM users WHERE id = :uid LIMIT 1');
    $authStmt->execute([':uid' => $actorUserId]);
    $authUser = $authStmt->fetch(PDO::FETCH_ASSOC);

    $isSuperAdmin = ($actorUserId === 5);
    $isAdmin = $isSuperAdmin || ((int)($authUser['is_admin'] ?? 0) === 1);

    if (!$isAdmin) {
        http_response_code(403);
        echo json_encode(['error' => 'Admin access required']);
        exit;
    }

    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        $ownerUserId = $actorUserId;
        $requestedOwner = (int)($_GET['owner_user_id'] ?? 0);
        $viewMode = strtolower(trim((string)($_GET['view'] ?? 'active')));
        $viewMode = $viewMode === 'deleted' ? 'deleted' : 'active';

        if ($viewMode === 'deleted' && !$isSuperAdmin) {
            http_response_code(403);
            echo json_encode(['error' => 'Only super admin can view deleted photos']);
            exit;
        }

        if ($isSuperAdmin && $requestedOwner > 0) {
            $ownerCheckStmt = $pdo->prepare('SELECT id, is_admin FROM users WHERE id = :uid LIMIT 1');
            $ownerCheckStmt->execute([':uid' => $requestedOwner]);
            $ownerUser = $ownerCheckStmt->fetch(PDO::FETCH_ASSOC);

            if (!$ownerUser) {
                http_response_code(404);
                echo json_encode(['error' => 'Gallery owner not found']);
                exit;
            }

            $ownerIsAdmin = ((int)$ownerUser['id'] === 5) || ((int)($ownerUser['is_admin'] ?? 0) === 1);
            if (!$ownerIsAdmin) {
                http_response_code(403);
                echo json_encode(['error' => 'Selected user is not an admin']);
                exit;
            }

            $ownerUserId = (int)$ownerUser['id'];
        }

        $itemsStmt = $pdo->prepare('SELECT id, owner_user_id, image_data, caption, created_at, deleted_at, deleted_by_user_id FROM admin_gallery WHERE owner_user_id = :uid AND deleted_at IS ' . ($viewMode === 'deleted' ? 'NOT NULL' : 'NULL') . ' ORDER BY created_at DESC, id DESC');
        $itemsStmt->execute([':uid' => $ownerUserId]);
        $items = $itemsStmt->fetchAll(PDO::FETCH_ASSOC);

        $adminUsersStmt = $pdo->query('SELECT id, first_name, last_name, is_admin FROM users WHERE id = 5 OR is_admin = 1 ORDER BY id ASC');
        $adminUsersRaw = $adminUsersStmt->fetchAll(PDO::FETCH_ASSOC);
        $adminUsers = [];
        foreach ($adminUsersRaw as $adminUser) {
            $adminUsers[] = [
                'id' => (int)($adminUser['id'] ?? 0),
                'name' => trim((string)($adminUser['first_name'] ?? '') . ' ' . (string)($adminUser['last_name'] ?? '')),
            ];
        }

        echo json_encode([
            'success' => true,
            'owner_user_id' => $ownerUserId,
            'view' => $viewMode,
            'can_view_deleted' => $isSuperAdmin,
            'items' => $items,
            'admin_users' => $adminUsers,
            'actor' => [
                'user_id' => $actorUserId,
                'is_super_admin' => $isSuperAdmin,
                'is_admin' => $isAdmin,
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

    $action = strtolower(trim((string)($_POST['action'] ?? 'upload')));

    if ($action === 'delete') {
        $photoId = (int)($_POST['photo_id'] ?? 0);
        if ($photoId <= 0) {
            http_response_code(400);
            echo json_encode(['error' => 'Invalid photo ID']);
            exit;
        }

        $photoStmt = $pdo->prepare('SELECT id, owner_user_id, deleted_at FROM admin_gallery WHERE id = :id LIMIT 1');
        $photoStmt->execute([':id' => $photoId]);
        $photo = $photoStmt->fetch(PDO::FETCH_ASSOC);
        if (!$photo) {
            http_response_code(404);
            echo json_encode(['error' => 'Photo not found']);
            exit;
        }

        $ownerUserId = (int)($photo['owner_user_id'] ?? 0);
        if (!$isSuperAdmin && $ownerUserId !== $actorUserId) {
            http_response_code(403);
            echo json_encode(['error' => 'You can delete only your own photos']);
            exit;
        }

        if (!empty($photo['deleted_at'])) {
            echo json_encode([
                'success' => true,
                'message' => 'Photo already deleted',
                'photo_id' => $photoId,
                'owner_user_id' => $ownerUserId,
            ]);
            exit;
        }

        $deleteStmt = $pdo->prepare('UPDATE admin_gallery SET deleted_at = :deleted_at, deleted_by_user_id = :deleted_by WHERE id = :id');
        $deleteStmt->execute([
            ':deleted_at' => date('c'),
            ':deleted_by' => $actorUserId,
            ':id' => $photoId,
        ]);

        try {
            $auditStmt = $pdo->prepare('INSERT INTO audit_log (user_id, action, details, ip, timestamp) VALUES (:uid, :action, :details, :ip, :time)');
            $auditStmt->execute([
                ':uid' => $actorUserId,
                ':action' => 'ADMIN_GALLERY_DELETE',
                ':details' => json_encode([
                    'photo_id' => $photoId,
                    'owner_user_id' => $ownerUserId,
                ], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES),
                ':ip' => $_SERVER['REMOTE_ADDR'] ?? '0.0.0.0',
                ':time' => date('c'),
            ]);
        } catch (Throwable $e) {
            error_log('admin_gallery audit delete error: ' . $e->getMessage());
        }

        echo json_encode([
            'success' => true,
            'message' => 'Photo deleted',
            'photo_id' => $photoId,
            'owner_user_id' => $ownerUserId,
        ]);
        exit;
    }

    if ($action !== 'upload') {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid gallery action']);
        exit;
    }

    $imageData = trim((string)($_POST['image_data'] ?? ''));
    $caption = trim((string)($_POST['caption'] ?? ''));

    if ($imageData === '') {
        http_response_code(400);
        echo json_encode(['error' => 'Image data is required']);
        exit;
    }

    if (!preg_match('/^data:image\/(png|jpe?g|webp|gif);base64,[a-zA-Z0-9+\/=\r\n]+$/', $imageData)) {
        http_response_code(400);
        echo json_encode(['error' => 'Only PNG/JPG/WEBP/GIF images are allowed']);
        exit;
    }

    if (strlen($imageData) > 3_500_000) {
        http_response_code(400);
        echo json_encode(['error' => 'Image is too large']);
        exit;
    }

    if (mb_strlen($caption) > 160) {
        $caption = mb_substr($caption, 0, 160);
    }

    $insertStmt = $pdo->prepare('INSERT INTO admin_gallery (owner_user_id, image_data, caption, created_at, deleted_at, deleted_by_user_id) VALUES (:owner_user_id, :image_data, :caption, :created_at, NULL, NULL)');
    $insertStmt->execute([
        ':owner_user_id' => $actorUserId,
        ':image_data' => $imageData,
        ':caption' => $caption,
        ':created_at' => date('c'),
    ]);

    try {
        $auditStmt = $pdo->prepare('INSERT INTO audit_log (user_id, action, details, ip, timestamp) VALUES (:uid, :action, :details, :ip, :time)');
        $auditStmt->execute([
            ':uid' => $actorUserId,
            ':action' => 'ADMIN_GALLERY_UPLOAD',
            ':details' => json_encode(['caption' => $caption], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES),
            ':ip' => $_SERVER['REMOTE_ADDR'] ?? '0.0.0.0',
            ':time' => date('c'),
        ]);
    } catch (Throwable $e) {
        error_log('admin_gallery audit error: ' . $e->getMessage());
    }

    echo json_encode([
        'success' => true,
        'message' => 'Image uploaded',
        'owner_user_id' => $actorUserId,
    ]);
    exit;
} catch (Throwable $e) {
    error_log('admin_gallery.php error: ' . $e->getMessage());
    http_response_code(500);
    echo json_encode(['error' => 'Failed to process gallery request']);
    exit;
}
