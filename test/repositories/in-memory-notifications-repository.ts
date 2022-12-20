import { Notification } from '@application/entities/notification';
import { NotificationsRepository } from '@application/repositories/notifications-repository';

import { NotificationNotFound } from '../../src/application/use-cases/errors/notification-not-found';

export class InMemoryNotificationsRepository implements NotificationsRepository {

    public notifications: Notification[] = [];

    async findById(notificationId: string): Promise<Notification | null> {
        const notification = this.notifications.find(
            notification => notification.id === notificationId
        );

        if (!notification) {
            return null;
        }

        return notification;
    }

    async findManyByRecipientId(recipientId: string): Promise<Notification[]> {
        return this.notifications.filter(
            notification => notification.recipientId === recipientId
        );
    }

    async countManyByRecipientId(recipientId: string): Promise<number> {
        return this.notifications.filter(
            notification => notification.recipientId === recipientId
        ).length;
    }

    async create(notification: Notification) {
        this.notifications.push(notification);
    }

    async save(notification: Notification): Promise<void> {
        const index = this.notifications.findIndex(
            notification => notification.id === notification.id
        );

        if (index === -1) {
            throw new NotificationNotFound();
        }

        this.notifications[index] = notification;
    }

}
