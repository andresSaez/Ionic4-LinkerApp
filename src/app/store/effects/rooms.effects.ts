import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as roomsActions from '../actions';
import { map, switchMap, catchError } from 'rxjs/operators';
import { of, Observable, EMPTY } from 'rxjs';
import { RoomService } from 'src/app/services/room-service/room.service';

@Injectable()
export class RoomsEffects {

  constructor(
    private actions$: Actions,
    public _roomService: RoomService
  ) { }

    @Effect()
    loadRooms$ = this.actions$
        .pipe(
        ofType( roomsActions.LOAD_ROOMS ),
        switchMap( () => this._roomService.getRooms()
            .pipe(
            map( rooms => new roomsActions.LoadRoomsSuccess( rooms )),
            catchError( error => of( new roomsActions.LoadRoomsFail( error ))
            ))
            )
        );

    @Effect()
    loadRoomsMine$ = this.actions$
        .pipe(
          ofType( roomsActions.LOAD_ROOMS_MINE ),
          switchMap( () => this._roomService.getRoomsMine()
            .pipe(
              map( rooms => new roomsActions.LoadRoomsSuccess( rooms )),
              catchError( error => of( new roomsActions.LoadRoomsFail( error ))
              ))
              )
        );

    @Effect({dispatch: false})
    unsetRoom$: Observable<void> = this.actions$
        .pipe(
          ofType( roomsActions.UNSET_ROOM ),
          switchMap( (action: roomsActions.UnsetRoom ) => this._roomService.leaveRoom( action.id )
          .pipe(
            map( () => {} ),
            catchError( () => EMPTY)
          ))
        );
}
