import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActionSheetController, ModalController,
  NavController, ToastController, Events, AlertController, LoadingController, IonRouterOutlet } from '@ionic/angular';
import { ShowImageComponent } from 'src/app/shared/modals/show-image/show-image.component';
import { myEnterAnimation } from 'src/app/animations/modal-animations/enter';
import { myLeaveAnimation } from 'src/app/animations/modal-animations/leave';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { UsersService } from 'src/app/services/users-service/users.service';
import { IUser } from 'src/app/interfaces/i-user.interface';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import { Subscription } from 'rxjs';
import * as fromActions from '../../../store/actions';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.page.html',
  styleUrls: ['./user-profile.page.scss'],
})
export class UserProfilePage implements OnInit, OnDestroy {

  user: IUser;
  newAvatarTemp: string;
  userState: any;
  subscription: Subscription = new Subscription();

   // Routes Management
   routerEvents: any;
   previousUrl: string;
   currentUrl: string;
   canGoBack: boolean;

  constructor(
    private router: Router,
    private ionRouterOutlet: IonRouterOutlet,
    private route: ActivatedRoute,
    private actionSheetCtrl: ActionSheetController,
    private modalCtrl: ModalController,
    private navCtrl: NavController,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private geolocation: Geolocation,
    private camera: Camera,
    private _usersService: UsersService,
    private events: Events,
    private loadingCtrl: LoadingController,
    private store: Store<AppState>,
  ) { }

  ngOnInit() {
    this.canGoBack    = this.ionRouterOutlet.canGoBack();
      this.currentUrl   = this.router.url;
      this.routerEvents = this.router.events.subscribe(event => {
          if (event instanceof NavigationEnd) {
              this.previousUrl = this.currentUrl;
              this.currentUrl  = event.url;
          }
      });

    this.user = this.route.snapshot.data.user;

    this.subscription = this.store.select('user').subscribe(
      userState => {
        this.userState = userState.user;
      }
    );
  }

  ionViewWillEnter() {
    this.user = this.route.snapshot.data.user;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.routerEvents.unsubscribe();
  }

  editProfile(event) {
    this.navCtrl.navigateForward(['/users/edit-profile']);
  }

  changeUserState(value) {
    const newUserState: IUser = {...this.userState};
    this.store.dispatch( new fromActions.SetUser(newUserState) );
  }

  async addFriend() {

    const loading = await this.loadingCtrl.create({
      message: 'Please wait...',
    });

    await loading.present();

    this._usersService.addFriend( this.user )
      .subscribe( async () => {
        await loading.dismiss();
        (await this.toastCtrl.create({
          duration: 3000,
          position: 'bottom',
          message: `${this.user.nick} and you are friends`
        })).present();
        this.user.friend = true;
        this.userState.contacts.push(this.user);
        this.changeUserState({});
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

  async openActionSheet() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Choose one',
      mode: 'ios',
      buttons: [
        {
          text: 'Camera',
          icon: 'camera',
          cssClass: 'text-dark',
          handler: () => {
            this.takePhoto();
          }
        },
        {
          text: 'Gallery',
          icon: 'images',
          cssClass: 'text-dark',
          handler: () => {
            this.pickFromGallery();
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });

    await actionSheet.present();
  }

  async showImage() {
    const modal = await this.modalCtrl.create({
      component: ShowImageComponent,
      componentProps: { image: this.user.avatar },
      // cssClass: ['custom-modal', 'eliminate-account-modal'],
      showBackdrop: true,
      backdropDismiss: false,
      enterAnimation: myEnterAnimation,
      leaveAnimation: myLeaveAnimation
    });

    await modal.present();
  }

  // Camera functions

  async takePhoto() {
    const options: CameraOptions = {
      targetWidth: 640, // max width 640px
      targetHeight: 640, // max height 640px
      allowEdit: true,
      destinationType: this.camera.DestinationType.DATA_URL // Base64
    };

    await this.getPicture(options);
  }

  async pickFromGallery() {
    const options: CameraOptions = {
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      targetWidth: 640, // max width 640px
      targetHeight: 640, // max height 640px
      allowEdit: true,
      destinationType: this.camera.DestinationType.DATA_URL // Base64
    };

    await this.getPicture(options);
  }

  private async getPicture(options: CameraOptions) {
    const imageData = await this.camera.getPicture(options);
    this.newAvatarTemp = 'data:image/jpeg;base64,' + imageData;
    this.editAvatar(); // En este caso es especial
  }

  private async editAvatar() {

    const loading = await this.loadingCtrl.create({
      message: 'Please wait...',
    });

    await loading.present();

    this._usersService.saveAvatar( this.newAvatarTemp ).subscribe(
      async () => {
        await loading.dismiss();
        (await this.toastCtrl.create({
          duration: 3000,
          position: 'bottom',
          message: 'Avatar changed!'
        })).present();
        this.user.avatar = this.newAvatarTemp;
        this.userState.avatar = this.user.avatar;
        this.changeUserState({});
        this.newAvatarTemp = '';
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
