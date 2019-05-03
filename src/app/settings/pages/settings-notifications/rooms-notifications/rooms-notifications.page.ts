import { Component, OnInit, OnDestroy } from '@angular/core';
import { AlertController, ModalController, LoadingController } from '@ionic/angular';
import { ChooseChatComponent } from 'src/app/shared/modals/choose-chat/choose-chat.component';
import { ISettings } from 'src/app/interfaces/i-settings.interface';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import * as fromActions from '../../../../store/actions';
import { IRoom } from 'src/app/interfaces/i-room.interface';
import { UsersService } from 'src/app/services/users-service/users.service';

@Component({
  selector: 'app-rooms-notifications',
  templateUrl: './rooms-notifications.page.html',
  styleUrls: ['./rooms-notifications.page.scss'],
})
export class RoomsNotificationsPage implements OnInit, OnDestroy {

  settings: ISettings;
  roomsExcepetions: IRoom[] = [];
  loadingFail = false;
  subscription: Subscription = new Subscription();
  roomExceptionsIds: string[] = [];

  constructor(
    private alertCtrl: AlertController,
    private modalCtrl: ModalController,
    private store: Store<AppState>,
    private _usersService: UsersService,
    private loadingCtrl: LoadingController
  ) { }

  ngOnInit() {
    this.chargeRoomExceptions();

    this.subscription = this.store.select('settings').subscribe(
      settingsState => {
        this.settings = settingsState.settings;
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  changeSettings(value) {
    const newSettings: ISettings = {...this.settings};
    this.store.dispatch( new fromActions.SetSettings(newSettings) );
  }

  async openModal() {
    this.getRoomsExceptionsIds();
    const modal = await this.modalCtrl.create({
      component: ChooseChatComponent,
      componentProps: {roomExceptionsIds: this.roomExceptionsIds}
    });

    await modal.present();

    const result = await modal.onDidDismiss();

    if (result.data) {
      this.roomsExcepetions.push(result.data.room);
      this.settings.notifications.rooms.exceptions = this.roomsExcepetions.map( (el: any) => el.id);
      this.changeSettings({});
    }
  }

  async activateNotifications( room: IRoom ) {
    const alert = await this.alertCtrl.create({
      header: 'Notifications',
      animated: true,
      buttons: [
        {
          text: 'Activate',
          cssClass: 'btn-success',
          role: 'ok'
        },
        {
          text: 'Deactivate',
          role: 'cancel'
        }
      ]
    });

    await alert.present();
    const result = await alert.onDidDismiss();

    if (result.role === 'ok') {
      this.roomsExcepetions = this.roomsExcepetions.filter( (el: any) => el.id !== room.id );
      this.settings.notifications.rooms.exceptions = this.roomsExcepetions.map( (el: any) => el.id);
      this.changeSettings({});
    }
  }

  async chargeRoomExceptions() {
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...',
    });

    await loading.present();

    this._usersService.getRoomExceptions().subscribe(
      async (resp) => {
        this.loadingFail = false;
        await loading.dismiss();
        this.roomsExcepetions = resp;
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
      () => console.log('users loaded')
    );
  }

  private getRoomsExceptionsIds() {
    this.roomExceptionsIds = this.roomsExcepetions.map( (el: any) => el.id);
  }

}
