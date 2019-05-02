import { Component, OnInit, OnDestroy } from '@angular/core';
import { IRoom } from 'src/app/interfaces/i-room.interface';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import * as fromActions from '../../../../store/actions';

@Component({
  selector: 'app-public-rooms',
  templateUrl: './public-rooms.page.html',
  styleUrls: ['./public-rooms.page.scss'],
})
export class PublicRoomsPage implements OnInit, OnDestroy {

  myRooms: IRoom[];
  subscription: Subscription = new Subscription();
  loaded = false;

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.subscription = this.store.select('rooms').subscribe(
      roomsState => {
        this.myRooms = roomsState.rooms;
        this.loaded = roomsState.loaded;
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  delete( room: IRoom ) {
    this.store.dispatch( new fromActions.UnsetRoom(room.id));
  }

}
