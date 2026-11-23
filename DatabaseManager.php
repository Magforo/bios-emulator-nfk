<?php
/**
 * Database Initializer and Backup Manager
 * Handles database setup and security backups
 */

declare(strict_types=1);

class DatabaseManager
{
    private $dbFile;
    private $config;
    private $pdo;

    public function __construct(array $config)
    {
        $this->config = $config;
        $this->dbFile = $config['database']['path'];
        $this->ensureDataDirectory();
    }

    private function ensureDataDirectory(): void
    {
        $dir = dirname($this->dbFile);
        if (!is_dir($dir)) {
            if (!@mkdir($dir, 0700, true)) {
                throw new Exception("Failed to create data directory: $dir");
            }
        }
    }

    public function initializeDatabase(): PDO
    {
        $this->pdo = new PDO('sqlite:' . $this->dbFile);
        $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        
        // Security pragmas
        $this->pdo->exec("PRAGMA foreign_keys = ON");
        $this->pdo->exec("PRAGMA journal_mode = WAL");
        $this->pdo->exec("PRAGMA synchronous = FULL");
        $this->pdo->exec("PRAGMA temp_store = MEMORY");
        $this->pdo->exec("PRAGMA locking_mode = NORMAL");
        $this->pdo->exec("PRAGMA timeout = 5000");

        $this->createTables();
        $this->setFilePermissions();

        return $this->pdo;
    }

