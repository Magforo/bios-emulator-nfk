/**
 * Notification System JavaScript
 * Handles all notifications and alerts
 */

class NotificationSystem {
  constructor(position = 'top-right') {
    this.position = position;
    this.notifications = [];
    this.container = this.createContainer();
    this.autoCloseTime = 5000; // 5 seconds
  }

  createContainer() {
    let container = document.querySelector('.notifications-container');
    if (!container) {
      container = document.createElement('div');
      container.className = `notifications-container ${this.position}`;
      document.body.appendChild(container);
    }
    return container;
  }

  show(options = {}) {
    const {
      type = 'info', // success, error, warning, info
      title = '',
      message = '',
      duration = this.autoCloseTime,
      closeable = true,
      icon = null
    } = options;

    const notification = document.createElement('div');
    notification.className = `notification ${type}`;

    // Determine icon
    let displayIcon = icon;
    if (!displayIcon) {
      const icons = {
        success: '✓',
        error: '✕',
        warning: '⚠',
        info: 'ℹ'
      };
      displayIcon = icons[type] || icons.info;
    }

    notification.innerHTML = `
      <div class="notification-icon">${displayIcon}</div>
      <div class="notification-content">
        ${title ? `<div class="notification-title">${this.escapeHtml(title)}</div>` : ''}
        ${message ? `<div class="notification-message">${this.escapeHtml(message)}</div>` : ''}
      </div>
      ${closeable ? '<button class="notification-close">✕</button>' : ''}
      <div class="notification-progress"></div>
    `;

    // Close button handler
    if (closeable) {
      const closeBtn = notification.querySelector('.notification-close');
      closeBtn.addEventListener('click', () => this.remove(notification));
    }

    this.container.appendChild(notification);
    this.notifications.push(notification);

    // Auto close
    if (duration > 0) {
      setTimeout(() => this.remove(notification), duration);
    }

    return notification;
  }

  success(title, message = '', options = {}) {
    return this.show({
      type: 'success',
      title,
      message,
      ...options
    });
  }

  error(title, message = '', options = {}) {
    return this.show({
      type: 'error',
      title,
      message,
      ...options
    });
  }

  warning(title, message = '', options = {}) {
    return this.show({
      type: 'warning',
      title,
      message,
      ...options
    });
  }

  info(title, message = '', options = {}) {
    return this.show({
      type: 'info',
      title,
      message,
      ...options
    });
  }

  remove(notification) {
    notification.classList.add('remove');
    setTimeout(() => {
      notification.remove();
      this.notifications = this.notifications.filter(n => n !== notification);
    }, 400);
  }

  clear() {
    this.notifications.forEach(notification => {
      notification.classList.add('remove');
    });
    setTimeout(() => {
      this.container.innerHTML = '';
      this.notifications = [];
    }, 400);
  }

  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
}

/**
 * Modal Notification System
 * For important alerts that require user confirmation
 */
class ModalNotification {
  constructor() {
    this.modal = this.createModal();
  }

  createModal() {
    let modal = document.querySelector('.notification-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.className = 'notification-modal';
      document.body.appendChild(modal);
    }
    return modal;
  }

  show(options = {}) {
    const {
      type = 'info',
      title = '',
      message = '',
      icon = null,
      buttons = ['OK']
    } = options;

    // Determine icon
    let displayIcon = icon;
    if (!displayIcon) {
      const icons = {
        success: '✓',
        error: '✕',
        warning: '⚠',
        info: 'ℹ'
      };
      displayIcon = icons[type] || icons.info;
    }

    const buttonsHtml = buttons
      .map(btn => {
        if (typeof btn === 'string') {
          return `<button class="notification-modal-button primary">${this.escapeHtml(btn)}</button>`;
        }
        const { text, action, className = 'primary' } = btn;
        return `<button class="notification-modal-button ${className}" data-action="${action}">${this.escapeHtml(text)}</button>`;
      })
      .join('');

    this.modal.innerHTML = `
      <div class="notification-modal-content">
        <span class="notification-modal-icon">${displayIcon}</span>
        ${title ? `<h2 class="notification-modal-title">${this.escapeHtml(title)}</h2>` : ''}
        ${message ? `<p class="notification-modal-message">${this.escapeHtml(message)}</p>` : ''}
        <div class="notification-modal-buttons">
          ${buttonsHtml}
        </div>
      </div>
    `;

    this.modal.classList.add('active');

    // Close modal on background click
    this.modal.addEventListener('click', (e) => {
      if (e.target === this.modal) {
        this.close();
      }
    });

    return this.modal;
  }

  close() {
    this.modal.classList.remove('active');
    this.modal.innerHTML = '';
  }

  success(title, message, buttons = ['OK']) {
    return this.show({
      type: 'success',
      title,
      message,
      buttons
    });
  }

  error(title, message, buttons = ['OK']) {
    return this.show({
      type: 'error',
      title,
      message,
      buttons
    });
  }

  warning(title, message, buttons = ['OK']) {
    return this.show({
      type: 'warning',
      title,
      message,
      buttons
    });
  }

  info(title, message, buttons = ['OK']) {
    return this.show({
      type: 'info',
      title,
      message,
      buttons
    });
  }

  confirm(title, message) {
    return new Promise((resolve) => {
      const buttons = [
        { text: 'OK', action: 'ok', className: 'primary' },
        { text: 'Cancel', action: 'cancel', className: 'secondary' }
      ];

      const modal = this.show({
        type: 'info',
        title,
        message,
        buttons
      });

      const handleClick = (e) => {
        const btn = e.target.closest('[data-action]');
        if (btn) {
          const action = btn.getAttribute('data-action');
          modal.removeEventListener('click', handleClick);
          this.close();
          resolve(action === 'ok');
        }
      };

      modal.addEventListener('click', handleClick);
    });
  }

  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
}

// Initialize global notification system
const notificationSystem = new NotificationSystem('top-right');
const modalNotification = new ModalNotification();

// Global shortcuts
window.notify = {
  success: (title, message, options) => notificationSystem.success(title, message, options),
  error: (title, message, options) => notificationSystem.error(title, message, options),
  warning: (title, message, options) => notificationSystem.warning(title, message, options),
  info: (title, message, options) => notificationSystem.info(title, message, options),
  clear: () => notificationSystem.clear(),
  
  // Modal
  modal: {
    success: (title, message, buttons) => modalNotification.success(title, message, buttons),
    error: (title, message, buttons) => modalNotification.error(title, message, buttons),
    warning: (title, message, buttons) => modalNotification.warning(title, message, buttons),
    info: (title, message, buttons) => modalNotification.info(title, message, buttons),
    confirm: (title, message) => modalNotification.confirm(title, message),
    close: () => modalNotification.close()
  }
};
