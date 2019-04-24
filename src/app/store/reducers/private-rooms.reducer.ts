import { IPrivateRoom } from '../../interfaces/i-private-room.interface';
import * as fromPrivateRooms from '../actions';

export interface PrivateRoomsState {
    privateRooms: IPrivateRoom[];
    loaded: boolean;
    loading: boolean;
    error: boolean;
}

const initialState: PrivateRoomsState = {
    privateRooms: [],
    loaded: false,
    loading: false,
    error: null
};

export function privateRoomsReducer( state = initialState, action: fromPrivateRooms.privateRoomsActions ): PrivateRoomsState {

    switch ( action.type ) {

        default:
            return state;
    }
}
