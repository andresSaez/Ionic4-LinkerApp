import { Component, OnInit, OnDestroy } from '@angular/core';
import { AlertController, NavController, LoadingController, ToastController } from '@ionic/angular';
import { IRoom } from 'src/app/interfaces/i-room.interface';
import { RoomService } from 'src/app/services/room-service/room.service';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import { IUser } from 'src/app/interfaces/i-user.interface';
import * as fromActions from '../../../store/actions';

@Component({
  selector: 'app-rooms-home',
  templateUrl: './rooms-home.page.html',
  styleUrls: ['./rooms-home.page.scss'],
})
export class RoomsHomePage implements OnInit, OnDestroy {

  slideOpts = {
    initialSlide: 1,
    speed: 400
  };

  rooms: IRoom[] = [];
  filteredRooms: IRoom[] = [];
  loadingFail = false;
  subscription: Subscription = new Subscription();
  userState: any;
  loaded = false;

  constructor(
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private _roomService: RoomService,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.getRooms();

    this.subscription = this.store.select('user').subscribe(
      userState => {
        this.userState = userState.user;
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ionViewWillEnter() {
    this.getRooms();
  }

  async getRooms() {
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...',
    });

    await loading.present();

    this._roomService.getRooms()
      .subscribe(
        async (rooms) => {
          this.loadingFail = false;
          this.loaded = true;
          await loading.dismiss();
          this.rooms = rooms;
          this.filteredRooms = rooms;
          this.getCorrectedItems();
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
         }
      );

  }

  async searchRoom( event ) {
    let searchText: string = event.target.value;

    const loading = await this.loadingCtrl.create({
      message: 'Please wait...',
    });

    await loading.present();

    if ( searchText && searchText.trim() !== '') {
      searchText = searchText.trim().toLowerCase();
      this.filteredRooms = this.rooms.filter( r => r.name.toLowerCase().includes( searchText ) ||
      r.description.toLowerCase().includes( searchText ) || r.hastags.includes( searchText ));
      await loading.dismiss();
    } else {
      await loading.dismiss();
      this.getRooms();
    }

  }

  async openAlert( room: IRoom ) {
    const alert = await this.alertCtrl.create({
      header: 'Do you want to join this room?',
      animated: true,
      buttons: [
        {
          text: 'Let\'s go!',
          cssClass: 'btn-success',
          role: 'ok'
        },
        {
          text: 'Back',
          role: 'cancel'
        }
      ]
    });

    await alert.present();
    const result = await alert.onDidDismiss();

    if (result.role === 'ok') {
      const loading = await this.loadingCtrl.create({
        message: 'Please wait...',
      });

      await loading.present();

      this._roomService.addMemberToRoom(room.id).subscribe(
        async () => {
          await loading.dismiss();
          (await this.toastCtrl.create({
            duration: 3000,
            position: 'bottom',
            message: `You have joined to ${room.name}`
          })).present();
          this.userState.rooms.push(room.id);
          this.changeUserState({});
          this.navCtrl.navigateForward(['/home/rooms']);
        },
        async (error) => {
          await loading.dismiss();
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
  }

  changeUserState(value) {
    const newUserState: IUser = {...this.userState};
    this.store.dispatch( new fromActions.SetUser(newUserState) );
  }

  private getCorrectedItems() {
    this.filteredRooms = this.filteredRooms.filter( (el: any) => !this.userState.rooms.includes(el.id));
  }

}
