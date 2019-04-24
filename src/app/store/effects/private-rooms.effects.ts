import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as privateRoomsActions from '../actions';
import { map, switchMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { PrivateRoomService } from 'src/app/services/private-room-service/private-room.service';

@Injectable()
export class PrivateRoomsEffects {

  constructor(
    private actions$: Actions,
    public _privateRoomService: PrivateRoomService
  ) { }

    @Effect()
    loadPrivateRooms$ = this.actions$
        .pipe(
        ofType( privateRoomsActions.LOAD_PRIVATE_ROOMS ),
        switchMap( () => this._privateRoomService.getPrivateRooms()
            .pipe(
            map( privateRooms => new privateRoomsActions.LoadPrivateRoomsSuccess( privateRooms )),
            catchError( error => of( new privateRoomsActions.LoadPrivateRoomsFail( error ))
            ))
            )
        );

    @Effect()
    loadPrivateRoomsMine$ = this.actions$
        .pipe(
          ofType( privateRoomsActions.LOAD_PRIVATE_ROOMS_MINE ),
          switchMap( () => this._privateRoomService.getPrivateRoomsMine()
            .pipe(
              map( privateRooms => new privateRoomsActions.LoadPrivateRoomsSuccess( privateRooms )),
              catchError( error => of( new privateRoomsActions.LoadPrivateRoomsFail( error ))
              ))
              )
        );
}
