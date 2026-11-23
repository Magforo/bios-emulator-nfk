<?php
/**
 * Security System Initialization
 * Initialize all security components and create necessary directories
 * Run this once during installation
 */

declare(strict_types=1);

/**
 * Initialize Security System
 */
function initializeSecuritySystem(): array
{
    $result = [
        'success' => true,
        'messages' => [],
        'warnings' => [],
        'errors' => []
    ];

    // Load configuration
    try {
        $config = require __DIR__ . '/config_security.php';
    } catch (Throwable $e) {
        $result['errors'][] = "Failed to load config_security.php: " . $e->getMessage();
        $result['success'] = false;
        return $result;
    }

    // Create required directories
    $directories = [
        $config['logging']['security_log_path'],
        dirname($config['database']['path']),
        dirname($config['database']['path']) . '/backups',
    ];

    foreach ($directories as $dir) {
        if (!is_dir($dir)) {
            if (@mkdir($dir, 0700, true)) {
                $result['messages'][] = "Created directory: $dir";
            } else {
                $result['errors'][] = "Failed to create directory: $dir";
                $result['success'] = false;
            }
        } else {
            $result['messages'][] = "Directory exists: $dir";
        }
    }

    // Check file permissions
    foreach ($directories as $dir) {
        if (is_dir($dir)) {
            $perms = decoct(fileperms($dir) & 0777);
            if ($perms !== '700') {
                if (@chmod($dir, 0700)) {
                    $result['messages'][] = "Fixed permissions for: $dir";
                } else {
                    $result['warnings'][] = "Could not set permissions for: $dir (current: $perms)";
                }
            }
        }
    }

    // Initialize database
    try {
        require_once __DIR__ . '/DatabaseManager.php';
        $dbManager = new DatabaseManager($config);
        $pdo = $dbManager->initializeDatabase();
        $result['messages'][] = "Database initialized successfully";

        // Create initial backup
        $backup = $dbManager->createBackup();
        $result['messages'][] = "Initial backup created: $backup";
    } catch (Throwable $e) {
        $result['errors'][] = "Failed to initialize database: " . $e->getMessage();
        $result['success'] = false;
    }

    // Create .htaccess for security (Apache servers)
    $htaccessContent = <<<'HTACCESS'
# Security configuration for Apache

# Prevent directory listing
<IfModule mod_autoindex.c>
    Options -Indexes
</IfModule>

# Enable HTTPS
<IfModule mod_rewrite.c>
    RewriteEngine On
    
    # Redirect HTTP to HTTPS
    RewriteCond %{HTTPS} off
    RewriteCond %{HTTP_HOST} !^localhost$ [NC]
    RewriteCond %{HTTP_HOST} !^127\.0\.0\.1$ [NC]
    RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
</IfModule>

# Add security headers
<IfModule mod_headers.c>
    Header always set X-Content-Type-Options "nosniff"
    Header always set X-Frame-Options "DENY"
    Header always set X-XSS-Protection "1; mode=block"
    Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains"
    Header always set Referrer-Policy "strict-origin-when-cross-origin"
</IfModule>

# Protect sensitive files
<FilesMatch "\.(sqlite|sqlite-wal|sqlite-shm|log|json)$">
    Order Deny,Allow
    Deny from all
</FilesMatch>

# Disable execution in upload/data directories
<Directory "*/data">
    <IfModule mod_php8.c>
        php_flag engine off
    </IfModule>
    <IfModule mod_php.c>
        php_flag engine off
    </IfModule>
</Directory>

# Cache control
<IfModule mod_headers.c>
    Header set Cache-Control "no-cache, no-store, must-revalidate"
    Header set Pragma "no-cache"
    Header set Expires 0
</IfModule>
HTACCESS;

    $htaccessPath = __DIR__ . '/.htaccess';
    if (file_exists($htaccessPath)) {
        $result['messages'][] = ".htaccess already exists";
    } else {
        if (@file_put_contents($htaccessPath, $htaccessContent)) {
            @chmod($htaccessPath, 0644);
            $result['messages'][] = ".htaccess file created";
        } else {
            $result['warnings'][] = "Could not create .htaccess file";
        }
    }

    // Create nginx configuration example (if needed)
    $nginxConfigPath = __DIR__ . '/nginx.conf.example';
    $nginxContent = <<<'NGINX'
# Example Nginx configuration for security

server {
    listen 443 ssl http2;
    server_name your-domain.com;

    # SSL configuration
    ssl_certificate /path/to/certificate.crt;
    ssl_certificate_key /path/to/private.key;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;

    # Security headers
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-Frame-Options "DENY" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    # Deny access to sensitive files
    location ~ \.sqlite($|\.wal$|\.shm$) {
        deny all;
    }

    location ~ /security_logs/ {
        deny all;
    }

    location ~ /data/ {
        deny all;
    }

    # PHP configuration
    location ~ \.php$ {
        fastcgi_pass php:9000;
        fastcgi_index index.php;
        include fastcgi_params;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
    }
}

# Redirect HTTP to HTTPS
server {
    listen 80;
    server_name your-domain.com;
    return 301 https://$server_name$request_uri;
}
NGINX;

    if (!file_exists($nginxConfigPath)) {
        @file_put_contents($nginxConfigPath, $nginxContent);
        $result['messages'][] = "Nginx configuration example created";
    }

    // PHP configuration recommendations
    $phpIniRecommendations = [
        'display_errors' => 'Off',
        'log_errors' => 'On',
        'error_log' => $config['logging']['php_error_log'],
        'session.cookie_httponly' => 'On',
        'session.cookie_secure' => 'On',
        'session.cookie_samesite' => 'Strict',
        'session.use_only_cookies' => 'On',
        'session.use_strict_mode' => 'On',
    ];

    $result['messages'][] = "Recommended PHP settings:";
    foreach ($phpIniRecommendations as $setting => $value) {
        $result['messages'][] = "  $setting = $value";
    }

    return $result;
}

// If run directly from command line
if (php_sapi_name() === 'cli' || $_SERVER['SCRIPT_NAME'] === basename(__FILE__)) {
    $result = initializeSecuritySystem();
    
    echo "\n=== Security System Initialization ===\n\n";
    
    if ($result['success']) {
        echo "✓ Initialization successful!\n\n";
    } else {
        echo "✗ Initialization failed!\n\n";
    }

    if (!empty($result['messages'])) {
        echo "Messages:\n";
        foreach ($result['messages'] as $msg) {
            echo "  ✓ $msg\n";
        }
        echo "\n";
    }

    if (!empty($result['warnings'])) {
        echo "Warnings:\n";
        foreach ($result['warnings'] as $warning) {
            echo "  ⚠ $warning\n";
        }
        echo "\n";
    }

    if (!empty($result['errors'])) {
        echo "Errors:\n";
        foreach ($result['errors'] as $error) {
            echo "  ✗ $error\n";
        }
        echo "\n";
    }

    exit($result['success'] ? 0 : 1);
}
?>
