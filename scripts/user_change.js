(() => {
    const UI_STORAGE_KEY = 'bios_profile_ui_settings_v1';
    const DEFAULT_AVATAR_DATA = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80"><rect width="100%" height="100%" fill="%23cfd8ff"/><text x="50%" y="54%" text-anchor="middle" font-family="monospace" font-size="20" fill="%23313db0">U</text></svg>';

    function injectStyles() {
        if (document.getElementById('userProfileMenuStyles')) {
            return;
        }

        const style = document.createElement('style');
        style.id = 'userProfileMenuStyles';
        style.textContent = `
            .user-profile-menu {
                position: fixed;
                z-index: 9999;
                width: 290px;
                background: #eef2ff;
                border: 2px solid #1f2aa3;
                box-shadow: 0 10px 25px rgba(10, 18, 90, 0.35);
                padding: 12px;
                font-family: 'Space Mono', monospace;
                color: #1a1f61;
            }

            .user-profile-menu[hidden] {
                display: none;
            }

            .user-profile-title {
                font-size: 12px;
                font-weight: 700;
                margin-bottom: 8px;
                text-transform: uppercase;
            }

            .user-profile-row {
                margin-bottom: 10px;
            }

            .user-profile-label {
                display: block;
                margin-bottom: 4px;
                font-size: 11px;
            }

            .user-profile-input,
            .user-profile-file {
                width: 100%;
                box-sizing: border-box;
                border: 1px solid #2b36bd;
                background: #ffffff;
                color: #10144f;
                padding: 6px;
                font-family: inherit;
                font-size: 12px;
            }

            .user-profile-checkbox {
                display: flex;
                gap: 8px;
                align-items: center;
                font-size: 12px;
                margin-bottom: 6px;
            }

            .user-profile-avatar-wrap {
                display: flex;
                align-items: center;
                gap: 8px;
            }

            .user-profile-avatar {
                width: 40px;
                height: 40px;
                border: 1px solid #2733bf;
                border-radius: 50%;
                object-fit: cover;
                background: #dbe3ff;
            }

            .user-profile-buttons {
                display: flex;
                gap: 6px;
                flex-wrap: wrap;
                margin-top: 8px;
            }

            .user-profile-btn {
                border: 1px solid #2530b6;
                background: #ffffff;
                color: #141a63;
                padding: 5px 8px;
                cursor: pointer;
                font-family: inherit;
                font-size: 11px;
            }

            .profile-crt-glow .main {
                box-shadow: 0 0 0 2px #3241d6, 0 0 24px rgba(30, 50, 200, 0.5);
            }
        `;
        document.head.appendChild(style);
    }

    function readUiSettings() {
        try {
            const raw = localStorage.getItem(UI_STORAGE_KEY);
            if (!raw) {
                return {};
            }
            const parsed = JSON.parse(raw);
            return typeof parsed === 'object' && parsed ? parsed : {};
        } catch (error) {
            console.warn('Unable to read user profile UI settings:', error);
            return {};
        }
    }

    function saveUiSettings(settings) {
        localStorage.setItem(UI_STORAGE_KEY, JSON.stringify(settings));
    }

    function setDisplayedUserName(name) {
        const finalName = (name || '').trim() || 'Guest';
        document.querySelectorAll('[data-user-name]').forEach((element) => {
            element.textContent = finalName;
        });
    }

    function setDisplayedAvatar(avatarDataUrl) {
        const avatar = (avatarDataUrl || '').trim();
        const finalAvatar = avatar || DEFAULT_AVATAR_DATA;
        document.querySelectorAll('[data-user-avatar]').forEach((element) => {
            element.src = finalAvatar;
        });
    }

    function applyVisualSettings(uiSettings) {
        document.body.classList.toggle('profile-crt-glow', Boolean(uiSettings.crtGlow));
    }

    function getAuthInstance() {
        return typeof auth !== 'undefined' ? auth : null;
    }

    async function fetchCsrfToken() {
        const response = await fetch('get_csrf_token.php', { credentials: 'same-origin' });
        const data = await response.json();

        if (!response.ok || !data.csrf_token) {
            throw new Error('Failed to get CSRF token');
        }

        return data.csrf_token;
    }

    async function saveAvatarToServer(avatarDataUrl) {
        const csrfToken = await fetchCsrfToken();
        const formData = new FormData();
        formData.append('csrf_token', csrfToken);
        formData.append('avatar_data', avatarDataUrl);

        const response = await fetch('update_avatar.php', {
            method: 'POST',
            body: formData,
            credentials: 'same-origin'
        });
        const data = await response.json();

        if (!response.ok || !data.success) {
            throw new Error(data.error || 'Avatar update failed');
        }

        return data.avatar_data || '';
    }

    function initProfileMenu() {
        const userNameElement = document.getElementById('userName') || document.querySelector('[data-user-name]');
        if (!userNameElement) {
            return;
        }

        injectStyles();

        const uiSettings = {
            nickname: '',
            crtGlow: false,
            ...readUiSettings()
        };

        let pendingAvatarData = '';
        const authInstance = getAuthInstance();
        if (authInstance && authInstance.user) {
            pendingAvatarData = String(authInstance.user.avatar_data || '').trim();
            setDisplayedAvatar(pendingAvatarData);
        }

        if (uiSettings.nickname) {
            setDisplayedUserName(uiSettings.nickname);
        }
        applyVisualSettings(uiSettings);

        const panel = document.createElement('div');
        panel.className = 'user-profile-menu';
        panel.hidden = true;
        panel.innerHTML = `
            <div class="user-profile-title">Profile Menu</div>

            <div class="user-profile-row user-profile-avatar-wrap">
                <img class="user-profile-avatar" id="profileAvatarPreview" alt="Avatar preview">
                <div>
                    <div style="font-size: 11px;">Avatar</div>
                    <button type="button" class="user-profile-btn" id="removeAvatarBtn">Remove</button>
                </div>
            </div>

            <div class="user-profile-row">
                <label class="user-profile-label" for="profileAvatarInput">Upload new avatar</label>
                <input class="user-profile-file" id="profileAvatarInput" type="file" accept="image/*">
            </div>

            <div class="user-profile-row">
                <label class="user-profile-label" for="profileNicknameInput">Display name</label>
                <input class="user-profile-input" id="profileNicknameInput" type="text" maxlength="40" placeholder="Guest">
            </div>

            <div class="user-profile-row">
                <span class="user-profile-label">User ID</span>
                <div class="user-profile-input" id="profileUserIdValue">Guest</div>
            </div>

            <label class="user-profile-checkbox">
                <input id="profileCrtInput" type="checkbox">
                CRT glow effect
            </label>

            <div class="user-profile-buttons">
                <button type="button" class="user-profile-btn" id="saveProfileBtn">Save</button>
                <button type="button" class="user-profile-btn" id="resetProfileBtn">Reset</button>
                <button type="button" class="user-profile-btn" id="logoutProfileBtn">Logout</button>
                <button type="button" class="user-profile-btn" id="openAdminPanelBtn" style="display:none;">Admin Panel</button>
            </div>
        `;
        document.body.appendChild(panel);

        const avatarPreview = panel.querySelector('#profileAvatarPreview');
        const avatarInput = panel.querySelector('#profileAvatarInput');
        const nicknameInput = panel.querySelector('#profileNicknameInput');
        const userIdValue = panel.querySelector('#profileUserIdValue');
        const crtInput = panel.querySelector('#profileCrtInput');
        const saveButton = panel.querySelector('#saveProfileBtn');
        const resetButton = panel.querySelector('#resetProfileBtn');
        const logoutButton = panel.querySelector('#logoutProfileBtn');
        const openAdminPanelButton = panel.querySelector('#openAdminPanelBtn');
        const removeAvatarButton = panel.querySelector('#removeAvatarBtn');

        function syncPanelFields() {
            nicknameInput.value = uiSettings.nickname || '';
            crtInput.checked = Boolean(uiSettings.crtGlow);
            avatarPreview.src = pendingAvatarData || DEFAULT_AVATAR_DATA;
            const authInstanceForId = getAuthInstance();
            userIdValue.textContent = authInstanceForId && authInstanceForId.user && authInstanceForId.user.user_id
                ? String(authInstanceForId.user.user_id)
                : 'Guest';

            const isAdmin = authInstanceForId && authInstanceForId.user && (
                Number(authInstanceForId.user.user_id) === 5 ||
                Number(authInstanceForId.user.is_admin) === 1
            );
            openAdminPanelButton.style.display = isAdmin ? 'inline-block' : 'none';
        }

        function openPanel() {
            const rect = userNameElement.getBoundingClientRect();
            panel.style.left = `${Math.max(10, rect.left)}px`;
            panel.style.top = `${rect.bottom + 8}px`;
            panel.hidden = false;
            syncPanelFields();
        }

        function closePanel() {
            panel.hidden = true;
        }

        userNameElement.addEventListener('click', (event) => {
            event.stopPropagation();
            if (panel.hidden) {
                openPanel();
            } else {
                closePanel();
            }
        });

        panel.addEventListener('click', (event) => {
            event.stopPropagation();
        });

        document.addEventListener('click', () => {
            if (!panel.hidden) {
                closePanel();
            }
        });

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                closePanel();
            }
        });

        avatarInput.addEventListener('change', () => {
            const file = avatarInput.files && avatarInput.files[0];
            if (!file) {
                return;
            }

            if (!file.type.startsWith('image/')) {
                alert('Please choose an image file.');
                avatarInput.value = '';
                return;
            }

            const reader = new FileReader();
            reader.onload = () => {
                pendingAvatarData = String(reader.result || '');
                avatarPreview.src = pendingAvatarData || DEFAULT_AVATAR_DATA;
            };
            reader.readAsDataURL(file);
        });

        removeAvatarButton.addEventListener('click', () => {
            pendingAvatarData = '';
            syncPanelFields();
        });

        saveButton.addEventListener('click', async () => {
            uiSettings.nickname = nicknameInput.value.trim();
            uiSettings.crtGlow = crtInput.checked;

            saveUiSettings(uiSettings);
            applyVisualSettings(uiSettings);

            if (uiSettings.nickname) {
                setDisplayedUserName(uiSettings.nickname);
            } else {
                const currentAuth = getAuthInstance();
                if (currentAuth && currentAuth.user) {
                    setDisplayedUserName(currentAuth.user.full_name || currentAuth.user.user_name || 'User');
                }
            }

            const currentAuth = getAuthInstance();
            if (currentAuth && currentAuth.isAuthenticated) {
                try {
                    const savedAvatar = await saveAvatarToServer(pendingAvatarData);
                    pendingAvatarData = savedAvatar;
                    currentAuth.user.avatar_data = savedAvatar;
                } catch (error) {
                    console.error(error);
                    alert('Не вдалося зберегти аватар. Спробуйте ще раз.');
                    return;
                }
            }

            setDisplayedAvatar(pendingAvatarData);

            closePanel();
        });

        resetButton.addEventListener('click', () => {
            uiSettings.nickname = '';
            uiSettings.crtGlow = false;

            localStorage.removeItem(UI_STORAGE_KEY);
            applyVisualSettings(uiSettings);

            const authInstance = getAuthInstance();
            if (authInstance && authInstance.user) {
                setDisplayedUserName(authInstance.user.full_name || authInstance.user.user_name || 'User');
                pendingAvatarData = String(authInstance.user.avatar_data || '').trim();
            } else {
                setDisplayedUserName('Guest');
                pendingAvatarData = '';
            }

            setDisplayedAvatar(pendingAvatarData);

            syncPanelFields();
            closePanel();
        });

        logoutButton.addEventListener('click', async () => {
            const authInstance = getAuthInstance();
            if (authInstance && typeof authInstance.logout === 'function') {
                await authInstance.logout();
                return;
            }
            window.location.href = 'login.html';
        });

        openAdminPanelButton.addEventListener('click', () => {
            const cacheBust = Date.now();
            window.open(`admin_panel.html?v=${cacheBust}`, '_blank', 'noopener,noreferrer');
        });

        syncPanelFields();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initProfileMenu);
    } else {
        initProfileMenu();
    }
})();
