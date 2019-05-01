import { ISettings } from '../../interfaces/i-settings.interface';
import * as fromSettings from '../actions';

export interface SettingsState {
    settings: ISettings;
    loaded: boolean;
    loading: boolean;
    error: any;
}

const initialState: SettingsState = {
    settings: null,
    loaded: false,
    loading: false,
    error: null
};

export function settingsReducer( state = initialState, action: fromSettings.settingsActions ): SettingsState {

    switch ( action.type ) {

        case fromSettings.LOAD_SETTINGS:
            return {
                ...state,
                loading: true,
                error: null
            };

        case fromSettings.LOAD_SETTINGS_MINE:
        return {
            ...state,
            loading: true,
            error: null
        };

        case fromSettings.LOAD_SETTINGS_SUCCESS:
            return {
                ...state,
                loading: false,
                loaded: true,
                settings: {...action.settings}
            };

        case fromSettings.LOAD_SETTINGS_FAIL:
            return {
                ...state,
                loaded: false,
                loading: false,
                error: {
                    status: action.payload.status,
                    message: action.payload.message,
                    url: action.payload.url
                }
            };

        case fromSettings.SET_SETTINGS:
            return {
                ...state,
                settings: {...action.settings}
            };

        case fromSettings.UNSET_SETTINGS:
            return {
                ...state,
                settings: null,
                loaded: false,
                loading: false,
                error: null
            };

        default:
            return state;
    }
}
