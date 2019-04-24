import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as userActions from '../actions';
import { map, switchMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { UsersService } from 'src/app/services/users-service/users.service';

@Injectable()
export class UserEffects {

  constructor(
    private actions$: Actions,
    public _usersService: UsersService
  ) { }

    @Effect()
    loadLogguedUser$ = this.actions$
        .pipe(
        ofType( userActions.LOAD_LOGGUED_USER ),
        switchMap( () => this._usersService.getMyProfile()
            .pipe(
            map( user => new userActions.LoadUserSuccess( user )),
            catchError( error => of( new userActions.LoadUserFail( error ))
            ))
            )
        );

    @Effect()
    loadUser$ = this.actions$
        .pipe(
            ofType( userActions.LOAD_USER ),
            switchMap( ( action: userActions.LoadUser ) => this._usersService.getUserProfile( action.id )
            .pipe(
                map( user => new userActions.LoadUserSuccess( user )),
                catchError( error => of( new userActions.LoadUserFail( error ))
                ))
                )
        );
}
