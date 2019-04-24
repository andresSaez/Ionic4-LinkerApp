import { IUser } from '../../interfaces/i-user.interface';
import * as fromUser from '../actions';

export interface UserState {
    user: IUser;
    loaded: boolean;
    loading: boolean;
    error: boolean;
}

const initialState: UserState = {
    user: null,
    loaded: false,
    loading: false,
    error: null
};

export function userReducer( state = initialState, action: fromUser.userActions ): UserState {

    switch ( action.type ) {

        default:
            return state;
    }
}
