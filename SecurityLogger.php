<?php
/**
 * Security Logger Helper
 * Centralized logging for security events
 */

declare(strict_types=1);

class SecurityLogger
{
    private $logDir;
    private $config;

    public function __construct(array $config)
    {
        $this->config = $config;
        $this->logDir = $config['logging']['security_log_path'];
        $this->ensureLogDirectory();
    }

    private function ensureLogDirectory(): void
    {
        if (!is_dir($this->logDir)) {
            if (!@mkdir($this->logDir, 0700, true)) {
                error_log("Failed to create security log directory: {$this->logDir}");
            }
        }
    }

    public function logRegistration(string $firstName, string $lastName, string $ip, string $userId): void
    {
        $message = sprintf(
            "[%s] User registered: %s %s | IP: %s | User ID: %s\n",
            date('Y-m-d H:i:s'),
            $firstName,
            $lastName,
            $ip,
            $userId
        );
        error_log($message, 3, $this->config['logging']['registration_log']);
    }

    public function logLogin(string $firstName, string $lastName, string $ip, bool $success, ?string $reason = null): void
    {
        $status = $success ? 'SUCCESS' : 'FAILED';
        $reasonStr = $reason ? " | Reason: $reason" : '';
        $message = sprintf(
            "[%s] Login %s: %s %s | IP: %s%s\n",
            date('Y-m-d H:i:s'),
            $status,
            $firstName,
            $lastName,
            $ip,
            $reasonStr
        );
        error_log($message, 3, $this->config['logging']['login_log']);
    }

    public function logSuspiciousActivity(string $type, string $ip, string $details): void
    {
        $message = sprintf(
            "[%s] SUSPICIOUS ACTIVITY - %s | IP: %s | Details: %s\n",
            date('Y-m-d H:i:s'),
            $type,
            $ip,
            $details
        );
        error_log($message, 3, $this->config['logging']['suspicious_activity_log']);
    }

    public function logCSRFFailure(string $ip): void
    {
        $this->logSuspiciousActivity('CSRF_FAILURE', $ip, 'Invalid or missing CSRF token');
    }

    public function logRateLimitExceeded(string $type, string $ip): void
    {
        $this->logSuspiciousActivity('RATE_LIMIT', $ip, "Rate limit exceeded for: $type");
    }

    public function logInvalidInput(string $field, string $ip): void
    {
        $this->logSuspiciousActivity('INVALID_INPUT', $ip, "Invalid input in field: $field");
    }

    public function logAccountLockout(int $userId, string $ip): void
    {
        $this->logSuspiciousActivity('ACCOUNT_LOCKOUT', $ip, "Account locked after too many failed attempts, User ID: $userId");
    }
}

// Initialize logger helper
function getSecurityLogger(): SecurityLogger
{
    $config = require __DIR__ . '/config_security.php';
    return new SecurityLogger($config);
}
?>
