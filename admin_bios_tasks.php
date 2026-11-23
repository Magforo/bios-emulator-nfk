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

    $parseAssignedTaskIds = static function (): array {
        $rawJson = $_POST['assigned_task_ids'] ?? '';
        if (is_string($rawJson) && $rawJson !== '') {
            $decoded = json_decode($rawJson, true);
            if (is_array($decoded)) {
                $ids = [];
                foreach ($decoded as $value) {
                    $id = (int)$value;
                    if ($id > 0) {
                        $ids[] = $id;
                    }
                }
                return array_values(array_unique($ids));
            }
        }

        $rawArray = $_POST['assigned_task_ids'] ?? [];
        if (!is_array($rawArray)) {
            return [];
        }

        $ids = [];
        foreach ($rawArray as $value) {
            $id = (int)$value;
            if ($id > 0) {
                $ids[] = $id;
            }
        }

        return array_values(array_unique($ids));
    };

    $getCatalog = static function (PDO $pdo): array {
        $catalogStmt = $pdo->query('SELECT id, code, title, is_active FROM bios_task_catalog ORDER BY id ASC');
        $rows = $catalogStmt->fetchAll(PDO::FETCH_ASSOC);
        $catalog = [];
        foreach ($rows as $row) {
            $catalog[] = [
                'id' => (int)($row['id'] ?? 0),
                'code' => (string)($row['code'] ?? ''),
                'title' => (string)($row['title'] ?? ''),
                'is_active' => (int)($row['is_active'] ?? 1) === 1,
            ];
        }
        return $catalog;
    };

    $loadUserConfig = static function (PDO $pdo, int $targetUserId): array {
        $userStmt = $pdo->prepare('SELECT id, first_name, last_name FROM users WHERE id = :uid LIMIT 1');
        $userStmt->execute([':uid' => $targetUserId]);
        $targetUser = $userStmt->fetch(PDO::FETCH_ASSOC);
        if (!$targetUser) {
            throw new RuntimeException('User not found');
        }

        $assignedStmt = $pdo->prepare('SELECT uba.task_id FROM user_bios_task_assignments uba INNER JOIN bios_task_catalog btc ON btc.id = uba.task_id WHERE uba.user_id = :uid ORDER BY uba.sort_order ASC, uba.task_id ASC');
        $assignedStmt->execute([':uid' => $targetUserId]);
        $assignedRows = $assignedStmt->fetchAll(PDO::FETCH_ASSOC);

        $assignedTaskIds = [];
        foreach ($assignedRows as $row) {
            $assignedTaskIds[] = (int)($row['task_id'] ?? 0);
        }

        if (!$assignedTaskIds) {
            $defaultsStmt = $pdo->query('SELECT id FROM bios_task_catalog WHERE is_active = 1 ORDER BY id ASC');
            $defaultRows = $defaultsStmt->fetchAll(PDO::FETCH_ASSOC);
            foreach ($defaultRows as $row) {
                $assignedTaskIds[] = (int)($row['id'] ?? 0);
            }
        }

        $settingsStmt = $pdo->prepare('SELECT visible_task_count FROM user_bios_settings WHERE user_id = :uid LIMIT 1');
        $settingsStmt->execute([':uid' => $targetUserId]);
        $settings = $settingsStmt->fetch(PDO::FETCH_ASSOC);

        $maxAllowed = max(1, count($assignedTaskIds));
        $rawVisible = isset($settings['visible_task_count']) ? (int)$settings['visible_task_count'] : min(10, $maxAllowed);
        $visibleTaskCount = max(1, min($maxAllowed, $rawVisible));

        return [
            'user' => [
                'id' => (int)($targetUser['id'] ?? 0),
                'name' => trim((string)($targetUser['first_name'] ?? '') . ' ' . (string)($targetUser['last_name'] ?? '')),
            ],
            'visible_task_count' => $visibleTaskCount,
            'assigned_task_ids' => $assignedTaskIds,
        ];
    };

    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        $action = strtolower(trim((string)($_GET['action'] ?? 'list')));

        if ($action !== 'list' && $action !== 'get_user_config') {
            http_response_code(400);
            echo json_encode(['error' => 'Invalid action']);
            exit;
        }

        $usersStmt = $pdo->query('SELECT id, first_name, last_name, is_active FROM users ORDER BY id ASC');
        $usersRaw = $usersStmt->fetchAll(PDO::FETCH_ASSOC);
        $users = [];
        foreach ($usersRaw as $row) {
            $users[] = [
                'id' => (int)($row['id'] ?? 0),
                'name' => trim((string)($row['first_name'] ?? '') . ' ' . (string)($row['last_name'] ?? '')),
                'is_active' => (int)($row['is_active'] ?? 1) === 1,
            ];
        }

        $catalog = $getCatalog($pdo);

        if ($action === 'list') {
            echo json_encode([
                'success' => true,
                'users' => $users,
                'catalog' => $catalog,
            ]);
            exit;
        }

        $targetUserId = (int)($_GET['target_user_id'] ?? 0);
        if ($targetUserId <= 0) {
            http_response_code(400);
            echo json_encode(['error' => 'Invalid target user']);
            exit;
        }

        try {
            $configData = $loadUserConfig($pdo, $targetUserId);
        } catch (RuntimeException $e) {
            http_response_code(404);
            echo json_encode(['error' => $e->getMessage()]);
            exit;
        }

        echo json_encode([
            'success' => true,
            'users' => $users,
            'catalog' => $catalog,
            'config' => $configData,
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

    $action = strtolower(trim((string)($_POST['action'] ?? '')));
    if ($action !== 'save_user_config') {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid action']);
        exit;
    }

    $targetUserId = (int)($_POST['target_user_id'] ?? 0);
    if ($targetUserId <= 0) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid target user']);
        exit;
    }

    $visibleTaskCount = (int)($_POST['visible_task_count'] ?? 0);
    $assignedTaskIds = $parseAssignedTaskIds();

    if (!$assignedTaskIds) {
        http_response_code(400);
        echo json_encode(['error' => 'At least one task must be selected']);
        exit;
    }

    $placeholders = implode(',', array_fill(0, count($assignedTaskIds), '?'));
    $tasksStmt = $pdo->prepare("SELECT id FROM bios_task_catalog WHERE id IN ($placeholders) AND is_active = 1");
    foreach ($assignedTaskIds as $idx => $taskId) {
        $tasksStmt->bindValue($idx + 1, $taskId, PDO::PARAM_INT);
    }
    $tasksStmt->execute();
    $existingTaskRows = $tasksStmt->fetchAll(PDO::FETCH_ASSOC);
    $existingTaskIds = [];
    foreach ($existingTaskRows as $row) {
        $existingTaskIds[] = (int)($row['id'] ?? 0);
    }

    $missingTaskIds = array_diff($assignedTaskIds, $existingTaskIds);
    if ($missingTaskIds) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid or inactive task IDs in selection']);
        exit;
    }

    $maxVisible = count($assignedTaskIds);
    if ($visibleTaskCount < 1 || $visibleTaskCount > $maxVisible) {
        http_response_code(400);
        echo json_encode(['error' => 'Visible task count must be between 1 and selected task count']);
        exit;
    }

    $userExistsStmt = $pdo->prepare('SELECT id FROM users WHERE id = :uid LIMIT 1');
    $userExistsStmt->execute([':uid' => $targetUserId]);
    if (!$userExistsStmt->fetch(PDO::FETCH_ASSOC)) {
        http_response_code(404);
        echo json_encode(['error' => 'User not found']);
        exit;
    }

    $pdo->beginTransaction();

    $upsertStmt = $pdo->prepare('INSERT INTO user_bios_settings (user_id, visible_task_count, updated_at, updated_by_user_id) VALUES (:uid, :cnt, :updated_at, :updated_by) ON CONFLICT(user_id) DO UPDATE SET visible_task_count = excluded.visible_task_count, updated_at = excluded.updated_at, updated_by_user_id = excluded.updated_by_user_id');
    $upsertStmt->execute([
        ':uid' => $targetUserId,
        ':cnt' => $visibleTaskCount,
        ':updated_at' => date('c'),
        ':updated_by' => $actorUserId,
    ]);

    $deleteAssignStmt = $pdo->prepare('DELETE FROM user_bios_task_assignments WHERE user_id = :uid');
    $deleteAssignStmt->execute([':uid' => $targetUserId]);

    $insertAssignStmt = $pdo->prepare('INSERT INTO user_bios_task_assignments (user_id, task_id, sort_order, assigned_at, assigned_by_user_id) VALUES (:uid, :task_id, :sort_order, :assigned_at, :assigned_by)');
    foreach ($assignedTaskIds as $sort => $taskId) {
        $insertAssignStmt->execute([
            ':uid' => $targetUserId,
            ':task_id' => $taskId,
            ':sort_order' => $sort,
            ':assigned_at' => date('c'),
            ':assigned_by' => $actorUserId,
        ]);
    }

    try {
        $auditStmt = $pdo->prepare('INSERT INTO audit_log (user_id, action, details, ip, timestamp) VALUES (:uid, :action, :details, :ip, :time)');
        $auditStmt->execute([
            ':uid' => $actorUserId,
            ':action' => 'ADMIN_BIOS_TASK_CONFIG_UPDATE',
            ':details' => json_encode([
                'target_user_id' => $targetUserId,
                'visible_task_count' => $visibleTaskCount,
                'assigned_task_count' => count($assignedTaskIds),
            ], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES),
            ':ip' => $_SERVER['REMOTE_ADDR'] ?? '0.0.0.0',
            ':time' => date('c'),
        ]);
    } catch (Throwable $e) {
        error_log('admin_bios_tasks audit error: ' . $e->getMessage());
    }

    $pdo->commit();

    $configData = $loadUserConfig($pdo, $targetUserId);

    echo json_encode([
        'success' => true,
        'config' => $configData,
    ]);
    exit;
} catch (Throwable $e) {
    if (isset($pdo) && $pdo instanceof PDO && $pdo->inTransaction()) {
        $pdo->rollBack();
    }

    error_log('admin_bios_tasks.php error: ' . $e->getMessage());
    http_response_code(500);
    echo json_encode(['error' => 'Failed to process BIOS task configuration']);
    exit;
}
