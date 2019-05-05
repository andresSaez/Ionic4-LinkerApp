import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavController, AlertController, LoadingController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import { IPrivateRoom } from 'src/app/interfaces/i-private-room.interface';
import { PrivateRoomService } from 'src/app/services/private-room-service/private-room.service';
import { IUser } from 'src/app/interfaces/i-user.interface';
import * as fromActions from '../../../../store/actions';

@Component({
  selector: 'app-private-rooms',
  templateUrl: './private-rooms.page.html',
  styleUrls: ['./private-rooms.page.scss'],
})
export class PrivateRoomsPage implements OnInit, OnDestroy {

  myRooms: IPrivateRoom[] = [];
  subscription: Subscription = new Subscription();
  userState: any;
  loaded = false;
  loadingFail = false;

  constructor(
    private navCtrl: NavController,
    private store: Store<AppState>,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private _proomService: PrivateRoomService
  ) { }

  ngOnInit() {
    this.chargeRooms();

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

  openChat() {
    this.navCtrl.navigateForward(['/chat']);
  }

  async delete( room: IPrivateRoom ) {
    this._proomService.leavePrivateRoom(room.id).subscribe(
      () => {
        this.myRooms = this.myRooms.filter( (el: any) => el.id !== room.id );
        this.userState.privaterooms = this.myRooms.map( (el: any) => el.id);
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

    this._proomService.getPrivateRoomsMine().subscribe(
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
