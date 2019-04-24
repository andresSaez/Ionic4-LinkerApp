import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as settingsActions from '../actions';
import { map, switchMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { UsersService } from 'src/app/services/users-service/users.service';

@Injectable()
export class SettingsEffects {

  constructor(
    private actions$: Actions,
    public _usersService: UsersService
  ) { }

    @Effect()
    loadSettingsMine$ = this.actions$
        .pipe(
        ofType( settingsActions.LOAD_SETTINGS_MINE ),
        switchMap( () => this._usersService.getSettingsMine()
            .pipe(
            map( settings => new settingsActions.LoadSettingsSuccess( settings )),
            catchError( error => of( new settingsActions.LoadSettingsFail( error ))
            ))
            )
        );

    @Effect()
    loadSettings$ = this.actions$
        .pipe(
            ofType( settingsActions.LOAD_SETTINGS ),
            switchMap( ( action: settingsActions.LoadSettings ) => this._usersService.getUserSettings( action.id )
            .pipe(
                map( settings => new settingsActions.LoadSettingsSuccess( settings )),
                catchError( error => of( new settingsActions.LoadSettingsFail( error ))
                ))
                )
        );
}
