<?php
/**
 * Функция выхода пользователя (logout)
 */

session_start();

// Удаляем все данные сессии
$_SESSION = [];

// Удаляем куку сессии
if (ini_get("session.use_cookies")) {
    $params = session_get_cookie_params();
    setcookie(
        session_name(),
        '',
        time() - 42000,
        $params["path"],
        $params["domain"],
        $params["secure"],
        $params["httponly"]
    );
}

// Уничтожаем сессию
session_destroy();

// Возвращаем успешный ответ и перенаправляем
header('Content-Type: application/json; charset=utf-8');
http_response_code(200);
echo json_encode([
    'success' => true,
    'message' => 'Logged out successfully',
    'redirect' => 'login.html'
]);
?>
