import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { makeNotification } from '@test/factories/notification-factory';

import { CancelNotification } from './cancel-notification';
import { NotificationNotFound } from './errors/notification-not-found';

describe('Send notification', () => {
    it('should be able to cancel a notification', async () => {
        const notificationsRepository = new InMemoryNotificationsRepository();
        const cancelNotification = new CancelNotification(notificationsRepository);

        const notification = makeNotification();

        await notificationsRepository.create(notification);

        await cancelNotification.execute({
            notificationId: notification.id,
        });

        expect(notificationsRepository.notifications[0].canceledAt).toEqual(
            expect.any(Date),
        );
    });

    it('should not be able to cancel a notification that does not exist', async () => {
        const notificationsRepository = new InMemoryNotificationsRepository();
        const cancelNotification = new CancelNotification(notificationsRepository);

        await expect(
            cancelNotification.execute({
                notificationId: 'fake-notification-id',
            }),
        ).rejects.toThrow(NotificationNotFound);
    });
});
