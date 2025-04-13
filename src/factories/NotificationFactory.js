export class NotificationFactory {
    static create(type, message) {
        switch (type) {
            case 'success':
                return {
                    id: Date.now(),
                    type,
                    message,
                    icon: '✓',
                    className: 'notification-success'
                };
            case 'error':
                return {
                    id: Date.now(),
                    type,
                    message,
                    icon: '✕',
                    className: 'notification-error'
                };
            case 'info':
                return {
                    id: Date.now(),
                    type,
                    message,
                    icon: 'ℹ',
                    className: 'notification-info'
                };
            default:
                throw new Error('Unknown notification type');
        }
    }
}