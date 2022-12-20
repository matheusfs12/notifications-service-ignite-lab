import { Content } from '@application/entities/content';
import { Notification, NotificationProps } from '@application/entities/notification';

type Override = Partial<NotificationProps>;

export function makeNotification(override: Override = {}): Notification {
    return new Notification({
        category: 'social',
        content: new Content('This is a notification'),
        recipientId: 'example-recipient-id-1',
        ...override,
    });
}
