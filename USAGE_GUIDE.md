# Руководство по использованию системы авторизации

## 📋 Обзор

Вы создали полноценную систему регистрации и авторизации с:
- ✅ Регистрация новых пользователей (`registraion.html` → `save_to_file.php`)
- ✅ Вход в систему (`login.html` → `login_process.php`)
- ✅ Смена пароля (`change_password.html` → `change_password.php`)
- ✅ Защита от взлома (CSRF, SQL Injection, брутфорс по аккаунту)
- ✅ Красивые уведомления (notification system)

---

## 🔐 Как работает система

```
1. Пользователь регистрируется на registraion.html
   ↓
2. Данные отправляются на save_to_file.php
   ↓
3. Пароль хешируется (Argon2id)
   ↓
4. Пользователь сохраняется в базу данных (userdata.sqlite)
   ↓
5. Пользователь входит на login.html
   ↓
6. Пароль проверяется через login_process.php
   ↓
7. Сессия PHP активирована ($_SESSION['user_id'] установлена)
   ↓
8. Пользователь имеет доступ к защищённым страницам (bios.html)
```

---

## 🎯 Как использовать на bios.html

### Вариант 1: Простой способ (рекомендуется)

#### Шаг 1: Добавьте скрипт в bios.html

В начало `</head>` добавьте:
```html
<script src="auth_helper.js"></script>
```

#### Шаг 2: Защитите страницу от неавторизованных пользователей

Измените открывающий тег `<html>`:
```html
<html lang="en" data-require-auth="true">
```

Теперь, если пользователь неавторизован, он будет перенаправлен на login.html

#### Шаг 3: Показывайте имя пользователя

В любом месте на странице добавьте:
```html
<!-- Показать полное имя пользователя -->
<div>Добро пожаловать, <span data-user-name>Guest</span>!</div>

<!-- Показать ID пользователя -->
<div>Ваш ID: <span data-user-id></span></div>
```

Это автоматически заполнится информацией из сессии.

#### Шаг 4: Добавьте кнопку выхода

```html
<button onclick="auth.logout()" class="logout-btn">Выход</button>
```

Или с красивым стилем:
```html
<button onclick="auth.logout()" style="
    background-color: #f44336;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
">
    Выход из системы
</button>
```

---

### Вариант 2: Более гибкий способ (для сложных случаев)

Если вам нужна более гибкая работа с авторизацией:

```javascript
// При загрузке страницы
document.addEventListener('DOMContentLoaded', async () => {
    // Проверяем авторизацию
    const isAuth = await auth.checkAuth();
    
    if (!isAuth) {
        // Пользователь не авторизован
        window.location.href = 'login.html';
        return;
    }
    
    // Пользователь авторизован - работаем с данными
    console.log('Текущий пользователь:', auth.user.full_name);
    console.log('ID пользователя:', auth.user.user_id);
    
    // Можем использовать данные как угодно
    document.getElementById('greeting').textContent = 
        `Добро пожаловать, ${auth.user.first_name}!`;
});
```

---

## 📝 Полный пример для bios.html

```html
<!DOCTYPE html>
<html lang="en" data-require-auth="true">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>BIOS Emulator</title>
    <link rel="stylesheet" href="bios.css">
    <script src="auth_helper.js"></script>
    <style>
        .user-panel {
            position: fixed;
            top: 10px;
            right: 10px;
            background: rgba(68, 0, 255, 0.1);
            padding: 10px 20px;
            border-radius: 4px;
            border: 1px solid rgb(68, 0, 255);
            font-size: 12px;
            z-index: 10000;
        }
        .user-panel button {
            background-color: #f44336;
            color: white;
            border: none;
            padding: 5px 10px;
            border-radius: 3px;
            cursor: pointer;
            margin-left: 10px;
            font-size: 12px;
        }
        .user-panel button:hover {
            background-color: #d32f2f;
        }
    </style>
</head>
<body>
    <!-- Панель пользователя в верхнем углу -->
    <div class="user-panel">
        <span data-user-name>Guest</span>
        <button onclick="auth.logout()">Выход</button>
    </div>

    <!-- Ваш контент BIOS здесь -->
    <div class="main">
        <!-- ... остальное содержимое ... -->
    </div>
</body>
</html>
```

