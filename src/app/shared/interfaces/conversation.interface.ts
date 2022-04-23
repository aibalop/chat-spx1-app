import { IMessage } from "./message.interface";
import { IUser } from "./user.interface";

export interface IConversation {
    _id?: string;
    userOneId: IUser;
    userTwoId: IUser;
    lastMessage?: IMessage;
    createdAt?: string;
    updatedAt?: string;
}