    private function createTables(): void
    {
        // Users table
        $this->pdo->exec("CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            first_name TEXT NOT NULL,
            last_name TEXT NOT NULL,
            password_hash TEXT NOT NULL,
            created_at TEXT NOT NULL,
            updated_at TEXT,
            avatar_data TEXT,
            avatar_updated_at TEXT,
            can_view_audit INTEGER DEFAULT 0,
            hide_presence_mode INTEGER DEFAULT 0,
            last_activity_at TEXT,
            force_logout_at TEXT,
            ip TEXT NOT NULL,
            user_agent TEXT,
            verified INTEGER DEFAULT 0,
            verified_at TEXT,
            last_login TEXT,
            login_attempts INTEGER DEFAULT 0,
            locked_until TEXT,
            blocked_at TEXT,
            is_admin INTEGER DEFAULT 0,
            is_active INTEGER DEFAULT 1,
            UNIQUE(first_name, last_name)
        )");

        // Login history table
        $this->pdo->exec("CREATE TABLE IF NOT EXISTS login_history (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            ip TEXT NOT NULL,
            user_agent TEXT,
            login_time TEXT NOT NULL,
            success INTEGER DEFAULT 0,
            failure_reason TEXT,
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        )");

        // Password history table
        $this->pdo->exec("CREATE TABLE IF NOT EXISTS password_history (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            password_hash TEXT NOT NULL,
            created_at TEXT NOT NULL,
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        )");

        // Session table for better session management
        $this->pdo->exec("CREATE TABLE IF NOT EXISTS sessions (
            id TEXT PRIMARY KEY,
            user_id INTEGER,
            ip TEXT NOT NULL,
            user_agent TEXT,
            created_at TEXT NOT NULL,
            last_activity TEXT NOT NULL,
            expires_at TEXT NOT NULL,
            data TEXT,
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        )");

        // Audit log table
        $this->pdo->exec("CREATE TABLE IF NOT EXISTS audit_log (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER,
            action TEXT NOT NULL,
            details TEXT,
            ip TEXT NOT NULL,
            timestamp TEXT NOT NULL,
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
        )");

        // Admin gallery table
        $this->pdo->exec("CREATE TABLE IF NOT EXISTS admin_gallery (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            owner_user_id INTEGER NOT NULL,
            image_data TEXT NOT NULL,
            caption TEXT,
            created_at TEXT NOT NULL,
            deleted_at TEXT,
            deleted_by_user_id INTEGER,
            FOREIGN KEY (owner_user_id) REFERENCES users(id) ON DELETE CASCADE
        )");

        // BIOS tasks catalog
        $this->pdo->exec("CREATE TABLE IF NOT EXISTS bios_task_catalog (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            code TEXT NOT NULL UNIQUE,
            title TEXT NOT NULL,
            is_active INTEGER DEFAULT 1,
            created_at TEXT NOT NULL,
            updated_at TEXT
        )");

        // Per-user BIOS task settings
        $this->pdo->exec("CREATE TABLE IF NOT EXISTS user_bios_settings (
            user_id INTEGER PRIMARY KEY,
            visible_task_count INTEGER NOT NULL DEFAULT 10,
            updated_at TEXT,
            updated_by_user_id INTEGER,
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
            FOREIGN KEY (updated_by_user_id) REFERENCES users(id) ON DELETE SET NULL
        )");

        // Per-user BIOS task assignments
        $this->pdo->exec("CREATE TABLE IF NOT EXISTS user_bios_task_assignments (
            user_id INTEGER NOT NULL,
            task_id INTEGER NOT NULL,
            sort_order INTEGER DEFAULT 0,
            assigned_at TEXT NOT NULL,
            assigned_by_user_id INTEGER,
            PRIMARY KEY (user_id, task_id),
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
            FOREIGN KEY (task_id) REFERENCES bios_task_catalog(id) ON DELETE CASCADE,
            FOREIGN KEY (assigned_by_user_id) REFERENCES users(id) ON DELETE SET NULL
        )");

        // PvP invites between users
        $this->pdo->exec("CREATE TABLE IF NOT EXISTS pvp_invites (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            inviter_user_id INTEGER NOT NULL,
            invitee_user_id INTEGER NOT NULL,
            status TEXT NOT NULL DEFAULT 'pending',
            request_type TEXT NOT NULL DEFAULT 'user',
            requested_task_count INTEGER,
            battle_id INTEGER,
            created_at TEXT NOT NULL,
            expires_at TEXT,
            responded_at TEXT,
            FOREIGN KEY (inviter_user_id) REFERENCES users(id) ON DELETE CASCADE,
            FOREIGN KEY (invitee_user_id) REFERENCES users(id) ON DELETE CASCADE
        )");

        // PvP battles metadata
        $this->pdo->exec("CREATE TABLE IF NOT EXISTS pvp_battles (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            mode TEXT NOT NULL DEFAULT 'user_random',
            status TEXT NOT NULL DEFAULT 'active',
            created_by_user_id INTEGER NOT NULL,
            player1_user_id INTEGER NOT NULL,
            player2_user_id INTEGER NOT NULL,
            winner_user_id INTEGER,
            total_tasks INTEGER NOT NULL,
            created_at TEXT NOT NULL,
            started_at TEXT,
            ended_at TEXT,
            FOREIGN KEY (created_by_user_id) REFERENCES users(id) ON DELETE SET NULL,
            FOREIGN KEY (player1_user_id) REFERENCES users(id) ON DELETE CASCADE,
            FOREIGN KEY (player2_user_id) REFERENCES users(id) ON DELETE CASCADE,
            FOREIGN KEY (winner_user_id) REFERENCES users(id) ON DELETE SET NULL
        )");

        // Tasks selected for specific battle
        $this->pdo->exec("CREATE TABLE IF NOT EXISTS pvp_battle_tasks (
            battle_id INTEGER NOT NULL,
            task_id INTEGER NOT NULL,
            sort_order INTEGER DEFAULT 0,
            PRIMARY KEY (battle_id, task_id),
            FOREIGN KEY (battle_id) REFERENCES pvp_battles(id) ON DELETE CASCADE,
            FOREIGN KEY (task_id) REFERENCES bios_task_catalog(id) ON DELETE CASCADE
        )");

        // Per-task completion for each battle participant
        $this->pdo->exec("CREATE TABLE IF NOT EXISTS pvp_battle_task_completions (
            battle_id INTEGER NOT NULL,
            user_id INTEGER NOT NULL,
            task_code TEXT NOT NULL,
            completed_at TEXT NOT NULL,
            PRIMARY KEY (battle_id, user_id, task_code),
            FOREIGN KEY (battle_id) REFERENCES pvp_battles(id) ON DELETE CASCADE,
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        )");

        // Create indexes for performance
        $this->pdo->exec("CREATE INDEX IF NOT EXISTS idx_users_name ON users(first_name, last_name)");
        $this->pdo->exec("CREATE INDEX IF NOT EXISTS idx_login_history_user ON login_history(user_id)");
        $this->pdo->exec("CREATE INDEX IF NOT EXISTS idx_login_history_time ON login_history(login_time)");
        $this->pdo->exec("CREATE INDEX IF NOT EXISTS idx_password_history_user ON password_history(user_id)");
        $this->pdo->exec("CREATE INDEX IF NOT EXISTS idx_sessions_user ON sessions(user_id)");
        $this->pdo->exec("CREATE INDEX IF NOT EXISTS idx_sessions_expires ON sessions(expires_at)");
        $this->pdo->exec("CREATE INDEX IF NOT EXISTS idx_audit_log_user ON audit_log(user_id)");
        $this->pdo->exec("CREATE INDEX IF NOT EXISTS idx_audit_log_action ON audit_log(action)");
        $this->pdo->exec("CREATE INDEX IF NOT EXISTS idx_admin_gallery_owner ON admin_gallery(owner_user_id)");
        $this->pdo->exec("CREATE INDEX IF NOT EXISTS idx_bios_task_catalog_active ON bios_task_catalog(is_active)");
        $this->pdo->exec("CREATE INDEX IF NOT EXISTS idx_user_bios_assignments_user ON user_bios_task_assignments(user_id)");
        $this->pdo->exec("CREATE INDEX IF NOT EXISTS idx_user_bios_assignments_sort ON user_bios_task_assignments(user_id, sort_order, task_id)");
        $this->pdo->exec("CREATE INDEX IF NOT EXISTS idx_pvp_invites_invitee_status ON pvp_invites(invitee_user_id, status)");
        $this->pdo->exec("CREATE INDEX IF NOT EXISTS idx_pvp_invites_inviter_status ON pvp_invites(inviter_user_id, status)");
        $this->pdo->exec("CREATE INDEX IF NOT EXISTS idx_pvp_battles_players_status ON pvp_battles(player1_user_id, player2_user_id, status)");
        $this->pdo->exec("CREATE INDEX IF NOT EXISTS idx_pvp_battle_tasks_battle ON pvp_battle_tasks(battle_id, sort_order)");
        $this->pdo->exec("CREATE INDEX IF NOT EXISTS idx_pvp_battle_completions_lookup ON pvp_battle_task_completions(battle_id, user_id)");

        $this->ensureUserProfileColumns();
        $this->ensureAdminGalleryColumns();
        $this->ensureBiosTaskColumns();
        $this->seedDefaultBiosTasks();
    }

