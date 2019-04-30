import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as settingsActions from '../actions';
import { map, switchMap, catchError, mergeMap } from 'rxjs/operators';
import { of, Subject, EMPTY, Observable } from 'rxjs';
import { UsersService } from 'src/app/services/users-service/users.service';
import { Action } from '@ngrx/store';

@Injectable()
export class SettingsEffects {

  // private unsubscribe$ = new Subject();

  constructor(
    private actions$: Actions,
    public _usersService: UsersService
  ) { }

  // ngOnDestroy(): void {
  //   this.unsubscribe$.next(true);
  //   this.unsubscribe$.unsubscribe();
  // }

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

    @Effect({dispatch: false})
    setSettings$: Observable<void> = this.actions$
        .pipe(
          ofType( settingsActions.SET_SETTINGS ),
          switchMap( (action: settingsActions.SetSettings ) => this._usersService.saveSettings( action.settings )
          .pipe(
            map(settings => console.log(settings)),
            catchError( () => EMPTY)
          ))
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
