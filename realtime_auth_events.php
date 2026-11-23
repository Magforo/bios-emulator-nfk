<?php
declare(strict_types=1);

error_reporting(E_ALL);
ini_set('display_errors', '0');
ini_set('log_errors', '1');
ini_set('error_log', __DIR__ . '/security_logs/php_errors.log');

session_start();

if (empty($_SESSION['user_id'])) {
    http_response_code(401);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode(['error' => 'Not authenticated']);
    exit;
}

$sessionUserId = (int)$_SESSION['user_id'];
$sessionLoginTime = (int)($_SESSION['login_time'] ?? 0);

// Release session lock so this long-running request does not block others
session_write_close();

header('Content-Type: text/event-stream; charset=utf-8');
header('Cache-Control: no-cache, no-store, must-revalidate');
header('Pragma: no-cache');
header('Expires: 0');
header('X-Accel-Buffering: no');
header('Connection: keep-alive');

@ini_set('output_buffering', 'off');
@ini_set('zlib.output_compression', '0');
@ini_set('implicit_flush', '1');
@apache_setenv('no-gzip', '1');
@apache_setenv('dont-vary', '1');

while (ob_get_level() > 0) {
    ob_end_flush();
}
ob_implicit_flush(true);

echo ':' . str_repeat(' ', 2048) . "\n\n";
@ob_flush();
@flush();

ignore_user_abort(true);
set_time_limit(0);

$sendEvent = static function (string $event, array $payload = []): void {
    echo "event: {$event}\n";
    echo 'data: ' . json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES) . "\n\n";
    @flush();
};

try {
    $config = require __DIR__ . '/config_security.php';
    require_once __DIR__ . '/DatabaseManager.php';
    $dbManager = getDatabaseManager($config);
    $pdo = $dbManager->initializeDatabase();

    // Keep connection open ~30 seconds, EventSource will auto-reconnect.
    for ($tick = 0; $tick < 30; $tick++) {
        if (connection_aborted()) {
            break;
        }

        echo ": keepalive {$tick}\n\n";
        @ob_flush();
        @flush();

        $stmt = $pdo->prepare('SELECT is_active, blocked_at, force_logout_at FROM users WHERE id = :uid LIMIT 1');
        $stmt->execute([':uid' => $sessionUserId]);
        $userRow = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$userRow) {
            $sendEvent('force_logout', ['reason' => 'user_not_found']);
            break;
        }

        if ((int)($userRow['is_active'] ?? 1) !== 1 || !empty($userRow['blocked_at'])) {
            $sendEvent('account_blocked', ['reason' => 'blocked_by_admin']);
            break;
        }

        $forceLogoutAt = trim((string)($userRow['force_logout_at'] ?? ''));
        if ($forceLogoutAt !== '' && $sessionLoginTime > 0) {
            $forceLogoutTs = strtotime($forceLogoutAt) ?: 0;
            if ($forceLogoutTs > $sessionLoginTime) {
                $sendEvent('force_logout', ['reason' => 'forced_by_admin']);
                break;
            }
        }

        if ($tick % 10 === 0) {
            $sendEvent('heartbeat', ['ts' => date('c')]);
        }

        sleep(1);
    }
} catch (Throwable $e) {
    error_log('realtime_auth_events.php error: ' . $e->getMessage());
    $sendEvent('error', ['message' => 'stream_failed']);
}
