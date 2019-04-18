import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { EliminateAccountComponent } from './modals/eliminate-account/eliminate-account.component';
import { myEnterAnimation } from '../../../animations/modal-animations/enter';
import { myLeaveAnimation } from '../../../animations/modal-animations/leave';

@Component({
  selector: 'app-settings-security',
  templateUrl: './settings-security.page.html',
  styleUrls: ['./settings-security.page.scss'],
})
export class SettingsSecurityPage implements OnInit {

  constructor(
    private alertCtrl: AlertController,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
  }

  async changePassword() {
    const alert = await this.alertCtrl.create({
      header: 'Change password',
      message: 'Write your new password',
      inputs: [
        {
          name: 'password1',
          type: 'password',
          placeholder: 'New password'
        },
        {
          name: 'password2',
          type: 'password',
          placeholder: 'Repeat'
        }
      ],
      buttons: [
        {
          text: 'Ok',
          role: 'ok',
          cssClass: 'btn-success'
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });

    await alert.present();

  }

  async eliminateAccount() {
    const modal = await this.modalCtrl.create({
      component: EliminateAccountComponent,
      componentProps: {},
      cssClass: ['custom-modal', 'eliminate-account-modal'],
      showBackdrop: true,
      backdropDismiss: false,
      enterAnimation: myEnterAnimation,
      leaveAnimation: myLeaveAnimation
    });

    await modal.present();
  }

}
