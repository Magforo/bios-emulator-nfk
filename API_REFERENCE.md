# Справочник по файлам системы защиты

## 📄 Основные HTML/CSS файлы

### registraion.html
**Назначение:** Форма регистрации новых пользователей

**Функции:**
- Валидация паролей кроссткраузерно (JavaScript)
- Проверка совпадения паролей в реальном времени
- Индикатор мощности пароля (цветной)
- Загрузка CSRF токена
- Требования к паролю отображаются

**Поля:**
- Ім'я (first_name)
- Прізвище (second_name)
- Пароль (password)
- Подтверждение пароля (confirm_password)
- Скрытый CSRF токен (csrf_token)

---

### login.html
**Назначение:** Форма входа в систему

**Функции:**
- Динамическое приветствие (Добрий ранок/день/вечор/ночі)
- Загрузка CSRF токена
- Базовая валидация формы

**Поля:**
- Ім'я (first_name)
- Прізвище (second_name)
- Пароль (password)
- Скрытый CSRF токен (csrf_token)

---

### regstyle.css
**Назначение:** Стили для форм регистрации и входа

**Компоненты:**
- Стили контейнера формы
- Стили полей ввода
- Анимации и переходы
- Адаптивный дизайн

---

## 🔐 PHP файлы системы безопасности

### save_to_file.php
**Назначение:** Обработка и сохранение зарегистрированных пользователей

**Основной процесс:**
1. Проверка метода (только POST)
2. Проверка Content-Type
3. Проверка HTTPS (в production)
4. Проверка CSRF токена
5. Валидация входных данных (имена, пароль)
6. Проверка на дублирование пользователя
7. Хеширование пароля (Argon2id)
8. Сохранение в БД SQLite
9. Логирование события

**Возвращаемые коды:**
- 201: Успешная регистрация
- 400: Ошибка валидации
- 409: Пользователь уже существует
- 415: Неверный Content-Type
- 429: Превышено ограничение скорости
- 500: Ошибка сервера

**Защитные меры:**
- Rate limiting по IP (5 попыток/час)
- Валидация всех входов на сервере
- Подготовленные SQL запросы
- Логирование всех действий

---

### login_process.php
**Назначение:** Обработка входа пользователей

**Основной процесс:**
1. Проверка HTTPS, методу и Content-Type
2. Проверка CSRF токена
3. Rate limiting (10 попыток/час)
4. Поиск пользователя по имени
5. Проверка блокировки аккаунта
6. Верификация пароля
7. Обновление истории входа
8. Создание безопасной сессии
9. Логирование попытки (успешной или нет)

**Возвращаемые коды:**
- 200: Успешный логин
- 401: Неверные учетные данные
- 403: Ошибка CSRF или HTTPS требуется
- 429: Превышено ограничение скорости
- 500: Ошибка сервера

**Защитные меры:**
- Блокировка аккаунта после 5 неудачных попыток
- Логирование попыток с IP и User Agent
- Защита от brute force атак

---

### get_csrf_token.php
**Назначение:** Генерация и выдача CSRF токенов для форм

**Функции:**
- Генерирует новый токен при первом запросе
- Обновляет токен каждый час
- Возвращает JSON с токеном и временем жизни

**Ответ:**
```json
{
  "csrf_token": "64-символьная-строка-в-hex-формате",
  "expires_in": 3600
}
```

**Защитные меры:**
- Использует крипто-безопасный random_bytes()
- Отключает кеширование ответов

---

## ⚙️ Конфигурационные файлы

### config_security.php
**Назначение:** Централизованное управление всеми параметрами безопасности

**Основные разделы:**
- `password[]` - требования к паролям
- `rate_limit[]` - ограничения скорости
- `session[]` - параметры сессий
- `account[]` - блокировка аккаунта
- `database[]` - настройки БД
- `logging[]` - пути к логам
- `csrf[]` - параметры CSRF
- `headers[]` - безопасные заголовки HTTP

**Использование:**
```php
$config = require __DIR__ . '/config_security.php';
$timeout = $config['session']['timeout'];
```

---

## 🔨 Помощники и классы

### DatabaseManager.php
**Назначение:** Управление базой данных SQLite

**Класс:** `DatabaseManager`

**Основные методы:**
- `__construct(array $config)` - инициализация с конфигом
- `initializeDatabase(): PDO` - инициализация БД и таблиц
- `createBackup(): string` - создание резервной копии
- `getPDO(): PDO` - получить объект PDO

**Таблицы, создаваемые при инициализации:**
- `users` - данные пользователей
- `login_history` - история входов
- `password_history` - история паролей
- `sessions` - управление сессиями
- `audit_log` - журнал аудита

**Индексы для оптимизации:**
- `idx_users_name` - по имени и фамилии
- `idx_login_history_user` - по user_id
- `idx_login_history_time` - по времени

---

### SecurityLogger.php
**Назначение:** Логирование всех событий безопасности

**Класс:** `SecurityLogger`

**Основные методы:**
- `logRegistration(string, string, string, string)`
- `logLogin(string, string, string, bool, ?string)`
- `logSuspiciousActivity(string, string, string)`
- `logCSRFFailure(string)`
- `logRateLimitExceeded(string, string)`
- `logInvalidInput(string, string)`
- `logAccountLockout(int, string)`