    private function ensureUserProfileColumns(): void
    {
        $columnsResult = $this->pdo->query("PRAGMA table_info(users)");
        $existingColumns = [];

        foreach ($columnsResult->fetchAll(PDO::FETCH_ASSOC) as $column) {
            $existingColumns[] = $column['name'] ?? '';
        }

        if (!in_array('avatar_data', $existingColumns, true)) {
            $this->pdo->exec("ALTER TABLE users ADD COLUMN avatar_data TEXT");
        }

        if (!in_array('avatar_updated_at', $existingColumns, true)) {
            $this->pdo->exec("ALTER TABLE users ADD COLUMN avatar_updated_at TEXT");
        }

        if (!in_array('is_admin', $existingColumns, true)) {
            $this->pdo->exec("ALTER TABLE users ADD COLUMN is_admin INTEGER DEFAULT 0");
        }

        if (!in_array('can_view_audit', $existingColumns, true)) {
            $this->pdo->exec("ALTER TABLE users ADD COLUMN can_view_audit INTEGER DEFAULT 0");
        }

        if (!in_array('hide_presence_mode', $existingColumns, true)) {
            $this->pdo->exec("ALTER TABLE users ADD COLUMN hide_presence_mode INTEGER DEFAULT 0");
        }

        if (!in_array('last_activity_at', $existingColumns, true)) {
            $this->pdo->exec("ALTER TABLE users ADD COLUMN last_activity_at TEXT");
        }

        if (!in_array('force_logout_at', $existingColumns, true)) {
            $this->pdo->exec("ALTER TABLE users ADD COLUMN force_logout_at TEXT");
        }

        if (!in_array('blocked_at', $existingColumns, true)) {
            $this->pdo->exec("ALTER TABLE users ADD COLUMN blocked_at TEXT");
        }

        // Super admin (ID 5) always has admin privileges
        $this->pdo->exec("UPDATE users SET is_admin = 1 WHERE id = 5");
    }

    private function ensureAdminGalleryColumns(): void
    {
        $columnsResult = $this->pdo->query("PRAGMA table_info(admin_gallery)");
        $existingColumns = [];

        foreach ($columnsResult->fetchAll(PDO::FETCH_ASSOC) as $column) {
            $existingColumns[] = $column['name'] ?? '';
        }

        if (!in_array('deleted_at', $existingColumns, true)) {
            $this->pdo->exec("ALTER TABLE admin_gallery ADD COLUMN deleted_at TEXT");
        }

        if (!in_array('deleted_by_user_id', $existingColumns, true)) {
            $this->pdo->exec("ALTER TABLE admin_gallery ADD COLUMN deleted_by_user_id INTEGER");
        }

        $this->pdo->exec("CREATE INDEX IF NOT EXISTS idx_admin_gallery_deleted_at ON admin_gallery(deleted_at)");
    }

