import { Action } from '@ngrx/store';
import { IUser } from '../../interfaces/i-user.interface';

export const LOAD_USER = '[User] Load user';
export const LOAD_USER_FAIL = '[User] Load user FAIL';
export const LOAD_USER_SUCCESS = '[User] Load user SUCCESS';
export const LOAD_LOGGUED_USER = '[User] Load loggued user';

export class LoadLogguedUser implements Action {
    readonly type = LOAD_LOGGUED_USER;
}

export class LoadUser implements Action {
    readonly type = LOAD_USER;

    constructor( public id: string ) {}
}

export class LoadUserFail implements Action {
    readonly type = LOAD_USER_FAIL;

    constructor( public payload: any ) {}
}

export class LoadUserSuccess implements Action {
    readonly type = LOAD_USER_SUCCESS;

    constructor( public user: IUser ) {}
}

export type userActions = LoadLogguedUser |
                        LoadUser |
                        LoadUserFail |
                        LoadUserSuccess;
