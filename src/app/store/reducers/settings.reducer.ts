import { ISettings } from '../../interfaces/i-settings.interface';
import * as fromSettings from '../actions';

export interface SettingsState {
    settings: ISettings;
    loaded: boolean;
    loading: boolean;
    error: boolean;
}

const initialState: SettingsState = {
    settings: null,
    loaded: false,
    loading: false,
    error: null
};

export function settingsReducer( state = initialState, action: fromSettings.settingsActions ): SettingsState {

    switch ( action.type ) {

        default:
            return state;
    }
}
