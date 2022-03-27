export interface IUser {
    _id?: string;
    name: string;
    lastName: string;
    username: string;
    password?: string;
    createdAt: string;
    updatedAt: string;

    getFullName?: () => string;
}