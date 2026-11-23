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

    $authStmt = $pdo->prepare('SELECT id, first_name, last_name, is_admin, is_active, blocked_at FROM users WHERE id = :uid LIMIT 1');
    $authStmt->execute([':uid' => $actorUserId]);
    $actor = $authStmt->fetch(PDO::FETCH_ASSOC);

    if (!$actor || (int)($actor['is_active'] ?? 1) !== 1 || !empty($actor['blocked_at'])) {
        http_response_code(403);
        echo json_encode(['error' => 'Account is blocked']);
        exit;
    }

    $isSuperAdmin = ($actorUserId === 5);
    $isAdmin = $isSuperAdmin || ((int)($actor['is_admin'] ?? 0) === 1);

    $logAction = static function (PDO $pdo, int $actorUserId, string $action, array $details = []): void {
        try {
            $stmt = $pdo->prepare('INSERT INTO audit_log (user_id, action, details, ip, timestamp) VALUES (:uid, :action, :details, :ip, :time)');
            $stmt->execute([
                ':uid' => $actorUserId,
                ':action' => $action,
                ':details' => json_encode($details, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES),
                ':ip' => $_SERVER['REMOTE_ADDR'] ?? '0.0.0.0',
                ':time' => date('c'),
            ]);
        } catch (Throwable $e) {
            error_log('pvp_battles audit error: ' . $e->getMessage());
        }
    };

    $findActiveBattleForUser = static function (PDO $pdo, int $userId): ?array {
        $stmt = $pdo->prepare('SELECT b.id, b.mode, b.status, b.player1_user_id, b.player2_user_id, b.total_tasks, b.winner_user_id, b.created_at, b.started_at, b.ended_at,
                u1.first_name AS p1_first, u1.last_name AS p1_last,
                u2.first_name AS p2_first, u2.last_name AS p2_last
            FROM pvp_battles b
            INNER JOIN users u1 ON u1.id = b.player1_user_id
            INNER JOIN users u2 ON u2.id = b.player2_user_id
            WHERE b.status = \'active\' AND (b.player1_user_id = :uid OR b.player2_user_id = :uid)
            ORDER BY b.id DESC
            LIMIT 1');
        $stmt->execute([':uid' => $userId]);
        $battle = $stmt->fetch(PDO::FETCH_ASSOC);
        if (!$battle) {
            return null;
        }

        $battleId = (int)($battle['id'] ?? 0);
        $countStmt = $pdo->prepare('SELECT user_id, COUNT(*) AS completed_count FROM pvp_battle_task_completions WHERE battle_id = :bid GROUP BY user_id');
        $countStmt->execute([':bid' => $battleId]);
        $completedMap = [];
        foreach ($countStmt->fetchAll(PDO::FETCH_ASSOC) as $row) {
            $completedMap[(int)($row['user_id'] ?? 0)] = (int)($row['completed_count'] ?? 0);
        }

        $player1Id = (int)($battle['player1_user_id'] ?? 0);
        $player2Id = (int)($battle['player2_user_id'] ?? 0);

        return [
            'id' => $battleId,
            'mode' => (string)($battle['mode'] ?? 'user_random'),
            'status' => (string)($battle['status'] ?? 'active'),
            'total_tasks' => (int)($battle['total_tasks'] ?? 0),
            'winner_user_id' => (int)($battle['winner_user_id'] ?? 0),
            'created_at' => (string)($battle['created_at'] ?? ''),
            'started_at' => (string)($battle['started_at'] ?? ''),
            'ended_at' => (string)($battle['ended_at'] ?? ''),
            'player1' => [
                'id' => $player1Id,
                'name' => trim((string)($battle['p1_first'] ?? '') . ' ' . (string)($battle['p1_last'] ?? '')),
                'completed_count' => (int)($completedMap[$player1Id] ?? 0),
            ],
            'player2' => [
                'id' => $player2Id,
                'name' => trim((string)($battle['p2_first'] ?? '') . ' ' . (string)($battle['p2_last'] ?? '')),
                'completed_count' => (int)($completedMap[$player2Id] ?? 0),
            ],
        ];
    };

    $formatBattleForViewer = static function (?array $battle, int $viewerUserId): ?array {
        if (!$battle) {
            return null;
        }

        $battleId = (int)($battle['id'] ?? 0);
        $player1Id = (int)($battle['player1']['id'] ?? 0);
        $player2Id = (int)($battle['player2']['id'] ?? 0);

        if ($battleId <= 0 || $player1Id <= 0 || $player2Id <= 0) {
            return null;
        }

        $isViewerPlayer1 = $viewerUserId === $player1Id;
        $opponentId = $isViewerPlayer1 ? $player2Id : $player1Id;
        $myCompleted = $isViewerPlayer1
            ? (int)($battle['player1']['completed_count'] ?? 0)
            : (int)($battle['player2']['completed_count'] ?? 0);
        $opponentCompleted = $isViewerPlayer1
            ? (int)($battle['player2']['completed_count'] ?? 0)
            : (int)($battle['player1']['completed_count'] ?? 0);
        $opponentName = $isViewerPlayer1
            ? (string)($battle['player2']['name'] ?? '')
            : (string)($battle['player1']['name'] ?? '');

        return [
            'battle_id' => $battleId,
            'mode' => (string)($battle['mode'] ?? 'user_random'),
            'status' => (string)($battle['status'] ?? 'active'),
            'total_tasks' => (int)($battle['total_tasks'] ?? 0),
            'winner_user_id' => (int)($battle['winner_user_id'] ?? 0),
            'my_completed_count' => $myCompleted,
            'opponent_user_id' => $opponentId,
            'opponent_name' => trim($opponentName),
            'opponent_completed_count' => $opponentCompleted,
            'created_at' => (string)($battle['created_at'] ?? ''),
            'started_at' => (string)($battle['started_at'] ?? ''),
            'ended_at' => (string)($battle['ended_at'] ?? ''),
        ];
    };

    $getIncomingInvites = static function (PDO $pdo, int $userId): array {
        $stmt = $pdo->prepare('SELECT i.id, i.inviter_user_id, i.created_at, i.expires_at, u.first_name, u.last_name
            FROM pvp_invites i
            INNER JOIN users u ON u.id = i.inviter_user_id
            WHERE i.invitee_user_id = :uid AND i.status = \'pending\'
            ORDER BY i.id DESC
            LIMIT 20');
        $stmt->execute([':uid' => $userId]);
        $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

        $result = [];
        foreach ($rows as $row) {
            $result[] = [
                'id' => (int)($row['id'] ?? 0),
                'inviter_user_id' => (int)($row['inviter_user_id'] ?? 0),
                'inviter_name' => trim((string)($row['first_name'] ?? '') . ' ' . (string)($row['last_name'] ?? '')),
                'created_at' => (string)($row['created_at'] ?? ''),
                'expires_at' => (string)($row['expires_at'] ?? ''),
            ];
        }

        return $result;
    };

    $createBattle = static function (PDO $pdo, int $creatorUserId, int $player1Id, int $player2Id, string $mode, array $taskIds): int {
        $cleanTaskIds = array_values(array_unique(array_map(static fn($v) => (int)$v, $taskIds)));
        if (count($cleanTaskIds) < 1) {
            throw new RuntimeException('At least one task is required');
        }

        $insertBattleStmt = $pdo->prepare('INSERT INTO pvp_battles (mode, status, created_by_user_id, player1_user_id, player2_user_id, winner_user_id, total_tasks, created_at, started_at, ended_at)
            VALUES (:mode, :status, :created_by, :p1, :p2, NULL, :total_tasks, :created_at, :started_at, NULL)');
        $insertBattleStmt->execute([
            ':mode' => $mode,
            ':status' => 'active',
            ':created_by' => $creatorUserId,
            ':p1' => $player1Id,
            ':p2' => $player2Id,
            ':total_tasks' => count($cleanTaskIds),
            ':created_at' => date('c'),
            ':started_at' => date('c'),
        ]);

        $battleId = (int)$pdo->lastInsertId();

        $insertTaskStmt = $pdo->prepare('INSERT INTO pvp_battle_tasks (battle_id, task_id, sort_order) VALUES (:bid, :task_id, :sort_order)');
        foreach ($cleanTaskIds as $sort => $taskId) {
            $insertTaskStmt->execute([
                ':bid' => $battleId,
                ':task_id' => $taskId,
                ':sort_order' => $sort,
            ]);
        }

        return $battleId;
    };

    $getAction = static function (string $method): string {
        if ($method === 'GET') {
            return strtolower(trim((string)($_GET['action'] ?? 'my_state')));
        }

        return strtolower(trim((string)($_POST['action'] ?? '')));
    };

    $action = $getAction($_SERVER['REQUEST_METHOD'] ?? 'GET');

    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        if ($action === 'my_state') {
            $battle = $findActiveBattleForUser($pdo, $actorUserId);
            $invites = $getIncomingInvites($pdo, $actorUserId);
            echo json_encode([
                'success' => true,
                'incoming_invites' => $invites,
                'active_battle' => $formatBattleForViewer($battle, $actorUserId),
            ]);
            exit;
        }

        if ($action === 'admin_data') {
            if (!$isAdmin) {
                http_response_code(403);
                echo json_encode(['error' => 'Admin access required']);
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

            $catalogStmt = $pdo->query('SELECT id, code, title FROM bios_task_catalog WHERE is_active = 1 ORDER BY id ASC');
            $catalogRaw = $catalogStmt->fetchAll(PDO::FETCH_ASSOC);
            $catalog = [];
            foreach ($catalogRaw as $row) {
                $catalog[] = [
                    'id' => (int)($row['id'] ?? 0),
                    'code' => (string)($row['code'] ?? ''),
                    'title' => (string)($row['title'] ?? ''),
                ];
            }

            echo json_encode([
                'success' => true,
                'users' => $users,
                'catalog' => $catalog,
            ]);
            exit;
        }

        http_response_code(400);
        echo json_encode(['error' => 'Invalid action']);
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

    if ($action === 'send_invite') {
        $targetFirst = trim((string)($_POST['target_first_name'] ?? ''));
        $targetLast = trim((string)($_POST['target_last_name'] ?? ''));

        if ($targetFirst === '' || $targetLast === '') {
            http_response_code(400);
            echo json_encode(['error' => 'Enter target first and last name']);
            exit;
        }

        $targetStmt = $pdo->prepare('SELECT id, is_active, blocked_at FROM users WHERE lower(first_name) = lower(:first_name) AND lower(last_name) = lower(:last_name) LIMIT 1');
        $targetStmt->execute([
            ':first_name' => $targetFirst,
            ':last_name' => $targetLast,
        ]);
        $target = $targetStmt->fetch(PDO::FETCH_ASSOC);

        if (!$target) {
            http_response_code(404);
            echo json_encode(['error' => 'User not found']);
            exit;
        }

        $targetUserId = (int)($target['id'] ?? 0);
        if ($targetUserId <= 0 || $targetUserId === $actorUserId) {
            http_response_code(400);
            echo json_encode(['error' => 'Invalid target user']);
            exit;
        }

        if ((int)($target['is_active'] ?? 1) !== 1 || !empty($target['blocked_at'])) {
            http_response_code(403);
            echo json_encode(['error' => 'Target user is blocked']);
            exit;
        }

        $activeBattleActor = $findActiveBattleForUser($pdo, $actorUserId);
        if ($activeBattleActor && ($activeBattleActor['status'] ?? '') === 'active') {
            http_response_code(409);
            echo json_encode(['error' => 'You already have active battle']);
            exit;
        }

        $activeBattleTarget = $findActiveBattleForUser($pdo, $targetUserId);
        if ($activeBattleTarget && ($activeBattleTarget['status'] ?? '') === 'active') {
            http_response_code(409);
            echo json_encode(['error' => 'Target user already has active battle']);
            exit;
        }

        $pendingStmt = $pdo->prepare('SELECT id FROM pvp_invites WHERE status = \'pending\' AND ((inviter_user_id = :a AND invitee_user_id = :b) OR (inviter_user_id = :b AND invitee_user_id = :a)) LIMIT 1');
        $pendingStmt->execute([':a' => $actorUserId, ':b' => $targetUserId]);
        if ($pendingStmt->fetch(PDO::FETCH_ASSOC)) {
            http_response_code(409);
            echo json_encode(['error' => 'Pending invite already exists']);
            exit;
        }

        $insertStmt = $pdo->prepare('INSERT INTO pvp_invites (inviter_user_id, invitee_user_id, status, request_type, requested_task_count, battle_id, created_at, expires_at, responded_at)
            VALUES (:inviter, :invitee, :status, :request_type, NULL, NULL, :created_at, :expires_at, NULL)');
        $insertStmt->execute([
            ':inviter' => $actorUserId,
            ':invitee' => $targetUserId,
            ':status' => 'pending',
            ':request_type' => 'user',
            ':created_at' => date('c'),
            ':expires_at' => date('c', time() + 3600),
        ]);

        $logAction($pdo, $actorUserId, 'PVP_INVITE_SENT', [
            'invitee_user_id' => $targetUserId,
        ]);

        echo json_encode(['success' => true]);
        exit;
    }

    if ($action === 'respond_invite') {
        $inviteId = (int)($_POST['invite_id'] ?? 0);
        $decision = strtolower(trim((string)($_POST['decision'] ?? '')));

        if ($inviteId <= 0 || !in_array($decision, ['accept', 'decline'], true)) {
            http_response_code(400);
            echo json_encode(['error' => 'Invalid invite decision']);
            exit;
        }

        $inviteStmt = $pdo->prepare('SELECT * FROM pvp_invites WHERE id = :id LIMIT 1');
        $inviteStmt->execute([':id' => $inviteId]);
        $invite = $inviteStmt->fetch(PDO::FETCH_ASSOC);

        if (!$invite) {
            http_response_code(404);
            echo json_encode(['error' => 'Invite not found']);
            exit;
        }

        if ((int)($invite['invitee_user_id'] ?? 0) !== $actorUserId) {
            http_response_code(403);
            echo json_encode(['error' => 'Invite is not for current user']);
            exit;
        }

        if ((string)($invite['status'] ?? '') !== 'pending') {
            http_response_code(409);
            echo json_encode(['error' => 'Invite already processed']);
            exit;
        }

        $inviterUserId = (int)($invite['inviter_user_id'] ?? 0);

        if ($decision === 'decline') {
            $declineStmt = $pdo->prepare('UPDATE pvp_invites SET status = :status, responded_at = :responded_at WHERE id = :id');
            $declineStmt->execute([
                ':status' => 'declined',
                ':responded_at' => date('c'),
                ':id' => $inviteId,
            ]);

            $logAction($pdo, $actorUserId, 'PVP_INVITE_DECLINED', [
                'invite_id' => $inviteId,
                'inviter_user_id' => $inviterUserId,
            ]);

            echo json_encode(['success' => true]);
            exit;
        }

        $activeBattleInvitee = $findActiveBattleForUser($pdo, $actorUserId);
        $activeBattleInviter = $findActiveBattleForUser($pdo, $inviterUserId);
        if (($activeBattleInvitee && ($activeBattleInvitee['status'] ?? '') === 'active') || ($activeBattleInviter && ($activeBattleInviter['status'] ?? '') === 'active')) {
            http_response_code(409);
            echo json_encode(['error' => 'One of users already has active battle']);
            exit;
        }

        $catalogStmt = $pdo->query('SELECT id FROM bios_task_catalog WHERE is_active = 1 ORDER BY RANDOM()');
        $catalogRows = $catalogStmt->fetchAll(PDO::FETCH_ASSOC);
        $allTaskIds = array_values(array_filter(array_map(static fn($row) => (int)($row['id'] ?? 0), $catalogRows), static fn($id) => $id > 0));

        if (count($allTaskIds) < 1) {
            http_response_code(500);
            echo json_encode(['error' => 'Task catalog is empty']);
            exit;
        }

        $maxTasks = min(10, count($allTaskIds));
        $minTasks = min(3, $maxTasks);
        $randomCount = random_int($minTasks, $maxTasks);
        $selectedTaskIds = array_slice($allTaskIds, 0, $randomCount);

        $pdo->beginTransaction();

        $battleId = $createBattle($pdo, $inviterUserId, $inviterUserId, $actorUserId, 'user_random', $selectedTaskIds);

        $acceptStmt = $pdo->prepare('UPDATE pvp_invites SET status = :status, responded_at = :responded_at, battle_id = :battle_id WHERE id = :id');
        $acceptStmt->execute([
            ':status' => 'accepted',
            ':responded_at' => date('c'),
            ':battle_id' => $battleId,
            ':id' => $inviteId,
        ]);

        $pdo->commit();

        $logAction($pdo, $actorUserId, 'PVP_INVITE_ACCEPTED', [
            'invite_id' => $inviteId,
            'battle_id' => $battleId,
        ]);

        echo json_encode([
            'success' => true,
            'battle_id' => $battleId,
        ]);
        exit;
    }

    if ($action === 'admin_create_battle') {
        if (!$isAdmin) {
            http_response_code(403);
            echo json_encode(['error' => 'Admin access required']);
            exit;
        }

        $player1Id = (int)($_POST['player1_user_id'] ?? 0);
        $player2Id = (int)($_POST['player2_user_id'] ?? 0);
        $rawTaskIds = $_POST['task_ids'] ?? '[]';

        if ($player1Id <= 0 || $player2Id <= 0 || $player1Id === $player2Id) {
            http_response_code(400);
            echo json_encode(['error' => 'Select two different users']);
            exit;
        }

        $decodedTaskIds = json_decode((string)$rawTaskIds, true);
        if (!is_array($decodedTaskIds)) {
            http_response_code(400);
            echo json_encode(['error' => 'Invalid task list']);
            exit;
        }

        $taskIds = array_values(array_unique(array_filter(array_map(static fn($v) => (int)$v, $decodedTaskIds), static fn($id) => $id > 0)));
        if (count($taskIds) < 1) {
            http_response_code(400);
            echo json_encode(['error' => 'Select at least one task']);
            exit;
        }

        $userCheckStmt = $pdo->prepare('SELECT id, is_active, blocked_at FROM users WHERE id = :p1 OR id = :p2');
        $userCheckStmt->bindValue(':p1', $player1Id, PDO::PARAM_INT);
        $userCheckStmt->bindValue(':p2', $player2Id, PDO::PARAM_INT);
        $userCheckStmt->execute();
        $users = $userCheckStmt->fetchAll(PDO::FETCH_ASSOC);
        if (count($users) !== 2) {
            http_response_code(404);
            echo json_encode(['error' => 'Users not found']);
            exit;
        }

        foreach ($users as $row) {
            if ((int)($row['is_active'] ?? 1) !== 1 || !empty($row['blocked_at'])) {
                http_response_code(403);
                echo json_encode(['error' => 'One of selected users is blocked']);
                exit;
            }
        }

        $player1ActiveBattle = $findActiveBattleForUser($pdo, $player1Id);
        $player2ActiveBattle = $findActiveBattleForUser($pdo, $player2Id);
        if (($player1ActiveBattle && ($player1ActiveBattle['status'] ?? '') === 'active') ||
            ($player2ActiveBattle && ($player2ActiveBattle['status'] ?? '') === 'active')) {
            http_response_code(409);
            echo json_encode(['error' => 'One of selected users already has active battle']);
            exit;
        }

        $placeholders = implode(',', array_fill(0, count($taskIds), '?'));
        $taskCheckStmt = $pdo->prepare("SELECT id FROM bios_task_catalog WHERE is_active = 1 AND id IN ($placeholders)");
        foreach ($taskIds as $index => $taskId) {
            $taskCheckStmt->bindValue($index + 1, $taskId, PDO::PARAM_INT);
        }
        $taskCheckStmt->execute();
        $existingTaskRows = $taskCheckStmt->fetchAll(PDO::FETCH_ASSOC);
        if (count($existingTaskRows) !== count($taskIds)) {
            http_response_code(400);
            echo json_encode(['error' => 'Task list contains inactive or invalid tasks']);
            exit;
        }

        $battleId = $createBattle($pdo, $actorUserId, $player1Id, $player2Id, 'admin_selected', $taskIds);

        $logAction($pdo, $actorUserId, 'PVP_ADMIN_BATTLE_CREATED', [
            'battle_id' => $battleId,
            'player1_user_id' => $player1Id,
            'player2_user_id' => $player2Id,
            'task_count' => count($taskIds),
        ]);

        echo json_encode([
            'success' => true,
            'battle_id' => $battleId,
        ]);
        exit;
    }

    if ($action === 'leave_battle') {
        $battle = $findActiveBattleForUser($pdo, $actorUserId);
        if (!$battle || (string)($battle['status'] ?? '') !== 'active') {
            http_response_code(404);
            echo json_encode(['error' => 'Active battle not found']);
            exit;
        }

        $battleId = (int)($battle['id'] ?? 0);
        $player1Id = (int)($battle['player1']['id'] ?? 0);
        $player2Id = (int)($battle['player2']['id'] ?? 0);
        $opponentUserId = $player1Id === $actorUserId ? $player2Id : $player1Id;

        if ($battleId <= 0 || $opponentUserId <= 0) {
            http_response_code(500);
            echo json_encode(['error' => 'Invalid active battle state']);
            exit;
        }

        $finishStmt = $pdo->prepare('UPDATE pvp_battles
            SET status = :status,
                winner_user_id = :winner_id,
                ended_at = :ended_at
            WHERE id = :bid AND status = \'active\'');
        $finishStmt->execute([
            ':status' => 'completed',
            ':winner_id' => $opponentUserId,
            ':ended_at' => date('c'),
            ':bid' => $battleId,
        ]);

        if ($finishStmt->rowCount() <= 0) {
            http_response_code(409);
            echo json_encode(['error' => 'Battle is already finished']);
            exit;
        }

        $logAction($pdo, $actorUserId, 'PVP_BATTLE_LEFT', [
            'battle_id' => $battleId,
            'winner_user_id' => $opponentUserId,
        ]);

        echo json_encode([
            'success' => true,
            'battle_id' => $battleId,
            'winner_user_id' => $opponentUserId,
        ]);
        exit;
    }

    if ($action === 'report_progress') {
        $taskCode = trim((string)($_POST['task_code'] ?? ''));
        if ($taskCode === '') {
            http_response_code(400);
            echo json_encode(['error' => 'Task code is required']);
            exit;
        }

        $battleStmt = $pdo->prepare('SELECT * FROM pvp_battles WHERE status = \'active\' AND (player1_user_id = :uid OR player2_user_id = :uid) ORDER BY id DESC LIMIT 1');
        $battleStmt->execute([':uid' => $actorUserId]);
        $battle = $battleStmt->fetch(PDO::FETCH_ASSOC);
        if (!$battle) {
            echo json_encode(['success' => true, 'ignored' => true]);
            exit;
        }

        $battleId = (int)($battle['id'] ?? 0);
        $taskExistsStmt = $pdo->prepare('SELECT 1
            FROM pvp_battle_tasks bt
            INNER JOIN bios_task_catalog btc ON btc.id = bt.task_id
            WHERE bt.battle_id = :bid AND btc.code = :task_code
            LIMIT 1');
        $taskExistsStmt->execute([
            ':bid' => $battleId,
            ':task_code' => $taskCode,
        ]);

        if (!$taskExistsStmt->fetch(PDO::FETCH_ASSOC)) {
            echo json_encode(['success' => true, 'ignored' => true]);
            exit;
        }

        $insertCompletionStmt = $pdo->prepare('INSERT OR IGNORE INTO pvp_battle_task_completions (battle_id, user_id, task_code, completed_at) VALUES (:bid, :uid, :task_code, :completed_at)');
        $insertCompletionStmt->execute([
            ':bid' => $battleId,
            ':uid' => $actorUserId,
            ':task_code' => $taskCode,
            ':completed_at' => date('c'),
        ]);

        $totalTasks = (int)($battle['total_tasks'] ?? 0);
        if ($totalTasks > 0) {
            $countStmt = $pdo->prepare('SELECT COUNT(*) AS total FROM pvp_battle_task_completions WHERE battle_id = :bid AND user_id = :uid');
            $countStmt->execute([
                ':bid' => $battleId,
                ':uid' => $actorUserId,
            ]);
            $completedCount = (int)($countStmt->fetch(PDO::FETCH_ASSOC)['total'] ?? 0);

            if ($completedCount >= $totalTasks) {
                $finishStmt = $pdo->prepare('UPDATE pvp_battles SET status = CASE WHEN status = \'active\' THEN \'completed\' ELSE status END,
                    winner_user_id = CASE WHEN status = \'active\' THEN :winner_id ELSE winner_user_id END,
                    ended_at = CASE WHEN status = \'active\' THEN :ended_at ELSE ended_at END
                    WHERE id = :bid');
                $finishStmt->execute([
                    ':winner_id' => $actorUserId,
                    ':ended_at' => date('c'),
                    ':bid' => $battleId,
                ]);

                if ($finishStmt->rowCount() > 0) {
                    $logAction($pdo, $actorUserId, 'PVP_BATTLE_FINISHED', [
                        'battle_id' => $battleId,
                        'winner_user_id' => $actorUserId,
                    ]);
                }
            }
        }

        $state = $findActiveBattleForUser($pdo, $actorUserId);
        echo json_encode([
            'success' => true,
            'active_battle' => $formatBattleForViewer($state, $actorUserId),
        ]);
        exit;
    }

    http_response_code(400);
    echo json_encode(['error' => 'Invalid action']);
    exit;
} catch (Throwable $e) {
    if (isset($pdo) && $pdo instanceof PDO && $pdo->inTransaction()) {
        $pdo->rollBack();
    }

    error_log('pvp_battles.php error: ' . $e->getMessage());
    http_response_code(500);
    echo json_encode(['error' => 'Failed to process PvP request']);
    exit;
}
