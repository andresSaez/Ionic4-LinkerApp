import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/interfaces/i-user.interface';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { NavController, AlertController, LoadingController, ToastController } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';

// import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
// import { ILoginGoogleFbRequest } from '../../interfaces/ilogin-google-fb-request';
// import { GooglePlus } from '@ionic-native/google-plus/ngx';
// import { OneSignal } from '@ionic-native/onesignal/ngx';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  user: IUser;
  accessToken = '';
  response = null;

  constructor(
    private _authService: AuthService,
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private geolocation: Geolocation,
    private loadingCtrl: LoadingController
  ) { }

  ngOnInit() {
    this.resetForm();
    this.geolocate();
  }

  async submitLoginForm() {
    console.log('login');
    // try {
    //   const oneSignalId = (await this.oneSignal.getIds()).userId;
    //   this.user.oneSignalId = oneSignalId;
    // } catch (e) {
    //   console.log(e);
    // }

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

  }

  async loginFB() {

  }

  async loginTwitter() {

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
