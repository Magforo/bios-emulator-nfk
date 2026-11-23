# Инструкция по развертыванию системы защиты

## Требования

- PHP 7.4 или выше (рекомендуется PHP 8.0+)
- SQLite 3 (обычно входит в PHP)
- Apache или Nginx веб-сервер
- HTTPS сертификат для production окружения
- Разрешение на создание файлов и директорий

## Шаг 1: Инициализация системы безопасности

### Локально (XAMPP/Development)

1. Откройте терминал и перейдите в корневую директорию проекта:
```bash
cd e:\mylifesite\xampp\htdocs\xampp_bios
```

2. Запустите скрипт инициализации:
```bash
php init_security.php
```

Это создаст:
- Директории для логов и данных
- Базу данных SQLite с правильной структурой
- Резервную копию БД
- Файл .htaccess (если используется Apache)

### Через браузер

1. Откройте в браузере:
```
http://localhost/xampp/htdocs/xampp_bios/init_security.php
```

## Шаг 2: Проверка файловых прав

Убедитесь, что следующие директории существуют и имеют правильные права:

```bash
# Проверить директории (Linux/Mac)
ls -la data/
ls -la security_logs/

# Windows PowerShell
Get-Item -Path "data" | Format-List
Get-Item -Path "security_logs" | Format-List
```

Требуемые разрешения:
- `data/` - 0700 (владелец только читать/писать/выполнять)
- `security_logs/` - 0700
- `data/userdata.sqlite` - 0600

## Шаг 3: Настройка веб-сервера

### Для Apache

Файл `.htaccess` создается автоматически и содержит:
- Запрет на листинг директорий
- Редирект с HTTP на HTTPS
- Безопасные заголовки
- Защиту критичных файлов

### Для Nginx

Используйте конфигурацию из `nginx.conf.example`:

```bash
# Скопируйте конфигурацию
cp nginx.conf.example /etc/nginx/sites-available/yourdomain.conf

# Отредактируйте your-domain.com на ваш домен в конфигурации
nano /etc/nginx/sites-available/yourdomain.conf

# Активируйте конфиг
ln -s /etc/nginx/sites-available/yourdomain.conf /etc/nginx/sites-enabled/

# Проверьте синтаксис
nginx -t

# Перезагрузите Nginx
systemctl reload nginx
```

## Шаг 4: Настройка PHP

Убедитесь, что в `php.ini` установлены правильные параметры:

```ini
; Безопасность
display_errors = Off
log_errors = On
error_log = "path/to/security_logs/php_errors.log"

; Сессии
session.cookie_httponly = On
session.cookie_secure = On
session.cookie_samesite = Strict
session.use_only_cookies = On
session.use_strict_mode = On

; Загрузка файлов
file_uploads = On
upload_max_filesize = 2M
post_max_size = 2M

; Выполнение
max_execution_time = 30
max_input_time = 60
memory_limit = 128M
```

## Шаг 5: Настройка HTTPS (Production)

### Получение сертификата

**Для Let's Encrypt (бесплатно):**

```bash
# На Linux
sudo certbot certonly --standalone -d yourdomain.com

# Сертификаты будут в:
# /etc/letsencrypt/live/yourdomain.com/
```

**Для самоподписанного сертификата (тестирование):**

```bash
openssl req -x509 -newkey rsa:2048 -keyout key.pem -out cert.pem -days 365
```

### Настройка Apache

```apache
<VirtualHost *:443>
    ServerName yourdomain.com
    
    SSLEngine on
    SSLCertificateFile /etc/letsencrypt/live/yourdomain.com/fullchain.pem
    SSLCertificateKeyFile /etc/letsencrypt/live/yourdomain.com/privkey.pem
    
    DocumentRoot /var/www/xampp_bios
    
    <Directory /var/www/xampp_bios>
        AllowOverride All
        Require all granted
    </Directory>
</VirtualHost>

# Редирект HTTP -> HTTPS
<VirtualHost *:80>
    ServerName yourdomain.com
    Redirect / https://yourdomain.com/
</VirtualHost>
```

### Настройка Nginx

