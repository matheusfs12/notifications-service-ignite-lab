import { Controller, Get, Param } from '@nestjs/common';
import { NotificationViewModel } from '../view-models/notification-view-model';
import { CountRecipientNotifications } from '@application/use-cases/count-recipient-notifications';
import { GetRecipientNotifications } from '@application/use-cases/get-recipient-notifications';

@Controller('notifications/recipient')
export class NotificationsRecipientController {
    constructor(
        private countRecipientNotifications: CountRecipientNotifications,
        private getRecipientNotifications: GetRecipientNotifications
    ) {}


    @Get(':recipientId/count')
    async countFromRecipient(@Param('recipientId') recipientId: string) {
        const { count } = await this.countRecipientNotifications.execute({
            recipientId
        });

        return { count };
    }

    @Get(':recipientId')
    async getFromRecipient(@Param('recipientId') recipientId: string) {
        const { notifications } = await this.getRecipientNotifications.execute({
            recipientId
        });

        return {
            notifications: notifications.map(NotificationViewModel.toHttp)
        };
    }
}