    private function ensureBiosTaskColumns(): void
    {
        $catalogColumnsResult = $this->pdo->query("PRAGMA table_info(bios_task_catalog)");
        $catalogColumns = [];
        foreach ($catalogColumnsResult->fetchAll(PDO::FETCH_ASSOC) as $column) {
            $catalogColumns[] = $column['name'] ?? '';
        }

        if (!in_array('updated_at', $catalogColumns, true)) {
            $this->pdo->exec("ALTER TABLE bios_task_catalog ADD COLUMN updated_at TEXT");
        }

        $settingsColumnsResult = $this->pdo->query("PRAGMA table_info(user_bios_settings)");
        $settingsColumns = [];
        foreach ($settingsColumnsResult->fetchAll(PDO::FETCH_ASSOC) as $column) {
            $settingsColumns[] = $column['name'] ?? '';
        }

        if (!in_array('updated_by_user_id', $settingsColumns, true)) {
            $this->pdo->exec("ALTER TABLE user_bios_settings ADD COLUMN updated_by_user_id INTEGER");
        }

        $assignColumnsResult = $this->pdo->query("PRAGMA table_info(user_bios_task_assignments)");
        $assignColumns = [];
        foreach ($assignColumnsResult->fetchAll(PDO::FETCH_ASSOC) as $column) {
            $assignColumns[] = $column['name'] ?? '';
        }

        if (!in_array('sort_order', $assignColumns, true)) {
            $this->pdo->exec("ALTER TABLE user_bios_task_assignments ADD COLUMN sort_order INTEGER DEFAULT 0");
        }

        if (!in_array('assigned_at', $assignColumns, true)) {
            $this->pdo->exec("ALTER TABLE user_bios_task_assignments ADD COLUMN assigned_at TEXT");
            $this->pdo->exec("UPDATE user_bios_task_assignments SET assigned_at = COALESCE(assigned_at, datetime('now'))");
        }

        if (!in_array('assigned_by_user_id', $assignColumns, true)) {
            $this->pdo->exec("ALTER TABLE user_bios_task_assignments ADD COLUMN assigned_by_user_id INTEGER");
        }
    }

