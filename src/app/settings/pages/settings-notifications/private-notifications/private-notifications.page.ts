import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { ChooseChatComponent } from 'src/app/shared/modals/choose-chat/choose-chat.component';

@Component({
  selector: 'app-private-notifications',
  templateUrl: './private-notifications.page.html',
  styleUrls: ['./private-notifications.page.scss'],
})
export class PrivateNotificationsPage implements OnInit {

  constructor(
    private alertCtrl: AlertController,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
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
