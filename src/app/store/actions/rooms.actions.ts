import { Action } from '@ngrx/store';
import { IRoom } from '../../interfaces/i-room.interface';

export const LOAD_ROOMS = '[Rooms] Load rooms';
export const LOAD_ROOMS_FAIL = '[Rooms] Load rooms FAIL';
export const LOAD_ROOMS_SUCCESS = '[Rooms] Load rooms SUCCESS';
export const LOAD_ROOMS_MINE = '[Rooms] Load rooms';
export const UNSET_ALL_ROOMS = '[Rooms] Unset all rooms';
export const SET_ROOM = '[Rooms] Set room';
export const UNSET_ROOM = '[Rooms] Unset room';

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

export class UnsetAllRooms implements Action {
    readonly type = UNSET_ALL_ROOMS;
}

export class SetRoom implements Action {
    readonly type = SET_ROOM;

    constructor(public room: IRoom) {}
}

export class UnsetRoom implements Action {
    readonly type = UNSET_ROOM;

    constructor(public id: any) {}
}

export type roomsActions = LoadRoomsMine |
                        LoadRooms |
                        LoadRoomsFail |
                        LoadRoomsSuccess |
                        UnsetAllRooms |
                        SetRoom |
                        UnsetRoom;
