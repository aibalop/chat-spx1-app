import { IUser } from "../interfaces/user.interface";

export class User implements IUser {

    _id?: string;
    name: string;
    lastName: string;
    username: string;
    password?: string;
    createdAt: string;
    updatedAt: string;

    constructor(data: IUser) {
        Object.assign(this, data);
    }

    getFullname(): string {
        return `${this.name} ${this.lastName}`;
    }

    getUsername(): string {
        return `@${this.username}`;
    }

}