**Логфайлы:**
- `registration.log` - все регистрации
- `login.log` - все попытки входа
- `suspicious.log` - подозрительные действия
- `php_errors.log` - PHP ошибки

---

### SessionValidator.php
**Назначение:** Валидация и управление сессиями

**Класс:** `SessionValidator`

**Основные методы:**
- `configure(array $config)` - установить конфигурацию
- `initializeSession()` - инициализация сессии с параметрами
- `validateSession(): bool` - проверить валидность сессии
- `getUser(): ?array` - получить информацию о пользователе
- `destroySession()` - безопасное удаление сессии

**Проверяемые параметры:**
- Наличие user_id и login_time
- Таймаут сессии
- IP адрес (опционально)
- User Agent (опционально)

---

## 🚀 Инициализация и установка

### init_security.php
**Назначение:** Первоначальная инициализация системы безопасности

**Функции:**
- Создание необходимых директорий
- Проверка и установка правильных разрешений
- Инициализация БД
- Создание первой резервной копии
- Создание .htaccess (Apache)
- Генерация конфигурации для Nginx

**Использование:**
```bash
# Из командной строки
php init_security.php

# Результат: инициализирует всю систему и выводит статус
```

---

## 📊 Структура базы данных

### Таблица users
```sql
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    password_hash TEXT NOT NULL,         -- Argon2id хеш
    created_at TEXT NOT NULL,            -- ISO 8601 дата
    updated_at TEXT,
    ip TEXT NOT NULL,                    -- IP при регистрации
    user_agent TEXT,                     -- Браузер
    verified INTEGER DEFAULT 0,          -- 0 или 1
    verified_at TEXT,
    last_login TEXT,
    login_attempts INTEGER DEFAULT 0,    -- Счетчик неудачных попыток
    locked_until TEXT,                   -- Время разблокировки
    is_active INTEGER DEFAULT 1,
    UNIQUE(first_name, last_name)
);
```

### Таблица login_history
```sql
CREATE TABLE login_history (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    ip TEXT NOT NULL,
    user_agent TEXT,
    login_time TEXT NOT NULL,
    success INTEGER DEFAULT 0,           -- 0 = неудача, 1 = успех
    failure_reason TEXT,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

### Таблица password_history
```sql
CREATE TABLE password_history (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    password_hash TEXT NOT NULL,
    created_at TEXT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

---

## 📂 Структура директорий

```
xampp_bios/
├── data/                           # Хранилище данных (защищено)
│   ├── userdata.sqlite             # База данных
│   ├── userdata.sqlite-wal         # Write-Ahead Log
│   ├── userdata.sqlite-shm         # Shared Memory
│   └── backups/                    # Резервные копии BД
│
└── security_logs/                  # Логи безопасности (защищены)
    ├── php_errors.log              # PHP ошибки
    ├── login.log                   # История входов
    ├── registration.log            # История регистраций
    ├── suspicious.log              # Подозрительные действия
    ├── login_attempts.json         # JSON счетчики лимитов
    └── rate_limit.json             # JSON счетчики rate limit
```

---

## 🔐 Механизмы шифрования и кодирования

### Пароли
- **Алгоритм:** Argon2id
- **Параметры:** memory_cost=65536, time_cost=4, threads=1
- **Результат:** BCRYPT-совместимый хеш

### CSRF токены
- **Источник:** random_bytes(32)
- **Кодирование:** bin2hex
- **Формат:** 64-символьная строка (hex)
- **Сравнение:** hash_equals (защита от timing attacks)

### Сессии
- **Хранилище:** PHP Sessions (файлы по умолчанию)
- **Параметры:** HttpOnly, Secure, SameSite=Strict
- **Таймаут:** 30 минут неактивности

---

## 📋 Чек-лист развертывания

### Перед запуском
- [ ] Запустить `init_security.php`
- [ ] Проверить наличие директории `data/`
- [ ] Проверить наличие директории `security_logs/`
- [ ] Проверить файл `data/userdata.sqlite`
- [ ] Проверить разрешения (700 для директорий, 600 для БД)

### Production требования
- [ ] HTTPS включен
- [ ] Обновлен PHP до версии 7.4+
- [ ] SQLite доступна
- [ ] Логирование включено
- [ ] Резервные копии настроены
- [ ] WAF настроен (опционально)
- [ ] Мониторинг логов настроен

---

## 🐛 Решение типичных проблем

| Проблема | Решение |
|----------|--------|
| "Database not found" | Запустить `init_security.php` |
| "Permission denied" | Установить права: chmod 700 data/ |
| "HTTPS required" | Для production требуется HTTPS |
| "Rate limit exceeded" | Подождать 1 час |
| "CSRF validation failed" | Страница загружена, не через форму |
| "Password too weak" | Требуются спецсимволы, цифры и т.д. |

---

## 📞 Быстрые команды

```bash
# Инициализация
php init_security.php

# Просмотр логов
tail -f security_logs/suspicious.log
tail -f security_logs/login.log

# Проверка БД
sqlite3 data/userdata.sqlite ".tables"
sqlite3 data/userdata.sqlite "SELECT COUNT(*) FROM users;"

# Права доступа
chmod 700 data security_logs
chmod 600 data/userdata.sqlite
```

---

**Версия документации:** 1.0.0  
**Обновлено:** 2024
