import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { makeNotification } from '@test/factories/notification-factory';

import { GetRecipientNotifications } from './get-recipient-notifications';

describe('Get recipients notifications', () => {
    it('should be able to get recipient notifications', async () => {
        const notificationsRepository = new InMemoryNotificationsRepository();

        await notificationsRepository.create(
            makeNotification({ recipientId: 'example-recipient-id-1'})
        );

        await notificationsRepository.create(
            makeNotification({ recipientId: 'example-recipient-id-1'})
        );

        await notificationsRepository.create(
            makeNotification({ recipientId: 'example-recipient-id-2'})
        );

        const getRecipientNotifications = new GetRecipientNotifications(notificationsRepository);

        const { notifications } = await getRecipientNotifications.execute({
            recipientId: 'example-recipient-id-1'
        });

        expect(notifications).toHaveLength(2);
        expect(notifications).toEqual(expect.arrayContaining([
            expect.objectContaining({ recipientId: 'example-recipient-id-1' }),
            expect.objectContaining({ recipientId: 'example-recipient-id-1' })
        ]));

        const { notifications: notifications2 } = await getRecipientNotifications.execute({
            recipientId: 'example-recipient-id-3'
        });

        expect(notifications2).toHaveLength(0);
    });
});
