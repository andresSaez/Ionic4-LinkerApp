import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { IUser } from 'src/app/interfaces/i-user.interface';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  newUser: IUser;
  email2: string;
  password2: string;

  constructor(
    private _authService: AuthService,
    private navCtrl: NavController,
    private toastCtrl: ToastController,
    private geolocation: Geolocation
  ) { }

  ngOnInit() {
    this.resetForm();
    this.geolocate();
  }

  submitRegisterForm() {
    this._authService.register(this.newUser)
      .subscribe( async () => {
        ( await this.toastCtrl.create({
          duration: 3000,
          position: 'bottom',
          message: 'User registered'
        })).present();
        this.navCtrl.navigateRoot(['/auth/login']);
      } );
  }

  async loginGoogle() {

  }

  async loginFB() {

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
      avatar: '../../../../assets/images/default-profile.png',
      biograpghy: '',
      interests: [],
      lat: 0,
      lng: 0
    };

    this.password2 = '';
    this.email2 = '';
  }

}
