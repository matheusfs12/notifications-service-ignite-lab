import { Injectable } from '@nestjs/common';
import { Notification } from '@application/entities/notification';
import { NotificationNotFound } from '@application/use-cases/errors/notification-not-found';
import { NotificationsRepository } from '@application/repositories/notifications-repository';

import { PrismaNotificationMapper } from '../mappers/prisma-notification-mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaNotificationsRepository implements NotificationsRepository {
    constructor(
        private prisma: PrismaService
    ) { }

    async findById(notificationId: string): Promise<Notification | null> {
        const notification = await this.prisma.notification.findUnique({
            where: {
                id: notificationId
            }
        });

        if (!notification) {
            return null;
        }

        return PrismaNotificationMapper.toDomain(notification);
    }

    async findManyByRecipientId(recipientId: string): Promise<Notification[]> {
        const notifications = await this.prisma.notification.findMany({
            where: {
                recipientId
            }
        });

        return notifications.map(PrismaNotificationMapper.toDomain);
    }

    async countManyByRecipientId(recipientId: string): Promise<number> {
        return this.prisma.notification.count({
            where: {
                recipientId
            }
        });
    }

    async create(notification: Notification): Promise<void> {
        const raw = PrismaNotificationMapper.toDatabase(notification);

        await this.prisma.notification.create({
            data: raw
        });
    }

    async save(notification: Notification): Promise<void> {
        const raw = PrismaNotificationMapper.toDatabase(notification);

        const data = await this.prisma.notification.findUnique({
            where: {
                id: raw.id
            }
        });

        if (!data) {
            throw new NotificationNotFound();
        }

        await this.prisma.notification.update({
            where: {
                id: raw.id
            },
            data: raw
        });
    }
}
