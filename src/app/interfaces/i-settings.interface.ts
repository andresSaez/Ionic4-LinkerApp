import { PrivacityOptions } from '../enums/privacity-options.enum';
import { LanguageOptions } from '../enums/language-options.enum';

export interface ISettings {
    id?: string;
    userid?: string;
    privacity?: IPrivacitySettings;
    notifications?: INotificationsSettings;
    language?: LanguageOptions;
}

export interface IPrivacitySettings {
    blockedusers: string[];
    lastconnection: PrivacityOptions;
    profilephoto: PrivacityOptions;
    profiledata: ProfileDataPrivacitySettings;
}

export interface ProfileDataPrivacitySettings {
    showname: boolean;
    showemail: boolean;
    show: PrivacityOptions;
}

export interface INotificationsSettings {
    private: NotificationsOptions;
    rooms: NotificationsOptions;
}

export interface NotificationsOptions {
    active: boolean;
    exceptions: string[];
}