Используйте конфигурацию из `nginx.conf.example` с правильными путями к сертификатам.

## Шаг 6: Проверка установки

1. **Проверка структуры файлов:**
```bash
# Linux/Mac
tree -L 2 .

# PowerShell
Get-ChildItem -Recurse -Depth 2 | Format-Table FullName, Mode
```

2. **Проверка базы данных:**
```bash
# Проверить наличие файла БД
ls -la data/userdata.sqlite

# Проверить структуру (SQLite)
sqlite3 data/userdata.sqlite ".tables"
sqlite3 data/userdata.sqlite ".schema users"
```

3. **Проверка веб-доступа:**
```bash
# Попробуйте открить форму регистрации
http://yourdomain.com/registraion.html

# Должна получить CSRF токен
curl -s http://yourdomain.com/get_csrf_token.php
```

## Шаг 7: Резервные копии

Резервные копии создаются автоматически в `data/backups/`.

**Для автоматического резервного копирования (cron):**

```bash
# Добавьте в crontab (запуск каждый день в 2:00)
0 2 * * * php /var/www/xampp_bios/backup.php

# Просмотр существующих задач
crontab -l

# Редактирование
crontab -e
```

**Для Windows (Task Scheduler):**

1. Откройте Task Scheduler
2. Создайте новую задачу
3. Действие: `php.exe`
4. Аргументы: `C:\path\to\backup.php`
5. Расписание: ежедневно (например 2:00 AM)

## Шаг 8: Мониторинг

### Проверка логов

```bash
# Логи PHP ошибок
tail -f security_logs/php_errors.log

# Логи входа
tail -f security_logs/login.log

# Логи регистрации
tail -f security_logs/registration.log

# Подозрительная активность
tail -f security_logs/suspicious.log
```

### Мониторинг в реальном времени

```bash
# Все готовые логи
watch -n 1 'tail -20 security_logs/*.log'
```

## Решение проблем

### Проблема: "HTTPS required"

**Решение:** 
- В production окружении требуется HTTPS
- Для localhost/127.0.0.1 HTTPS не требуется
- Убедитесь, что домен в `config_security.php` добавлен в `allowed_hosts`

### Проблема: "Permission denied"

**Решение:**
```bash
# Linux/Mac
chmod 700 data security_logs
chmod 600 data/userdata.sqlite*

# PowerShell
# Может потребоваться запуск от администратора
```

### Проблема: "Database error"

**Решение:**
1. Проверьте наличие файла `data/userdata.sqlite`
2. Проверьте права доступа
3. Проверьте логи: `security_logs/php_errors.log`
4. Убедитесь, что SQLite доступна: `php -m | grep sqlite`

### Проблема: "Rate limit exceeded"

**Решение:** Подождите 1 час или очистите файл `security_logs/rate_limit.json` и `security_logs/login_attempts.json`

## Обслуживание

### Очистка старых логов

```bash
# Удалить логи старше 30 дней
find security_logs/ -name "*.log" -mtime +30 -delete

# Linux cron job
0 0 * * 0 find /path/to/security_logs -name "*.log" -mtime +30 -delete
```

### Работа с резервными копиями

```bash
# Восстановление из резервной копии
cp data/backups/userdata_2024-01-15_02-00-00.sqlite data/userdata.sqlite

# Удаление старых резервных копий (вручную)
rm data/backups/userdata_*.sqlite
```

## Безопасность в production

1. **Используйте переменные окружения** для хранения конфиденциальной информации
2. **Настройте WAF** (Web Application Firewall) - ModSecurity для Apache
3. **Включите двухфакторную аутентификацию** для администратора
4. **Регулярно обновляйте** PHP и зависимости
5. **Создавайте резервные копии** регулярно и проверяйте их
6. **Мониторьте логи** на предмет подозрительной активности
7. **Ограничьте доступ** к администраторским скриптам по IP

## Поддержка

При проблемах:
1. Проверьте файл `security_logs/php_errors.log`
2. Убедитесь, что все требования установлены
3. Проверьте права доступа на файлы
4. Убедитесь, что HTTPS правильно настроен (если production)

