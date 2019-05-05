import { IChat } from './i-chat.interface';
import { IUser } from './i-user.interface';

export interface IPrivateRoom {
    id?: string;
    chat?: IChat; // or string?
    members?: IUser[];
    addressee?: IUser;
}
