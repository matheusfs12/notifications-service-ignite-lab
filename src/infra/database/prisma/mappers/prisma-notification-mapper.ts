import { Content } from '@application/entities/content';
import { Notification } from '@application/entities/notification';
import { Notification as RawNotification } from '@prisma/client';

export class PrismaNotificationMapper {
    static toDatabase(notification: Notification) {
        return {
            id: notification.id,
            content: notification.content.value,
            recipientId: notification.recipientId,
            category: notification.category,
            readAt: notification.readAt,
            createdAt: notification.createdAt,
            canceledAt: notification.canceledAt
        };
    }

    static toDomain(raw: RawNotification): Notification {
        return new Notification({
            content: new Content(raw.content),
            recipientId: raw.recipientId,
            category: raw.category,
            readAt: raw.readAt,
            createdAt: raw.createdAt,
            canceledAt: raw.canceledAt
        }, raw.id);
    }
}
