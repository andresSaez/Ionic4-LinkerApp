import { Component, OnInit } from '@angular/core';
import { NavController, ToastController, AlertController, LoadingController } from '@ionic/angular';
import { IUser } from 'src/app/interfaces/i-user.interface';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';

import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import { ILoginGoogleFbRequest } from '../../../interfaces/i-login-google-fb-request';
import { GooglePlus } from '@ionic-native/google-plus/ngx';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  newUser: IUser;
  email2: string;
  password2: string;
  accessToken = '';
  requestLoginGoogleFB: ILoginGoogleFbRequest;
  response = null;

  constructor(
    private _authService: AuthService,
    private navCtrl: NavController,
    private toastCtrl: ToastController,
    private geolocation: Geolocation,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    public fb: Facebook,
    public gplus: GooglePlus
  ) { }

  ngOnInit() {
    this.resetForm();
    this.geolocate();
  }

  async submitRegisterForm() {

    const loading = await this.loadingCtrl.create({
      message: 'Please wait...',
    });

    await loading.present();

    this._authService.register(this.newUser)
      .subscribe( async (resp: any) => {
        if (!resp.error) {
            await loading.dismiss();
          ( await this.toastCtrl.create({
            duration: 3000,
            position: 'bottom',
            message: 'User registered'
          })).present();
          this.navCtrl.navigateRoot(['/auth/login']);
        } else {
            await loading.dismiss();
            (await this.alertCtrl.create({
              header: 'Oops, something has gone wrong ...',
              message: resp.errorMessage,
              buttons: [
                {
                  text: 'Ok',
                  role: 'ok'
                }
              ]
            })).present();
        }
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
          })).present(); }
        );
  }

  async loginGoogle() {
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...',
    });

    await loading.present();

    try {
      const res = await this.gplus.login({'webClientId': '83592756611-cd5bhd8g7le8uq6q28ql85vpjpf209a6.apps.googleusercontent.com'});
        this.response = res;
        console.log(res);
        this.requestLoginGoogleFB = {
          token: this.response.idToken,
          lat: this.newUser.lat,
          lng: this.newUser.lng
        };
        console.log(this.requestLoginGoogleFB);
        this._authService.loginGoogle(this.requestLoginGoogleFB).subscribe(
          async (us) => {
            await loading.dismiss();
            ( await this.toastCtrl.create({
              duration: 3000,
              position: 'bottom',
              message: 'Welcome!'
            })).present();
            this.navCtrl.navigateForward(['/home']);
          },
          async error => {
            await loading.dismiss();
            (await this.alertCtrl.create({
              header: 'Login error',
              message: 'Try again',
              buttons: ['Ok']
            })).present();
          }
        );
      } catch (err) {
        console.error(err);
      }
  }

  async loginFB() {
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...',
    });

    await loading.present();

    const resp = await this.fb.login(['public_profile', 'email']);
    if (resp.status === 'connected') {
      this.accessToken = resp.authResponse.accessToken;
      this.requestLoginGoogleFB = {
        token: this.accessToken,
        lat: this.newUser.lat,
        lng: this.newUser.lng
      };
      this._authService.loginFacebook(this.requestLoginGoogleFB).subscribe(
        async (us) => {
          await loading.dismiss();
          ( await this.toastCtrl.create({
            duration: 3000,
            position: 'bottom',
            message: 'Welcome!'
          })).present();
          this.navCtrl.navigateForward(['/home']);
        },
        async error => {
          await loading.dismiss();
          (await this.alertCtrl.create({
            header: 'Login error',
            message: 'Try again',
            buttons: ['Ok']
          })).present();
        }
      );
    }

  }

  async loginTwitter() {

  }

  geolocate() {
    this.geolocation.getCurrentPosition().then((data) => {
      this.newUser.lat = data.coords.latitude;
      this.newUser.lng = data.coords.longitude;
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  resetForm() {
    this.newUser = {
      nick: '',
      name: '',
      email: '',
      avatar: '',
      biography: '',
      interests: [],
      lat: 0,
      lng: 0
    };

    this.password2 = '';
    this.email2 = '';
  }

}
