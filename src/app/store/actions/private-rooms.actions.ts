import { Action } from '@ngrx/store';
import { IPrivateRoom } from '../../interfaces/i-private-room.interface';

export const LOAD_PRIVATE_ROOMS = '[PrivateRooms] Load private-rooms';
export const LOAD_PRIVATE_ROOMS_FAIL = '[PrivateRooms] Load private-rooms FAIL';
export const LOAD_PRIVATE_ROOMS_SUCCESS = '[PrivateRooms] Load private-rooms SUCCESS';
export const LOAD_PRIVATE_ROOMS_MINE = '[PrivateRooms] Load private-rooms mine';


export class LoadPrivateRoomsMine implements Action {
    readonly type = LOAD_PRIVATE_ROOMS_MINE;
}

export class LoadPrivateRooms implements Action {
    readonly type = LOAD_PRIVATE_ROOMS;
}

export class LoadPrivateRoomsFail implements Action {
    readonly type = LOAD_PRIVATE_ROOMS_FAIL;

    constructor( public payload: any ) {}
}

export class LoadPrivateRoomsSuccess implements Action {
    readonly type = LOAD_PRIVATE_ROOMS_SUCCESS;

    constructor( public privateRooms: IPrivateRoom[] ) {}
}

export type privateRoomsActions = LoadPrivateRoomsMine |
                                LoadPrivateRooms |
                                LoadPrivateRoomsFail |
                                LoadPrivateRoomsSuccess;
