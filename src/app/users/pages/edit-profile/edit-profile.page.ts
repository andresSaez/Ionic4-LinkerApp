import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavController, ToastController, AlertController, Events, LoadingController } from '@ionic/angular';
import { IUser } from 'src/app/interfaces/i-user.interface';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { UsersService } from 'src/app/services/users-service/users.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import * as fromActions from '../../../store/actions';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit, OnDestroy {
// Falta implementar CanDeactivate y controlar con un alert cuando falla el guardarPerfil
  user: IUser;
  skills = '';
  skillList: string[] = [];
  subscription: Subscription = new Subscription();
  userState: any;

  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private geolocation: Geolocation,
    private _usersService: UsersService,
    private events: Events,
    private loadingCtrl: LoadingController,
    private store: Store<AppState>,
  ) { }

  ngOnInit() {
    this.resetForm();
    this.geolocate();
    this.user = this.route.snapshot.data.user;

    this.subscription = this.store.select('user').subscribe(
      userState => {
        this.userState = userState.user;
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
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
        this.changeUserState({});
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

  changeUserState(value) {
    this.userState.nick = this.user.nick;
    this.userState.name = this.user.name;
    this.userState.email = this.user.email;
    this.userState.interests = [...this.user.interests];
    this.userState.biography = this.user.biography;
    this.userState.lat = this.user.lat;
    this.userState.lng = this.user.lng;

    const newUserState: IUser = {...this.userState};
    this.store.dispatch( new fromActions.SetUser(newUserState) );
  }

}
