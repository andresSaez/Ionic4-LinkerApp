import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { ChooseUserComponent } from 'src/app/shared/modals/choose-user/choose-user.component';

@Component({
  selector: 'app-blocked-users',
  templateUrl: './blocked-users.page.html',
  styleUrls: ['./blocked-users.page.scss'],
})
export class BlockedUsersPage implements OnInit {

  constructor(
    private alertCtrl: AlertController,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
  }

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: ChooseUserComponent,
      componentProps: {}
    });

    await modal.present();
  }

  async openAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Blocked user',
      animated: true,
      buttons: [
        {
          text: 'Unlock it',
          cssClass: 'btn-success'
        },
        {
          text: 'Lock',
          role: 'cancel'
        }
      ]
    });

    await alert.present();
  }
}
