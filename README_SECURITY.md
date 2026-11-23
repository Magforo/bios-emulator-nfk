# Система защиты пользовательских данных для MartynenkoProject

## 📋 Обзор

Это комплексная система защиты для регистрации и входа пользователей с максимальным уровнем безопасности. Система реализует все современные стандарты безопасности веб-приложений.

## 🔒 Основные функции безопасности

### Аутентификация и кодирование
- ✅ **Argon2id** - самый современный алгоритм хеширования паролей
- ✅ **Требования к паролям**: 12+ символов, прописные/строчные буквы, цифры, спецсимволы
- ✅ **История паролей** - предотвращение повторного использования

### Защита от атак
- ✅ **CSRF токены** - защита от подделки запросов
- ✅ **SQL Injection** - подготовленные запросы и валидация вводов
- ✅ **XSS** - кодирование вывода, безопасные заголовки
- ✅ **Brute Force** - двухуровневое rate limiting и блокировка аккаунта
- ✅ **HTTPS** обязательно в production

### Управление сессиями
- ✅ **Безопасные cookies** - HttpOnly, Secure, SameSite=Strict
- ✅ **Таймаут сессии** - 30 минут неактивности
- ✅ **Регенерация ID** при входе
- ✅ **Проверка IP и User Agent**

### Хранение данных
- ✅ **SQLite** с шифрованием на уровне ОС
- ✅ **Разрешения файлов** - 0600 для БД, 0700 для директорий
- ✅ **Резервные копии** - автоматические и ручные
- ✅ **Вне веб-корня** - защита от веб-доступа

### Логирование и мониторинг
- ✅ **История входов** с IP, User Agent, время
- ✅ **Логи подозрительной активности** - попытки SQL injection, XSS и т.д.
- ✅ **Логирование регистраций** - кто, когда, с какого IP
- ✅ **PHP ошибки** - не выводятся пользователю, только логируются

## 📁 Структура проекта

```
xampp_bios/
├── 📄 Основные файлы
│   ├── registraion.html          # Форма регистрации
│   ├── login.html                # Форма входа
│   ├── bios.html                 # Главная страница (требует входа)
│   └── regstyle.css              # Стили форм
│
├── 🔐 PHP файлы безопасности
│   ├── save_to_file.php          # Обработка регистрации
│   ├── login_process.php         # Обработка входа
│   ├── get_csrf_token.php        # Генерация CSRF токенов
│   ├── config_security.php       # Конфигурация параметров безопасности
│   ├── DatabaseManager.php       # Управление БД и резервными копиями
│   ├── SessionValidator.php      # Валидация сессий
│   ├── SecurityLogger.php        # Логирование безопасности событий
│   └── init_security.php         # Инициализация системы при установке
│
├── 📊 Данные
│   ├── data/
│   │   ├── userdata.sqlite       # База данных пользователей
│   │   ├── userdata.sqlite-wal   # Write-Ahead Log
│   │   ├── userdata.sqlite-shm   # Shared Memory
│   │   └── backups/              # Резервные копии БД
│   │
│   └── security_logs/            # Логи безопасности
│       ├── php_errors.log        # PHP ошибки
│       ├── login.log             # История входов
│       ├── registration.log      # История регистраций
│       ├── suspicious.log        # Подозрительная активность
│       ├── login_attempts.json   # JSON данные лимитов
│       └── rate_limit.json       # Rate limit счетчики
│
└── 📚 Документация
    ├── SECURITY.md               # Подробная документация по безопасности
    ├── INSTALLATION.md           # Инструкции по развертыванию
    ├── .htaccess                 # Конфигурация Apache
    └── nginx.conf.example        # Пример конфигурации Nginx

```

## 🚀 Быстрый старт

### 1. Инициализация (локально)

```bash
cd e:\mylifesite\xampp\htdocs\xampp_bios
php init_security.php
```

### 2. Регистрация пользователя

Откройте в браузере:
```
http://localhost/xampp/htdocs/xampp_bios/registraion.html
```

### 3. Вход в систему

```
http://localhost/xampp/htdocs/xampp_bios/login.html
```

## 🔑 Требования к пароля

- **Минимум 12 символов**
- **Обязательны:** Прописные, строчные, цифры, спецсимволы
- **Примеры válидных паролей:**
  - `MySecure@Pass123`
  - `Str0ng!P@ssw0rd`
  - `C0mpl3x$Pwd#2024`

## 📊 Структура БД

### Таблица `users`
```sql
- id: уникальный ID
- first_name: Ім'я
- last_name: Прізвище
- password_hash: хеш пароля (Argon2id)
- created_at: дата создания
- ip: IP при регистрации
- user_agent: Браузер
- verified: статус верификации
- last_login: последний вход
- login_attempts: попытки входа
- locked_until: время разблокировки (если заблокирован)
```

