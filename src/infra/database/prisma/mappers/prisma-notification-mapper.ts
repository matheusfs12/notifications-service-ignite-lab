import { Notification } from '@application/entities/notification';

export class PrismaNotificationMapper {
    static toDatabase(notification: Notification) {
        return {
            id: notification.id,
            content: notification.content.value,
            recipientId: notification.recipientId,
            category: notification.category,
            readAt: notification.readAt,
            createdAt: notification.createdAt
        };
    }
}
