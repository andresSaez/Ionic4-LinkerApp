import { Component, OnInit, OnDestroy } from '@angular/core';
import { IUser } from 'src/app/interfaces/i-user.interface';
import { AlertController, LoadingController, ToastController, NavController } from '@ionic/angular';
import { UsersService } from 'src/app/services/users-service/users.service';
import { PrivateRoomService } from 'src/app/services/private-room-service/private-room.service';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import * as fromActions from '../../../store/actions';

@Component({
  selector: 'app-my-contacts',
  templateUrl: './my-contacts.page.html',
  styleUrls: ['./my-contacts.page.scss'],
})
export class MyContactsPage implements OnInit, OnDestroy {

  contacts: IUser[] = [];
  filteredContacts: IUser[] = [];
  loadingFail = false;
  subscription: Subscription = new Subscription();
  userState: any;
  loaded = false;

  constructor(
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private navCtrl: NavController,
    private _usersService: UsersService,
    private _privateRoomService: PrivateRoomService,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.subscription = this.store.select('user').subscribe(
      userState => {
        this.userState = userState.user;
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ionViewWillEnter() {
    this.chargeMyContacts();
  }

  async selectUser( user: IUser ) {
    const alert = await this.alertCtrl.create({
      header: 'Do you want to send private messages?',
      animated: true,
      buttons: [
        {
          text: 'Let\'s go!',
          cssClass: 'btn-success',
          role: 'ok'
        },
        {
          text: 'Back',
          role: 'cancel'
        }
      ]
    });

    await alert.present();
    const result = await alert.onDidDismiss();

    if (result.role === 'ok') {
      const loading = await this.loadingCtrl.create({
        message: 'Please wait...',
      });

      await loading.present();

      this._privateRoomService.newPrivateRoom( user.id ).subscribe(
        async (resp) => {
          await loading.dismiss();
          (await this.toastCtrl.create({
            duration: 3000,
            position: 'bottom',
            message: `Now you can talk to ${user.nick}`
          })).present();
          this.userState.privaterooms.push(resp.id);
          this.changeUserState({});
          this.navCtrl.navigateForward(['/home/private-rooms']);
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
        }
      );
    }
  }

  async filterItems( event ) {
    let search: string = event.target.value;

    const loading = await this.loadingCtrl.create({
      message: 'Please wait...',
    });

    await loading.present();

    if (search && search.trim() !== '') {
      search = search.trim().toLowerCase();
      this.filteredContacts = this.contacts.filter( u => u.name.toLowerCase().includes( search ) ||
      u.nick.toLowerCase().includes( search ));
      await loading.dismiss();
    } else {
      await loading.dismiss();
      this.chargeMyContacts();
    }
  }

  async chargeMyContacts() {
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...',
    });

    await loading.present();

    this._usersService.getMyFriends().subscribe(
      async (resp) => {
        this.loadingFail = false;
        await loading.dismiss();
        this.contacts = resp;
        this.filteredContacts = resp;
      },
      async (error) => {
        await loading.dismiss();
        (await this.alertCtrl.create({
          header: 'Oops, something has gone wrong ...',
          message: 'Please, try again',
          buttons: [
            {
              text: 'Ok',
              role: 'ok',
              handler: () => {
                this.loadingFail = true;
              }
            }
          ]
        })).present();
      },
      () => console.log('users loaded')
    );
  }

  changeUserState(value) {
    const newUserState: IUser = {...this.userState};
    this.store.dispatch( new fromActions.SetUser(newUserState) );
  }
}
