import { Component, OnInit, OnDestroy } from '@angular/core';
import { AlertController, ModalController, LoadingController } from '@ionic/angular';
import { ChooseChatComponent } from 'src/app/shared/modals/choose-chat/choose-chat.component';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import { ISettings } from 'src/app/interfaces/i-settings.interface';
import { Subscription } from 'rxjs';
import * as fromActions from '../../../../store/actions';
import { IPrivateRoom } from 'src/app/interfaces/i-private-room.interface';
import { UsersService } from 'src/app/services/users-service/users.service';

@Component({
  selector: 'app-private-notifications',
  templateUrl: './private-notifications.page.html',
  styleUrls: ['./private-notifications.page.scss'],
})
export class PrivateNotificationsPage implements OnInit, OnDestroy {

  settings: ISettings;
  proomsExcepetions: IPrivateRoom[] = [];
  loadingFail = false;
  subscription: Subscription = new Subscription();

  constructor(
    private alertCtrl: AlertController,
    private modalCtrl: ModalController,
    private store: Store<AppState>,
    private _usersService: UsersService,
    private loadingCtrl: LoadingController
  ) { }

  ngOnInit() {
    this.chargePrivateRoomExceptions();

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
    const modal = await this.modalCtrl.create({
      component: ChooseChatComponent,
      componentProps: {}
    });

    await modal.present();
    const result = await modal.onDidDismiss();

    if (result.data.room) {
      this.proomsExcepetions.push(result.data.room);
      this.settings.notifications.private.exceptions = this.proomsExcepetions.map( (el: any) => el.id);
      this.changeSettings({});
    }
  }

  async activateNotifications( proom: IPrivateRoom ) {
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
      this.proomsExcepetions = this.proomsExcepetions.filter( (el: any) => el.id !== proom.id );
      this.settings.notifications.private.exceptions = this.proomsExcepetions.map( (el: any) => el.id);
      this.changeSettings({});
    }
  }

  async chargePrivateRoomExceptions() {
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...',
    });

    await loading.present();

    this._usersService.getPrivateRoomExceptions().subscribe(
      async (resp) => {
        this.loadingFail = false;
        await loading.dismiss();
        this.proomsExcepetions = resp;
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

}
