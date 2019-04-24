import { UserEffects } from './user.effects';
import { SettingsEffects } from './settings.effects';
import { RoomsEffects } from './rooms.effects';
import { PrivateRoomsEffects } from './private-rooms.effects';

export const effectsArray: any[] = [
    UserEffects,
    SettingsEffects,
    RoomsEffects,
    PrivateRoomsEffects
];

export * from './user.effects';
export * from './settings.effects';
export * from './rooms.effects';
export * from './private-rooms.effects';
