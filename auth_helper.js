/**
 * Auth Helper - Помощник для работы с авторизацией
 * Проверяет статус пользователя и управляет сессией
 */

class AuthHelper {
    constructor() {
        this.isAuthenticated = false;
        this.user = null;
        this.eventSource = null;
        this.revocationPollTimer = null;
    }

    /**
     * Проверить, авторизован ли пользователь
     */
    async checkAuth() {
        try {
            const response = await fetch('check_auth.php');
            const data = await response.json();
            
            if (response.ok && data.authenticated) {
                this.isAuthenticated = true;
                this.user = data;
                return true;
            } else {
                this.isAuthenticated = false;
                this.user = null;
                this.stopRealtimeAuthChannel();
                return false;
            }
        } catch (e) {
            console.error('Error checking auth:', e);
            this.isAuthenticated = false;
            this.user = null;
            this.stopRealtimeAuthChannel();
            return false;
        }
    }

    startRealtimeAuthChannel() {
        if (!this.isAuthenticated || this.eventSource || typeof EventSource === 'undefined') {
            return;
        }

        this.eventSource = new EventSource('realtime_auth_events.php');

        this.eventSource.addEventListener('force_logout', () => {
            this.handleRealtimeSignOut('forced_logout');
        });

        this.eventSource.addEventListener('account_blocked', () => {
            this.handleRealtimeSignOut('account_blocked');
        });

        this.eventSource.onerror = () => {
            // Browser auto-reconnects SSE; no manual action required here.
        };

        this.startRevocationPolling();
    }

    stopRealtimeAuthChannel() {
        if (this.eventSource) {
            this.eventSource.close();
            this.eventSource = null;
        }

        if (this.revocationPollTimer) {
            clearInterval(this.revocationPollTimer);
            this.revocationPollTimer = null;
        }
    }

    startRevocationPolling() {
        if (this.revocationPollTimer) {
            return;
        }

        this.revocationPollTimer = setInterval(async () => {
            if (!this.isAuthenticated) {
                return;
            }

            try {
                const response = await fetch('check_auth.php', {
                    method: 'GET',
                    credentials: 'same-origin',
                    cache: 'no-store'
                });

                if (response.status === 401 || response.status === 423) {
                    this.handleRealtimeSignOut('forced_logout');
                    return;
                }

                const data = await response.json();
                if (!response.ok || !data.authenticated) {
                    this.handleRealtimeSignOut('forced_logout');
                }
            } catch (error) {
                // Ignore transient network errors and keep polling.
            }
        }, 2000);
    }

    handleRealtimeSignOut(reason = 'forced_logout') {
        this.stopRealtimeAuthChannel();
        this.isAuthenticated = false;
        this.user = null;

        fetch('logout.php', { credentials: 'same-origin' }).catch(() => {});
        window.location.href = `login.html?reason=${encodeURIComponent(reason)}`;
    }

    /**
     * Получить имя пользователя
     */
    getFullName() {
        return this.user?.full_name || 'Guest';
    }

    /**
     * Получить ID пользователя
     */
    getUserId() {
        return this.user?.user_id || null;
    }

    /**
     * Выход из системы
     */
    async logout() {
        try {
            const response = await fetch('logout.php');
            const data = await response.json();
            
            if (data.success) {
                this.stopRealtimeAuthChannel();
                this.isAuthenticated = false;
                this.user = null;
                // Перенаправляем на страницу входа
                window.location.href = data.redirect;
            }
        } catch (e) {
            console.error('Error logging out:', e);
            // Даже если произошла ошибка, очищаем локальные данные
            this.stopRealtimeAuthChannel();
            this.isAuthenticated = false;
            this.user = null;
            window.location.href = 'login.html';
        }
    }

    /**
     * Требовано авторизацию - если пользователь не авторизован, 
     * перенаправляем на страницу входа
     */
    async requireAuth() {
        const isAuth = await this.checkAuth();
        if (!isAuth) {
            window.location.href = 'login.html';
            return false;
        }
        return true;
    }

    /**
     * Показать информацию о пользователе на странице
     */
    displayUserInfo() {
        const userElements = document.querySelectorAll('[data-user-name]');
        userElements.forEach(el => {
            el.textContent = this.getFullName();
        });

        const avatarElements = document.querySelectorAll('[data-user-avatar]');
        avatarElements.forEach(el => {
            if (this.user?.avatar_data) {
                el.src = this.user.avatar_data;
            }
        });

        const userIdElements = document.querySelectorAll('[data-user-id]');
        userIdElements.forEach(el => {
            el.textContent = this.getUserId();
        });
    }
}

function isGuestMode() {
    const params = new URLSearchParams(window.location.search);
    return params.get('guest') === '1';
}

// Создаем глобальный экземпляр
const auth = new AuthHelper();

// При загрузке страницы проверяем авторизацию
document.addEventListener('DOMContentLoaded', async () => {
    await auth.checkAuth();
    const guestMode = isGuestMode();
    
    // Если требуется авторизация, проверяем её
    if (document.documentElement.getAttribute('data-require-auth') === 'true') {
        if (!auth.isAuthenticated && !guestMode) {
            window.location.href = 'login.html';
        }
    }

    auth.displayUserInfo();

    if (auth.isAuthenticated && !guestMode) {
        auth.startRealtimeAuthChannel();
    }
});