    private function seedDefaultBiosTasks(): void
    {
        $defaultTasks = [
            ['code' => 'boot_priority_order', 'title' => 'Зміна пріоритету завантаження – налаштування порядку завантаження пристроїв (HDD, SSD, USB, CD/DVD).'],
            ['code' => 'toggle_hw_components', 'title' => 'Увімкнення/вимкнення апаратних компонентів – керування портами USB, звуковою картою, мережею та іншими пристроями.'],
            ['code' => 'cpu_memory_overclock', 'title' => 'Розгін процесора чи оперативної пам\'яті.'],
            ['code' => 'fan_speed_tuning', 'title' => 'Налаштування швидкості обертання кулерів – керування вентиляторами для кращого охолодження або зниження шуму.'],
            ['code' => 'select_4_cores', 'title' => 'Виберіть 4 ядра.'],
            ['code' => 'reset_bios_password', 'title' => 'Скидання пароля BIOS – видалення або встановлення пароля для обмеження доступу.'],
            ['code' => 'update_bios_firmware', 'title' => 'Оновлення мікропрограми BIOS – оновлення для покращення стабільності та підтримки нового обладнання.'],
            ['code' => 'factory_reset_bios', 'title' => 'Скидання всіх налаштувань BIOS до заводських'],
            ['code' => 'set_bios_time_205342', 'title' => 'Встановіть час у BIOS на 20:53:42.'],
            ['code' => 'set_pci_latency_160', 'title' => 'Змініть значення PCI Latency Timer на 160.'],
            ['code' => 'set_cpu_freq_220', 'title' => 'Установіть CPU Frequency на 220 MHz.'],
            ['code' => 'set_pcie_freq_105', 'title' => 'Змініть PCIE Frequency на 105 MHz.'],
            ['code' => 'disable_spread_spectrum', 'title' => 'Вимкніть Spread Spectrum для стабільного розгону.'],
            ['code' => 'enable_boot_failure_guard', 'title' => 'Увімкніть Boot Failure Guard.'],
            ['code' => 'set_boot_failure_guard_count_5', 'title' => 'Встановіть Boot Failure Guard Count на 5.'],
            ['code' => 'set_cpu_active_cores_2', 'title' => 'Змініть CPU Active Core Control на 2 ядра.'],
            ['code' => 'enable_amd_turbo_core', 'title' => 'Увімкніть AMD Turbo Core Technology.'],
            ['code' => 'disable_amd_c_state', 'title' => 'Вимкніть AMD C-State Support.'],
            ['code' => 'enable_amd_apm', 'title' => 'Увімкніть AMD APM.'],
            ['code' => 'set_cpu_multiplier_x18', 'title' => 'Встановіть CPU Frequency Multiplier на x18.0.'],
            ['code' => 'set_cpu_voltage_1350', 'title' => 'Змініть CPU Voltage на 1.3500 V.'],
            ['code' => 'set_nb_multiplier_x9', 'title' => 'Встановіть NB Frequency Multiplier на x9.0.'],
            ['code' => 'enable_onboard_gpu_override', 'title' => 'Увімкніть Onboard GPU Clock Override.'],
            ['code' => 'set_onboard_gpu_1800', 'title' => 'Змініть Onboard GPU Clock на 1800 MHz.'],
            ['code' => 'set_dram_voltage_150', 'title' => 'Встановіть DRAM Voltage на 1.50 V.'],
            ['code' => 'disable_onboard_lan', 'title' => 'Вимкніть Onboard LAN у Chipset Configuration.'],
            ['code' => 'set_primary_graphics_pci', 'title' => 'Змініть Primary Graphics Adapter на PCI.'],
            ['code' => 'set_internal_graphics_uma', 'title' => 'Встановіть Internal Graphics Mode у UMA.'],
            ['code' => 'disable_onboard_sata', 'title' => 'Вимкніть Onboard SATA Controller.'],
            ['code' => 'set_sata_mode_ide', 'title' => 'Змініть SATA Operation Mode з AHCI на IDE.'],
        ];

        $existingStmt = $this->pdo->query("SELECT code FROM bios_task_catalog");
        $existingCodes = [];
        foreach ($existingStmt->fetchAll(PDO::FETCH_ASSOC) as $row) {
            $existingCodes[] = (string)($row['code'] ?? '');
        }

        $insertStmt = $this->pdo->prepare('INSERT INTO bios_task_catalog (code, title, is_active, created_at, updated_at) VALUES (:code, :title, 1, :created_at, NULL)');
        $now = date('c');
        foreach ($defaultTasks as $task) {
            if (in_array($task['code'], $existingCodes, true)) {
                continue;
            }
            $insertStmt->execute([
                ':code' => $task['code'],
                ':title' => $task['title'],
                ':created_at' => $now,
            ]);
        }
    }

    private function setFilePermissions(): void
    {
        $permissions = $this->config['database']['permissions'];
        @chmod($this->dbFile, $permissions);
        
        // Also set permissions on WAL and SHM files
        @chmod($this->dbFile . '-wal', $permissions);
        @chmod($this->dbFile . '-shm', $permissions);
    }

    public function createBackup(): string
    {
        $backupDir = dirname($this->dbFile) . '/backups';
        if (!is_dir($backupDir)) {
            @mkdir($backupDir, 0700, true);
        }

        $timestamp = date('Y-m-d_H-i-s');
        $backupFile = $backupDir . '/userdata_' . $timestamp . '.sqlite';

        if (!copy($this->dbFile, $backupFile)) {
            throw new Exception("Failed to create database backup");
        }

        @chmod($backupFile, 0600);

        // Keep only last 10 backups
        $this->cleanOldBackups($backupDir, 10);

        return $backupFile;
    }

    private function cleanOldBackups(string $dir, int $keep): void
    {
        $files = scandir($dir, SCANDIR_SORT_DESCENDING);
        $backups = array_filter($files, function($f) {
            return strpos($f, 'userdata_') === 0 && strpos($f, '.sqlite') !== false;
        });

        $toDelete = array_slice($backups, $keep);
        foreach ($toDelete as $file) {
            @unlink($dir . '/' . $file);
        }
    }

    public function getPDO(): PDO
    {
        if (!$this->pdo) {
            throw new Exception("Database not initialized");
        }
        return $this->pdo;
    }
}

// Helper function
function getDatabaseManager(array $config): DatabaseManager
{
    return new DatabaseManager($config);
}
?>
