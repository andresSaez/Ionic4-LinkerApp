import { Component, OnInit, OnDestroy } from '@angular/core';
import { AlertController, ModalController, LoadingController } from '@ionic/angular';
import { ChooseUserComponent } from 'src/app/shared/modals/choose-user/choose-user.component';
import { ISettings } from 'src/app/interfaces/i-settings.interface';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import * as fromActions from '../../../../store/actions';
import { IUser } from 'src/app/interfaces/i-user.interface';
import { UsersService } from 'src/app/services/users-service/users.service';

@Component({
  selector: 'app-blocked-users',
  templateUrl: './blocked-users.page.html',
  styleUrls: ['./blocked-users.page.scss'],
})
export class BlockedUsersPage implements OnInit, OnDestroy {
  settings: ISettings;
  blockedusers: IUser[] = [];
  subscription: Subscription = new Subscription();
  loadingFail = false;

  constructor(
    private alertCtrl: AlertController,
    private modalCtrl: ModalController,
    private store: Store<AppState>,
    private _usersService: UsersService,
    private loadingCtrl: LoadingController
  ) { }

  ngOnInit() {
    this.chargeBlockedUsers();

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
      component: ChooseUserComponent,
      componentProps: {}
    });

    await modal.present();

    const result = await modal.onDidDismiss();

    if (result.data.user) {
      this.blockedusers.push(result.data.user);
      this.settings.privacity.blockedusers = this.blockedusers.map( (el: any) => el.id);
      this.changeSettings({});
    }
  }

  async openAlert( blockeduser: IUser ) {
    const alert = await this.alertCtrl.create({
      header: 'Blocked user',
      animated: true,
      buttons: [
        {
          text: 'Unlock it',
          cssClass: 'btn-success',
          role: 'ok'
        },
        {
          text: 'Lock',
          role: 'cancel'
        }
      ]
    });

    await alert.present();
    const result = await alert.onDidDismiss();

    if (result.role === 'ok') {
      this.blockedusers = this.blockedusers.filter( (el: any) => el.id !== blockeduser.id );
      this.settings.privacity.blockedusers = this.blockedusers.map( (el: any) => el.id);
      this.changeSettings({});
    }
  }

  async chargeBlockedUsers() {
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...',
    });

    await loading.present();

    this._usersService.getBlockedUsers().subscribe(
      async (resp) => {
        this.loadingFail = false;
        await loading.dismiss();
        this.blockedusers = resp;
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