### Таблица `login_history`
```sql
- id: ID записи
- user_id: ID пользователя
- ip: IP адрес
- user_agent: Браузер
- login_time: время попытки
- success: успешен ли вход (0/1)
- failure_reason: причина ошибки
```

### Таблица `password_history`
```sql
- id: ID записи
- user_id: ID пользователя
- password_hash: старый хеш пароля
- created_at: дата изменения
```

## 🛡️ Механизмы защиты

### Rate Limiting
- **Регистрация:** 5 попыток в час на IP
- **Вход:** 10 попыток в час на IP
- **Блокировка аккаунта:** 5 неудачных входов = блокировка на 30 минут

### Заголовки безопасности
```http
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Strict-Transport-Security: max-age=31536000; includeSubDomains
Referrer-Policy: strict-origin-when-cross-origin
```

### Параметры сессии
```php
HttpOnly: true        // Недоступны JavaScript
Secure: true          // Только HTTPS
SameSite: Strict      // Защита CSRF
Timeout: 30 минут
```

## 🔍 Мониторинг

### Проверка логов в реальном времени

```bash
# Все логи
tail -f security_logs/*.log

# Только подозрительная активность
tail -f security_logs/suspicious.log

# История входов
tail -f security_logs/login.log
```

## 📋 Требования

- PHP 7.4+ (рекомендуется 8.0+)
- SQLite 3
- Apache или Nginx
- HTTPS сертификат (для production)

## 📖 Документация

- **[SECURITY.md](SECURITY.md)** - Подробная информация о всех функциях безопасности
- **[INSTALLATION.md](INSTALLATION.md)** - Полная инструкция по развертыванию
- **Коды HTTP:**
  - 201: Успешная регистрация
  - 200: Успешный вход
  - 400: Ошибка валидации
  - 401: Неверные учетные данные
  - 409: Пользователь уже существует
  - 429: Превышено ограничение скорости
  - 500: Ошибка сервера

## 🔧 Конфигурация

Все параметры безопасности в файле `config_security.php`:

```php
[
    'password' => [
        'min_length' => 12,
        'require_uppercase' => true,
        'require_lowercase' => true,
        'require_numbers' => true,
        'require_special_chars' => true,
    ],
    'rate_limit' => [
        'registration_attempts' => 5,
        'login_attempts' => 10,
        'time_window' => 3600,  // 1 час
    ],
    'session' => [
        'timeout' => 1800,      // 30 минут
        'cookie_secure' => true,
        'cookie_httponly' => true,
        'cookie_samesite' => 'Strict',
    ],
    'account' => [
        'max_failed_login_attempts' => 5,
        'lockout_duration' => 1800,  // 30 минут
    ]
]
```

## 💡 Рекомендации

### Для Development
- Используйте localhost или 127.0.0.1
- HTTPS не обязателен на localhost
- Регулярно проверяйте логи безопасности

### Для Production
1. **Обязательно установите HTTPS** (Let's Encrypt рекомендуется)
2. **Настройте WAF** (ModSecurity для Apache)
3. **Регулярно обновляйте** PHP и зависимости
4. **Создавайте резервные копии** БД
5. **Мониторьте логи** на предмет атак
6. **Используйте 2FA** для администраторов

## 📞 Технические детали

### Хеширование паролей
- Алгоритм: **Argon2id** (PASSWORD_ARGON2ID)
- Параметры:
  - memory_cost: 65536 КБ
  - time_cost: 4 итерации
  - threads: 1

### Защита сессий
- Регенерация ID при входе
- Проверка IP и User Agent
- Таймаут: 30 минут неактивности
- Безопасное уничтожение при выходе

### CSRF защита
- Длина токена: 64 символа (hex)
- Обновление: каждый час
- Валидация: constant-time сравнение

## ⚠️ Важно

1. **Никогда не хранить пароли в plaintext**
2. **Всегда использовать HTTPS в production**
3. **Регулярно обновлять зависимости**
4. **Мониторить логи безопасности**
5. **Создавать резервные копии БД**

## 📝 Лицензия

Этот проект защищен и предназначен для использования в MartynenkoProject.

## 🤝 Поддержка

При возникновении проблем:
1. Проверьте файл `security_logs/php_errors.log`
2. Проверьте права доступа на файлы
3. Убедитесь в наличии HTTPS (в production)
4. Смотрите [INSTALLATION.md](INSTALLATION.md) для решения проблем

---

**Версия:** 1.0.0  
**Дата обновления:** 2024  
**Статус:** Production Ready ✅
