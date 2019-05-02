import { Component, OnInit, OnDestroy } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { ChooseChatComponent } from 'src/app/shared/modals/choose-chat/choose-chat.component';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import { ISettings } from 'src/app/interfaces/i-settings.interface';
import { Subscription } from 'rxjs';
import * as fromActions from '../../../../store/actions';

@Component({
  selector: 'app-private-notifications',
  templateUrl: './private-notifications.page.html',
  styleUrls: ['./private-notifications.page.scss'],
})
export class PrivateNotificationsPage implements OnInit, OnDestroy {

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
    const newSettings: ISettings = {...this.settings};
    this.store.dispatch( new fromActions.SetSettings(newSettings) );
  }

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: ChooseChatComponent,
      componentProps: {}
    });

    await modal.present();
  }

  async activateNotifications() {
    const alert = await this.alertCtrl.create({
      header: 'Notifications',
      animated: true,
      buttons: [
        {
          text: 'Activate',
          cssClass: 'btn-success'
        },
        {
          text: 'Deactivate',
          role: 'cancel'
        }
      ]
    });

    await alert.present();
  }

}
