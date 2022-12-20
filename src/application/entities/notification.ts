import { Replace } from '@helpers/Replace';

import { BaseEntity } from './base';
import { Content } from './content';

export interface NotificationProps {
    recipientId: string;
    content: Content;
    category: string;
    readAt?: Date | null;
    canceledAt?: Date | null;
    createdAt: Date;
}

export class Notification extends BaseEntity {
    private props: NotificationProps;

    constructor(props: Replace<NotificationProps, { createdAt?: Date }>, id?: string) {
        super(id);

        this.props = {
            ...props,
            createdAt: props.createdAt ?? new Date(),
        };
    }

    public set content(content: Content) {
        this.props.content = content;
    }

    public get content(): Content {
        return this.props.content;
    }

    public set category(category: string) {
        this.props.category = category;
    }

    public get category(): string {
        return this.props.category;
    }

    public set recipientId(recipientId: string) {
        this.props.recipientId = recipientId;
    }

    public get recipientId(): string {
        return this.props.recipientId;
    }

    public unread() {
        this.props.readAt = null;
    }

    public read() {
        this.props.readAt = new Date();
    }

    public get readAt(): Date | null | undefined {
        return this.props.readAt;
    }

    public get canceledAt(): Date | null | undefined {
        return this.props.canceledAt;
    }

    public get createdAt(): Date {
        return this.props.createdAt;
    }

    public cancel() {
        this.props.canceledAt = new Date();
    }

}
