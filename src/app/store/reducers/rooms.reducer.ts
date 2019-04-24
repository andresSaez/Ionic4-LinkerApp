import { IRoom } from '../../interfaces/i-room.interface';
import * as fromRooms from '../actions';

export interface RoomsState {
    rooms: IRoom[];
    loaded: boolean;
    loading: boolean;
    error: boolean;
}

const initialState: RoomsState = {
    rooms: [],
    loaded: false,
    loading: false,
    error: null
};

export function roomsReducer( state = initialState, action: fromRooms.roomsActions ): RoomsState {

    switch ( action.type ) {

        default:
            return state;
    }
}
