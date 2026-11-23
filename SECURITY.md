# Система защиты пользовательских данных

## Обзор безопасности

Эта система реализует комплексные меры безопасности для защиты данных пользователей при регистрации и входе в систему.

## Реализованные функции безопасности

### 1. **Аутентификация и хеширование паролей**
- Использование **Argon2id** (самый безопасный алгоритм хеширования)
- Требования к паролям:
  - Минимум 12 символов
  - Обязательны прописные и строчные буквы
  - Обязательны цифры
  - Обязательны специальные символы (!@#$%^&*)
- История паролей (предотвращение повторного использования)

### 2. **Защита от атак**

#### CSRF (Cross-Site Request Forgery)
- Генерация уникальных токенов для каждой сессии
- Валидация токенов при отправке форм
- Регулярное обновление токенов (каждый час)

#### SQL Injection
- Использование подготовленных запросов (Prepared Statements)
- Валидация ввода на сервере
- Проверка символов в названиях

#### XSS (Cross-Site Scripting)
- Кодирование JSON выходов
- Заголовки `X-XSS-Protection`
- `Content-Security-Policy` в заголовках

#### Brute Force атаки
- Двухуровневое ограничение скорости (Rate Limiting):
  - По IP адресу: 5 попыток регистрации / 10 попыток входа в час
  - По сессии: резервное ограничение
- Блокировка аккаунта после 5 неудачных попыток входа (30 минут)

### 3. **Защита данных в передаче**
- Обязательное использование **HTTPS** в production
- Безопасные cookies:
  - `Secure` флаг (только HTTPS)
  - `HttpOnly` флаг (недоступны JavaScript)
  - `SameSite=Strict` (защита CSRF)
- Заголовки безопасности:
  - `Strict-Transport-Security` (HSTS)
  - `X-Content-Type-Options: nosniff`
  - `X-Frame-Options: DENY`
  - `Referrer-Policy: strict-origin-when-cross-origin`

### 4. **Хранение данных**
- Использование **SQLite** с шифрованием на уровне ОС
- Разрешения файлов базы данных: **0600** (только владелец)
- Пути к базе данных вне веб-корня
- Регулярные резервные копии

### 5. **Логирование и мониторинг**
- Логирование всех попыток входа (успешные и неудачные)
- Отслеживание истории логинов с IP и User Agent
- Логирование подозрительной активности
- Логирование регистраций
- PHP ошибки логируются, но не показываются пользователям

### 6. **Управление сессиями**
- Регенерация ID сессии при входе
- Таймаут сессии (30 минут)
- Проверка IP адреса и User Agent
- Безопасное уничтожение сессий

### 7. **Валидация входных данных**
- Проверка типов данных на сервере
- Проверка длины строк
- Проверка символов (только буквы, пробелы, дефисы, апострофы для имен)
- Защита от XSS через регулярные выражения

## Структура файлов

```
├── save_to_file.php          # Регистрация пользователей
├── login_process.php         # Обработка входа
├── get_csrf_token.php        # Генерация CSRF токенов
├── config_security.php       # Конфигурация безопасности
├── DatabaseManager.php       # Управление БД
├── SessionValidator.php      # Валидация сессий
├── SecurityLogger.php        # Логирование безопасности
├── data/
│   ├── userdata.sqlite      # База данных пользователей
│   ├── userdata.sqlite-wal  # Write-Ahead Log файл
│   ├── userdata.sqlite-shm  # Shared memory файл
│   └── backups/             # Резервные копии БД
└── security_logs/           # Логи безопасности
    ├── php_errors.log
    ├── login.log
    ├── registration.log
    ├── suspicious.log
    └── login_attempts.json
```

## Структура БД

### users
```sql
- id: INTEGER PRIMARY KEY
- first_name: TEXT
- last_name: TEXT
- password_hash: TEXT (Argon2id)
- created_at: TEXT
- updated_at: TEXT
- ip: TEXT (IP при регистрации)
- user_agent: TEXT
- verified: INTEGER (0/1)
- last_login: TEXT
- login_attempts: INTEGER
- locked_until: TEXT (для блокировки после неудачных попыток)
```

### login_history
```sql
- id: INTEGER PRIMARY KEY
- user_id: INTEGER FOREIGN KEY
- ip: TEXT
- user_agent: TEXT
- login_time: TEXT
- success: INTEGER (0/1)
- failure_reason: TEXT
```

### password_history
```sql
- id: INTEGER PRIMARY KEY
- user_id: INTEGER FOREIGN KEY
- password_hash: TEXT
- created_at: TEXT
```

## Требования к серверу

- PHP 7.4+ (рекомендуется 8.0+)
- SQLite 3
- HTTPS сертификат (для production)
- Разрешение на создание файлов в `/data/` и `/security_logs/`

## Конфигурация

Все параметры безопасности находятся в `config_security.php`:
- Требования к пароля
- Лимиты rate limiting
- Параметры сессии
- Пути логирования
- Параметры CSRF

## Использование

### Регистрация
```html
<form action="save_to_file.php" method="POST">
  <input type="text" name="first_name" required>
  <input type="text" name="second_name" required>
  <input type="password" name="password" required>
  <input type="password" name="confirm_password" required>
  <input type="hidden" name="csrf_token" id="csrf_token">
  <button type="submit">Зарегистрироваться</button>
</form>
```

CSRF токен загружается динамически через `get_csrf_token.php`.

### Вход
```html
<form action="login_process.php" method="POST">
  <input type="text" name="first_name" required>
  <input type="text" name="second_name" required>
  <input type="password" name="password" required>
  <input type="hidden" name="csrf_token" id="csrf_token">
  <button type="submit">Войти</button>
</form>
```

## Рекомендации

1. **Production требования:**
   - Включить HTTPS (обязательно)
   - Установить правильные разрешения файлов
   - Регулярно проверять логи безопасности
   - Создавать резервные копии БД

2. **Дополнительная безопасность:**
   - Настроить WAF (Web Application Firewall)
   - Установить мониторинг и алерты
   - Регулярно обновлять PHP и зависимости
   - Использовать двухфакторную аутентификацию (2FA)

3. **Мониторинг:**
   - Проверяйте `security_logs/suspicious.log` на подозрительную активность
   - Отслеживайте неудачные попытки входа
   - Контролируйте частоту регистраций

## Коды ошибок HTTP

- **200**: Успешный логин
- **201**: Успешная регистрация
- **400**: Невалидные данные
- **401**: Неверные учетные данные
- **403**: Ошибка CSRF или HTTPS требуется
- **405**: Недопустимый метод (требуется POST)
- **409**: Пользователь уже существует
- **415**: Неверный Content-Type
- **429**: Превышено ограничение скорости
- **500**: Ошибка сервера

## Логирование

Все логи находятся в `/security_logs/` с разделением по типам:
- `php_errors.log` - PHP ошибки
- `login.log` - История входов
- `registration.log` - История регистраций
- `suspicious.log` - Подозрительная активность
- `login_attempts.json` - JSON данные лимитов попыток

## Резервные копии

Резервные копии БД создаются автоматически и хранятся в `/data/backups/`. Сохраняются последние 10 копий.

## Версия

v1.0.0 - Полная система защиты с комплексными мерами безопасности
