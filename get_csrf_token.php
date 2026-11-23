<?php
declare(strict_types=1);

// Prevent displaying errors to users
error_reporting(E_ALL);
ini_set('display_errors', '0');
ini_set('log_errors', '1');

session_start();
session_regenerate_id(true);

// Security headers
header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('Cache-Control: no-cache, no-store, must-revalidate');
header('Pragma: no-cache');
header('Expires: 0');

// Generate or retrieve CSRF token
if (empty($_SESSION['csrf_token'])) {
    $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
    $_SESSION['csrf_token_time'] = time();
}

// Refresh token if older than 1 hour
if (time() - $_SESSION['csrf_token_time'] > 3600) {
    $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
    $_SESSION['csrf_token_time'] = time();
}

echo json_encode([
    'csrf_token' => $_SESSION['csrf_token'],
    'expires_in' => 3600
]);
exit;
?>
