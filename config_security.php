<?php
/**
 * Security Configuration
 * Centralized security settings for the application
 */

declare(strict_types=1);

return [
    // Password requirements
    'password' => [
        'min_length' => 12,
        'max_length' => 256,
        'require_uppercase' => true,
        'require_lowercase' => true,
        'require_numbers' => true,
        'require_special_chars' => true,
    ],

    // Rate limiting
    'rate_limit' => [
        'registration_attempts' => 5,        // per hour per IP
        'login_attempts' => 10,              // per hour per IP
        'password_reset_attempts' => 3,      // per hour per IP
        'time_window' => 3600,               // 1 hour in seconds
    ],

    // Session settings
    'session' => [
        'timeout' => 1800,                   // 30 minutes
        'cookie_secure' => true,             // HTTPS only
        'cookie_httponly' => true,           // No JavaScript access
        'cookie_samesite' => 'Strict',      // CSRF protection
        'regenerate_on_login' => true,
    ],

    // Account lockout
    'account' => [
        'max_failed_login_attempts' => 5,
        'lockout_duration' => 1800,          // 30 minutes in seconds
        'password_history_count' => 5,       // Users can't reuse last 5 passwords
    ],

    // Database
    'database' => [
        'path' => __DIR__ . '/data/userdata.sqlite',
        'permissions' => 0600,
        'backup_enabled' => true,
    ],

    // Logging
    'logging' => [
        'security_log_path' => __DIR__ . '/security_logs',
        'php_error_log' => __DIR__ . '/security_logs/php_errors.log',
        'login_log' => __DIR__ . '/security_logs/login.log',
        'registration_log' => __DIR__ . '/security_logs/registration.log',
        'suspicious_activity_log' => __DIR__ . '/security_logs/suspicious.log',
    ],

    // CSRF
    'csrf' => [
        'token_length' => 32,                // bytes for bin2hex (64 chars)
        'token_lifetime' => 3600,            // 1 hour
    ],

    // Security headers
    'headers' => [
        'Content-Type' => 'application/json; charset=utf-8',
        'X-Content-Type-Options' => 'nosniff',
        'X-Frame-Options' => 'DENY',
        'X-XSS-Protection' => '1; mode=block',
        'Strict-Transport-Security' => 'max-age=31536000; includeSubDomains',
        'Referrer-Policy' => 'strict-origin-when-cross-origin',
        'Permissions-Policy' => 'geolocation=(), microphone=(), camera=()',
    ],

    // Allowed hosts (for production)
    'allowed_hosts' => [
        'localhost',
        '127.0.0.1',
        // Add your domain here
    ],
];
?>
