import { Action } from '@ngrx/store';
import { IRoom } from '../../interfaces/i-room.interface';

export const LOAD_ROOMS = '[Rooms] Load rooms';
export const LOAD_ROOMS_FAIL = '[Rooms] Load rooms FAIL';
export const LOAD_ROOMS_SUCCESS = '[Rooms] Load rooms SUCCESS';
export const LOAD_ROOMS_MINE = '[Rooms] Load rooms';

export class LoadRoomsMine implements Action {
    readonly type = LOAD_ROOMS_MINE;
}

export class LoadRooms implements Action {
    readonly type = LOAD_ROOMS;
}

export class LoadRoomsFail implements Action {
    readonly type = LOAD_ROOMS_FAIL;

    constructor( public payload: any ) {}
}

export class LoadRoomsSuccess implements Action {
    readonly type = LOAD_ROOMS_SUCCESS;

    constructor( public rooms: IRoom[] ) {}
}

export type roomsActions = LoadRoomsMine |
                        LoadRooms |
                        LoadRoomsFail |
                        LoadRoomsSuccess;
