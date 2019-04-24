import * as reducers from './reducers';
import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
  user: reducers.UserState;
  settings: reducers.SettingsState;
  rooms: reducers.RoomsState;
  privateRooms: reducers.PrivateRoomsState;
}

export const appReducers: ActionReducerMap<AppState> = {
  user: reducers.userReducer,
  settings: reducers.settingsReducer,
  rooms: reducers.roomsReducer,
  privateRooms: reducers.privateRoomsReducer
};
