import { Component, OnInit } from '@angular/core';
import { NavController, ToastController, AlertController, Events, LoadingController } from '@ionic/angular';
import { IUser } from 'src/app/interfaces/i-user.interface';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { UsersService } from 'src/app/services/users-service/users.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {
// Falta implementar CanDeactivate y controlar con un alert cuando falla el guardarPerfil
  user: IUser;
  skills = '';
  skillList: string[] = [];

  constructor(
    private navCtrl: NavController,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private geolocation: Geolocation,
    private _usersService: UsersService,
    private events: Events,
    private loadingCtrl: LoadingController
  ) { }

  ngOnInit() {
    this.resetForm();
    this.geolocate();
    this.events.subscribe('user', us => {
      this.user = us;
      console.log(this.user); // quitar
    });
  }

  async submitEditProfileForm() {
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...',
    });

    await loading.present();

    this._usersService.saveProfile( this.user )
      .subscribe( async () => {
        await loading.dismiss();
        ( await this.toastCtrl.create({
          duration: 3000,
          position: 'bottom',
          message: 'Profile updated!'
        })).present();
        this.navCtrl.navigateBack(['/users/profile']);
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
        })).present();
      });
  }

  deleteSkill( skill: string ) {
    this.user.interests = this.user.interests.filter( i => i !== skill);
  }

  addSkill() {
    this.user.interests.push( this.skills );
    this.skills = '';
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
      name: '',
      nick: '',
      email: '',
      biography: '',
      interests: []
    };

    this.skills = '';
  }

}