---

## 🔧 Доступные методы JavaScript

```javascript
// Проверить авторизацию
await auth.checkAuth()  // возвращает true/false

// Получить данные пользователя
auth.user                // объект {user_id, first_name, last_name, full_name...}
auth.getFullName()      // "Иван Петренко"
auth.getUserId()        // 123
auth.isAuthenticated    // true/false

// Выход из системы
auth.logout()           // перенаправляет на login.html

// Требовать авторизацию
await auth.requireAuth()  // если не авторизован, перенаправляет на login.html

// Показать информацию пользователя
auth.displayUserInfo()   // заполняет элементы с data-user-name и data-user-id
```

---

## 💾 Файлы базы данных

Все данные хранятся в: `data/userdata.sqlite`

### Таблицы:
- **users** - информация о пользователях
- **password_history** - история па

rolей (для предотвращения переиспользования)
- **login_history** - история входов
- **sessions** - активные сессии (если используется)
- **audit_log** - логирование событий безопасности

---

## 🛡️ Что защищено?

### На регистрации:
- ✅ CSRF защита
- ✅ Rate limiting (5 попыток в час на IP)
- ✅ Валидация пароля (12+ символов, буквы, цифры, спецсимволы)
- ✅ Проверка на дублирование пользователей
- ✅ SQL Injection защита (prepared statements)

### При входе:
- ✅ CSRF защита
- ✅ Блокировка аккаунта (5 попыток = 30 мин блокировка)
- ✅ Защита от подбора пароля
- ✅ Логирование попыток входа

### Общее:
- ✅ Argon2id хеширование паролей
- ✅ Безопасные куки (HttpOnly, Secure, SameSite)
- ✅ HTTPS заголовки
- ✅ Логирование в файлы в security_logs/

---

## 📂 Структура файлов

```
xampp_bios/
├── registraion.html          # Форма регистрации
├── login.html                # Форма входа
├── change_password.html      # Форма смены пароля
├── bios.html                 # Основной сайт (защищённый)
├── save_to_file.php          # Обработка регистрации
├── login_process.php         # Обработка входа
├── change_password.php       # Обработка смены пароля
├── check_auth.php            # Проверка авторизации ⭐ NEW
├── logout.php                # Выход из системы ⭐ NEW
├── get_csrf_token.php        # Получение CSRF токена
├── auth_helper.js            # JavaScript помощник ⭐ NEW
├── config_security.php       # Настройки безопасности
├── DatabaseManager.php       # Управление БД
├── security_logs/            # Логи безопасности
└── data/
    └── userdata.sqlite       # База данных пользователей
```

---

## 🚀 Быстрый старт

1. **Откройте** `registraion.html` → зарегистрируйте пользователя
2. **Откройте** `login.html` → войдите с созданным паролем
3. **Обновите** `bios.html` как показано выше
4. **Добавьте** `<script src="auth_helper.js"></script>`
5. **Добавьте** `data-require-auth="true"` в `<html>`
6. **Готово!** Теперь bios.html защищена

---

## ❓ Частые вопросы

**Q: Как изменить текст при выходе?**
A: Измените текст в кнопке: `<button onclick="auth.logout()">Новый текст</button>`

**Q: Как получить только имя без фамилии?**
A: Используйте: `auth.user.first_name`

**Q: Где хранятся пароли?**
A: В файле `data/userdata.sqlite`, защищены Argon2id хешированием

**Q: Чем отличается от обычного входа?**
A: Это использует PHP сессии - безопасный способ, пароли никогда не передаются на JS

**Q: Как добавить логирование активности пользователя?**
A: В вашем коде используйте `auth.user.user_id` для логирования с ID пользователя

---

Вся система готова к использованию! 🎉
