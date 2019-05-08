import { Component, OnInit, OnDestroy } from '@angular/core';
import { IRoom } from 'src/app/interfaces/i-room.interface';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import * as fromActions from '../../../../store/actions';
import { AlertController, LoadingController, Events } from '@ionic/angular';
import { RoomService } from 'src/app/services/room-service/room.service';
import { IUser } from 'src/app/interfaces/i-user.interface';

@Component({
  selector: 'app-public-rooms',
  templateUrl: './public-rooms.page.html',
  styleUrls: ['./public-rooms.page.scss'],
})
export class PublicRoomsPage implements OnInit, OnDestroy {

  myRooms: IRoom[] = [];
  userState: any;
  subscription: Subscription = new Subscription();
  loaded = false;
  loadingFail = false;

  constructor(
    private events: Events,
    private store: Store<AppState>,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private _roomService: RoomService
  ) { }

  ngOnInit() {
    // this.chargeRooms();
    this.subscription = this.store.select('user').subscribe(
      userState => {
        this.userState = userState.user;
      }
    );
  }

  ionViewWillEnter() {
    this.chargeRooms();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  async delete( room: IRoom ) {
    this._roomService.leaveRoom(room.id).subscribe(
      () => {
        this.myRooms = this.myRooms.filter( (el: any) => el.id !== room.id );
        this.userState.rooms = this.myRooms.map( (el: any) => el.id);
        this.changeUserState({});
      },
      async error => {
        (await this.alertCtrl.create({
          header: 'Oops, something has gone wrong ...',
          message: 'Please, try again',
          buttons: [
            {
              text: 'Ok',
              role: 'ok'
            }
          ]
        })).present();
      }
    );
  }

  async chargeRooms() {
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...',
    });

    await loading.present();

    this._roomService.getRoomsMine().subscribe(
      async (resp) => {
        this.loadingFail = false;
        this.loaded = true;
        await loading.dismiss();
        this.myRooms = resp;
      },
      async (error) => {
        await loading.dismiss();
        (await this.alertCtrl.create({
          header: 'Oops, something has gone wrong ...',
          message: 'Please, try again',
          buttons: [
            {
              text: 'Ok',
              role: 'ok',
              handler: () => {
                this.loadingFail = true;
              }
            }
          ]
        })).present();
      },
      () => console.log('rooms loaded')
    );
  }

  changeUserState(value) {
    const newUserState: IUser = {...this.userState};
    this.store.dispatch( new fromActions.SetUser(newUserState) );
  }

}
