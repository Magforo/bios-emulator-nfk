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

    $userId = (int)$_SESSION['user_id'];

    $activeBattleStmt = $pdo->prepare('SELECT b.id, b.mode, b.status, b.player1_user_id, b.player2_user_id, b.total_tasks, b.winner_user_id,
            u1.first_name AS p1_first, u1.last_name AS p1_last,
            u2.first_name AS p2_first, u2.last_name AS p2_last
        FROM pvp_battles b
        INNER JOIN users u1 ON u1.id = b.player1_user_id
        INNER JOIN users u2 ON u2.id = b.player2_user_id
        WHERE b.status = \'active\' AND (b.player1_user_id = :uid OR b.player2_user_id = :uid)
        ORDER BY b.id DESC
        LIMIT 1');
    $activeBattleStmt->execute([':uid' => $userId]);
    $activeBattle = $activeBattleStmt->fetch(PDO::FETCH_ASSOC);

    $pvp = null;

    if ($activeBattle) {
        $battleId = (int)($activeBattle['id'] ?? 0);
        $battleTasksStmt = $pdo->prepare('SELECT btc.id, btc.code, btc.title, bt.sort_order
            FROM pvp_battle_tasks bt
            INNER JOIN bios_task_catalog btc ON btc.id = bt.task_id
            WHERE bt.battle_id = :bid AND btc.is_active = 1
            ORDER BY bt.sort_order ASC, bt.task_id ASC');
        $battleTasksStmt->execute([':bid' => $battleId]);
        $battleRows = $battleTasksStmt->fetchAll(PDO::FETCH_ASSOC);

        $tasks = [];
        foreach ($battleRows as $row) {
            $tasks[] = [
                'id' => (int)($row['id'] ?? 0),
                'code' => (string)($row['code'] ?? ''),
                'title' => (string)($row['title'] ?? ''),
            ];
        }

        $countStmt = $pdo->prepare('SELECT user_id, COUNT(*) AS completed_count FROM pvp_battle_task_completions WHERE battle_id = :bid GROUP BY user_id');
        $countStmt->execute([':bid' => $battleId]);
        $completedByUser = [];
        foreach ($countStmt->fetchAll(PDO::FETCH_ASSOC) as $row) {
            $completedByUser[(int)($row['user_id'] ?? 0)] = (int)($row['completed_count'] ?? 0);
        }

        $player1Id = (int)($activeBattle['player1_user_id'] ?? 0);
        $player2Id = (int)($activeBattle['player2_user_id'] ?? 0);
        $opponentId = $player1Id === $userId ? $player2Id : $player1Id;

        $pvp = [
            'battle_id' => $battleId,
            'mode' => (string)($activeBattle['mode'] ?? 'user_random'),
            'status' => (string)($activeBattle['status'] ?? 'active'),
            'total_tasks' => (int)($activeBattle['total_tasks'] ?? count($tasks)),
            'winner_user_id' => (int)($activeBattle['winner_user_id'] ?? 0),
            'my_completed_count' => (int)($completedByUser[$userId] ?? 0),
            'opponent_user_id' => $opponentId,
            'opponent_name' => $opponentId === $player1Id
                ? trim((string)($activeBattle['p1_first'] ?? '') . ' ' . (string)($activeBattle['p1_last'] ?? ''))
                : trim((string)($activeBattle['p2_first'] ?? '') . ' ' . (string)($activeBattle['p2_last'] ?? '')),
            'opponent_completed_count' => (int)($completedByUser[$opponentId] ?? 0),
        ];

        echo json_encode([
            'success' => true,
            'visible_task_count' => count($tasks),
            'tasks' => $tasks,
            'pvp' => $pvp,
        ]);
        exit;
    }

    $assignedStmt = $pdo->prepare('SELECT btc.id, btc.code, btc.title, uba.sort_order FROM user_bios_task_assignments uba INNER JOIN bios_task_catalog btc ON btc.id = uba.task_id WHERE uba.user_id = :uid AND btc.is_active = 1 ORDER BY uba.sort_order ASC, uba.task_id ASC');
    $assignedStmt->execute([':uid' => $userId]);
    $assignedRows = $assignedStmt->fetchAll(PDO::FETCH_ASSOC);

    $tasks = [];
    foreach ($assignedRows as $row) {
        $tasks[] = [
            'id' => (int)($row['id'] ?? 0),
            'code' => (string)($row['code'] ?? ''),
            'title' => (string)($row['title'] ?? ''),
        ];
    }

    if (!$tasks) {
        $fallbackStmt = $pdo->query('SELECT id, code, title FROM bios_task_catalog WHERE is_active = 1 ORDER BY id ASC');
        $fallbackRows = $fallbackStmt->fetchAll(PDO::FETCH_ASSOC);
        foreach ($fallbackRows as $row) {
            $tasks[] = [
                'id' => (int)($row['id'] ?? 0),
                'code' => (string)($row['code'] ?? ''),
                'title' => (string)($row['title'] ?? ''),
            ];
        }
    }

    $settingsStmt = $pdo->prepare('SELECT visible_task_count FROM user_bios_settings WHERE user_id = :uid LIMIT 1');
    $settingsStmt->execute([':uid' => $userId]);
    $settings = $settingsStmt->fetch(PDO::FETCH_ASSOC);

    $taskCount = count($tasks);
    if ($taskCount <= 0) {
        echo json_encode([
            'success' => true,
            'visible_task_count' => 0,
            'tasks' => [],
        ]);
        exit;
    }

    $rawVisible = isset($settings['visible_task_count']) ? (int)$settings['visible_task_count'] : min(10, $taskCount);
    $visibleTaskCount = max(1, min($taskCount, $rawVisible));

    echo json_encode([
        'success' => true,
        'visible_task_count' => $visibleTaskCount,
        'tasks' => $tasks,
        'pvp' => $pvp,
    ]);
    exit;
} catch (Throwable $e) {
    error_log('bios_tasks.php error: ' . $e->getMessage());
    http_response_code(500);
    echo json_encode(['error' => 'Failed to load BIOS tasks']);
    exit;
}
