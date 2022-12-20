import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { makeNotification } from '@test/factories/notification-factory';

import { CountRecipientNotifications } from './count-recipient-notifications';

describe('Count recipients notifications', () => {
    it('should be able to count recipient notifications', async () => {
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

        const countRecipientNotifications = new CountRecipientNotifications(notificationsRepository);

        const { count } = await countRecipientNotifications.execute({
            recipientId: 'example-recipient-id-1'
        });

        expect(count).toEqual(2);

        const { count: count2 } = await countRecipientNotifications.execute({
            recipientId: 'example-recipient-id-2'
        });

        expect(count2).toEqual(1);

        const { count: count3 } = await countRecipientNotifications.execute({
            recipientId: 'example-recipient-id-3'
        });

        expect(count3).toEqual(0);
    });
});
