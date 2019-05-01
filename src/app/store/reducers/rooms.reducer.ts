import { IRoom } from '../../interfaces/i-room.interface';
import * as fromRooms from '../actions';

export interface RoomsState {
    rooms: IRoom[];
    loaded: boolean;
    loading: boolean;
    error: any;
}

const initialState: RoomsState = {
    rooms: [],
    loaded: false,
    loading: false,
    error: null
};

export function roomsReducer( state = initialState, action: fromRooms.roomsActions ): RoomsState {

    switch ( action.type ) {

        case fromRooms.LOAD_ROOMS:
            return {
                ...state,
                loading: true,
                error: null
            };

        case fromRooms.LOAD_ROOMS_MINE:
        return {
            ...state,
            loading: true,
            error: null
        };

        case fromRooms.LOAD_ROOMS_SUCCESS:
            return {
                ...state,
                loading: false,
                loaded: true,
                rooms: [...action.rooms]
            };

        case fromRooms.LOAD_ROOMS_FAIL:
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

        case fromRooms.SET_ROOM:
            return {
                ...state,
                rooms: [...state.rooms, action.room]
            };

        case fromRooms.UNSET_ROOM:
            return {
                ...state,
                rooms: state.rooms.filter( deleteRoom => deleteRoom.id !== action.id )
            };

        case fromRooms.UNSET_ALL_ROOMS:
            return {
                ...state,
                rooms: null,
                loaded: false,
                loading: false,
                error: null
            };

        default:
            return state;
    }
}
