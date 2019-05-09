import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/interfaces/i-user.interface';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { NavController, AlertController, LoadingController, ToastController } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';


import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import { ILoginGoogleFbRequest } from '../../../interfaces/i-login-google-fb-request';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { TwitterConnect, TwitterConnectResponse } from '@ionic-native/twitter-connect/ngx';
import { OneSignal } from '@ionic-native/onesignal/ngx';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  user: IUser;
  accessToken = '';
  response = null;
  requestLoginGoogleFB: ILoginGoogleFbRequest;

  constructor(
    private _authService: AuthService,
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private geolocation: Geolocation,
    private loadingCtrl: LoadingController,
    public fb: Facebook,
    public gplus: GooglePlus,
    public twitter: TwitterConnect,
    private oneSignal: OneSignal,
  ) { }

  ngOnInit() {
    this.resetForm();
    this.geolocate();
  }

  async submitLoginForm() {
    console.log('login');
    try {
      const oneSignalId = (await this.oneSignal.getIds()).userId;
      this.user.onesignalid = oneSignalId;
    } catch (e) {
      console.log(e);
    }

    // console.log('haciendo login');
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...',
    });

    await loading.present();

    this._authService.login(this.user).subscribe(
      async () => {
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
          message: 'Incorrect email and/or password',
          buttons: ['Ok']
        })).present();
      }
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
          lat: this.user.lat,
          lng: this.user.lng
        };

        try {
          const oneSignalId = (await this.oneSignal.getIds()).userId;
          this.requestLoginGoogleFB.onesignalid = oneSignalId;
        } catch (e) {
          console.log(e);
        }

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
        lat: this.user.lat,
        lng: this.user.lng
      };

      try {
        const oneSignalId = (await this.oneSignal.getIds()).userId;
        this.requestLoginGoogleFB.onesignalid = oneSignalId;
      } catch (e) {
        console.log(e);
      }

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
    } else {
      await loading.dismiss();
    }
  }

  async loginTwitter() {
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...',
    });

    await loading.present();

    try {
      const res = await this.twitter.login();
        this.response = res;
        console.log('res:   '  + res);
        this.requestLoginGoogleFB = {
          token: this.response.token,
          lat: this.user.lat,
          lng: this.user.lng
        };
        console.log(this.requestLoginGoogleFB);
        this._authService.loginTwitter(this.requestLoginGoogleFB).subscribe(
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
        console.error('error:  ' + err);
        await loading.dismiss();
      }
  }

  geolocate() {
    this.geolocation.getCurrentPosition().then((data) => {
      this.user.lat = data.coords.latitude;
      this.user.lng = data.coords.longitude;
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  resetForm() {
    this.user = {
      email: '',
      password: '',
      lat: 0,
      lng: 0
    };
  }


}
