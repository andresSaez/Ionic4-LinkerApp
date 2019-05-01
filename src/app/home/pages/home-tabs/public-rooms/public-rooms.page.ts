import { Component, OnInit } from '@angular/core';
import { IRoom } from 'src/app/interfaces/i-room.interface';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';

@Component({
  selector: 'app-public-rooms',
  templateUrl: './public-rooms.page.html',
  styleUrls: ['./public-rooms.page.scss'],
})
export class PublicRoomsPage implements OnInit {

  myRooms: IRoom[];
  subscription: Subscription = new Subscription();

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.subscription = this.store.select('rooms').subscribe(
      roomsState => {
        this.myRooms = roomsState.rooms;
      }
    );
  }

}
