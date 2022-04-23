import { IConversation } from "./conversation.interface";
import { IUser } from "./user.interface";

export interface IMessage {
    _id?: string;
    conversationId: string | IConversation;
    userId: string | IUser;
    message: string;
    createdAt?: string;
    updatedAt?: string;
}