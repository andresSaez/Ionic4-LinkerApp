import { IChat } from './i-chat.interface';
import { IRoom } from './i-room.interface';
import { IPrivateRoom } from './i-private-room.interface';
import { ISettings } from './i-settings.interface';

export interface IUser {
    id?: string;
    nick?: string;
    name?: string;
    email?: string;
    password?: string;
    avatar?: string;
    biography?: string;
    interests?: string[];
    lat?: number;
    lng?: number;
    connected?: boolean;
    friend?: boolean;
    lastconnection?: string;
    me?: boolean;
    onesignalid?: string;
    contacts?: string[];
    chats?: string[];
    rooms?: string[];
    privaterooms?: string[];
    settings?: ISettings;
}
