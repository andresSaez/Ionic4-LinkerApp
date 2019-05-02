import { Component, OnInit, OnDestroy } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { ChooseUserComponent } from 'src/app/shared/modals/choose-user/choose-user.component';
import { ISettings } from 'src/app/interfaces/i-settings.interface';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import * as fromActions from '../../../../store/actions';
import { IUser } from 'src/app/interfaces/i-user.interface';

@Component({
  selector: 'app-blocked-users',
  templateUrl: './blocked-users.page.html',
  styleUrls: ['./blocked-users.page.scss'],
})
export class BlockedUsersPage implements OnInit, OnDestroy {
  settings: ISettings;

  subscription: Subscription = new Subscription();

  constructor(
    private alertCtrl: AlertController,
    private modalCtrl: ModalController,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
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
    const newSettings: ISettings = {...this.settings,
                                    privacity: { ...this.settings.privacity,
                                                  blockedusers: this.settings.privacity.blockedusers.map( (el: any) => el.id )
                                              }
                                  };
    console.log(newSettings);
    this.store.dispatch( new fromActions.SetSettings(newSettings) );
  }

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: ChooseUserComponent,
      componentProps: {}
    });

    await modal.present();

    const result = await modal.onDidDismiss();

    this.settings.privacity.blockedusers.push(result.data.user);
    this.changeSettings({});
    // this.changeSettings({});
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
      this.settings.privacity.blockedusers = this.settings.privacity.blockedusers.filter( (el: any) => el.id !== blockeduser.id );
      this.changeSettings({});
    }
  }
}
