<?php
/**
 * Session Security Validator
 * Validates session integrity and security
 */

declare(strict_types=1);

class SessionValidator
{
    private static $config;

    public static function configure(array $config): void
    {
        self::$config = $config;
    }

    public static function initializeSession(): void
    {
        // Set secure session parameters
        $sessionConfig = self::$config['session'];
        
        session_set_cookie_params([
            'lifetime' => $sessionConfig['timeout'],
            'path' => '/',
            'domain' => '',
            'secure' => $sessionConfig['cookie_secure'],
            'httponly' => $sessionConfig['cookie_httponly'],
            'samesite' => $sessionConfig['cookie_samesite'],
        ]);

        session_start();
        
        if ($sessionConfig['regenerate_on_login'] && isset($_SESSION['user_id'])) {
            session_regenerate_id(true);
        }
    }

    public static function validateSession(): bool
    {
        // Check if session has required fields
        if (!isset($_SESSION['user_id']) || !isset($_SESSION['login_time'])) {
            return false;
        }

        // Check session timeout
        $sessionTimeout = self::$config['session']['timeout'];
        if (time() - $_SESSION['login_time'] > $sessionTimeout) {
            session_destroy();
            return false;
        }

        // Validate IP address (optional)
        $ip = $_SERVER['REMOTE_ADDR'] ?? '0.0.0.0';
        if (isset($_SESSION['ip']) && $_SESSION['ip'] !== $ip) {
            error_log("Session IP mismatch detected. Expected: {$_SESSION['ip']}, Got: $ip");
            // Optionally enable this check for stricter security:
            // session_destroy();
            // return false;
        }

        // Validate user agent (optional)
        $userAgent = $_SERVER['HTTP_USER_AGENT'] ?? '';
        if (isset($_SESSION['user_agent']) && $_SESSION['user_agent'] !== $userAgent) {
            error_log("Session user agent mismatch detected");
            // Optionally enable this check for stricter security:
            // session_destroy();
            // return false;
        }

        return true;
    }

    public static function getUser(): ?array
    {
        if (!self::validateSession()) {
            return null;
        }

        return [
            'id' => $_SESSION['user_id'] ?? null,
            'name' => $_SESSION['user_name'] ?? null,
            'ip' => $_SESSION['ip'] ?? null,
            'login_time' => $_SESSION['login_time'] ?? null,
        ];
    }

    public static function destroySession(): void
    {
        $_SESSION = [];
        if (isset($_COOKIE[session_name()])) {
            setcookie(session_name(), '', time() - 42000, '/');
        }
        session_destroy();
    }
}

// Configure with settings
$config = require __DIR__ . '/config_security.php';
SessionValidator::configure($config);
?>
