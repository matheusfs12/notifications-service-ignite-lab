import { randomUUID } from 'node:crypto';

export class BaseEntity {
    protected _id: string;

    constructor(id?: string) {
        this._id = id ?? randomUUID();
    }

    public get id(): string {
        return this._id;
    }
}
