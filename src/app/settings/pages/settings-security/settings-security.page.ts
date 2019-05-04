import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, LoadingController, ToastController, NavController } from '@ionic/angular';
import { EliminateAccountComponent } from './modals/eliminate-account/eliminate-account.component';
import { myEnterAnimation } from '../../../animations/modal-animations/enter';
import { myLeaveAnimation } from '../../../animations/modal-animations/leave';
import { UsersService } from 'src/app/services/users-service/users.service';
import { AuthService } from 'src/app/services/auth-service/auth.service';

@Component({
  selector: 'app-settings-security',
  templateUrl: './settings-security.page.html',
  styleUrls: ['./settings-security.page.scss'],
})
export class SettingsSecurityPage implements OnInit {

  constructor(
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private _usersService: UsersService,
    private _authService: AuthService
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
    const result = await alert.onDidDismiss();

    if (result.role === 'ok') {
      if (result.data.values.password1 === result.data.values.password2
          && result.data.values.password1 !== '' && result.data.value.password2 !== '' ) {
        const loading = await this.loadingCtrl.create({
          message: 'Please wait...',
        });

        await loading.present();

        this._usersService.savePassword( result.data.values.password1 ).subscribe(
           async () => {
             await loading.dismiss();
             ( await this.toastCtrl.create({
              duration: 3000,
              position: 'bottom',
              message: 'Password changed!'
            })).present();
           },
           async (error) => {
            await loading.dismiss();
            (await this.alertCtrl.create({
              header: 'Oops, something has gone wrong ...',
              message: 'Please, try again',
              buttons: ['Ok']
            })).present();
           }
        );
      } else {
        (await this.alertCtrl.create({
          header: 'Oops, something has gone wrong ...',
          message: 'Passwords do not match or are empty',
          buttons: ['Ok']
        })).present();
      }
    }
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

    const result = await modal.onDidDismiss();

    if (result.data) {
      console.log(result.data.ok);
      const loading = await this.loadingCtrl.create({
        message: 'Please wait...',
      });

      await loading.present();

      this._usersService.deleteAccount().subscribe(
        async () => {
          await loading.dismiss();
          await this._authService.logout();
          this.navCtrl.navigateRoot(['/auth/login']);
        },
        async (error) => {
          await loading.dismiss();
            (await this.alertCtrl.create({
              header: 'Oops, something has gone wrong ...',
              message: 'Please, try again',
              buttons: ['Ok']
            })).present();
        }
      );
    }
  }

}
