import { Action } from '@ngrx/store';
import { ISettings } from '../../interfaces/i-settings.interface';

export const LOAD_SETTINGS = '[Settings] Load settings';
export const LOAD_SETTINGS_FAIL = '[Settings] Load settings FAIL';
export const LOAD_SETTINGS_SUCCESS = '[Settings] Load settings SUCCESS';
export const LOAD_SETTINGS_MINE = '[Settings] Load settings mine';

export class LoadSettingsMine implements Action {
    readonly type = LOAD_SETTINGS_MINE;
}

export class LoadSettings implements Action {
    readonly type = LOAD_SETTINGS;

    constructor( public id: string ) {}
}

export class LoadSettingsFail implements Action {
    readonly type = LOAD_SETTINGS_FAIL;

    constructor( public payload: any ) {}
}

export class LoadSettingsSuccess implements Action {
    readonly type = LOAD_SETTINGS_SUCCESS;

    constructor( public settings: ISettings ) {}
}

export type settingsActions = LoadSettingsMine |
                            LoadSettings |
                            LoadSettingsFail |
                            LoadSettingsSuccess;
