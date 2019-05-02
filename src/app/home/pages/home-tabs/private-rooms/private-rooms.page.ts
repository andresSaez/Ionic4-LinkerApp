import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavController } from '@ionic/angular';
import { IRoom } from 'src/app/interfaces/i-room.interface';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';

@Component({
  selector: 'app-private-rooms',
  templateUrl: './private-rooms.page.html',
  styleUrls: ['./private-rooms.page.scss'],
})
export class PrivateRoomsPage implements OnInit, OnDestroy {

  myRooms: IRoom[];
  subscription: Subscription = new Subscription();

  constructor(
    private nav: NavController,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  openChat() {
    this.nav.navigateForward(['/chat']);
  }

}
