import { Component, OnInit } from '@angular/core';
import { ActionSheetController, ModalController, NavController, ToastController, Events, AlertController } from '@ionic/angular';
import { ShowImageComponent } from 'src/app/shared/modals/show-image/show-image.component';
import { myEnterAnimation } from 'src/app/animations/modal-animations/enter';
import { myLeaveAnimation } from 'src/app/animations/modal-animations/leave';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { UsersService } from 'src/app/services/users-service/users.service';
import { IUser } from 'src/app/interfaces/i-user.interface';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.page.html',
  styleUrls: ['./user-profile.page.scss'],
})
export class UserProfilePage implements OnInit {

  user: IUser;
  newAvatarTemp: string;

  constructor(
    private route: ActivatedRoute,
    private actionSheetCtrl: ActionSheetController,
    private modalCtrl: ModalController,
    private navCtrl: NavController,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private geolocation: Geolocation,
    private camera: Camera,
    private _usersService: UsersService,
    private events: Events
  ) { }

  ngOnInit() {
    this.user = this.route.snapshot.data.user;
    /** Esto va fuera cuando tenga los servicios implementados*/
    this.user = {
      nick: 'Andres90',
      biography: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
      incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
      exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`,
      interests: [ 'Beach', 'Gym', 'Movies' ],
      name: 'Andrés Sáez Cases',
      email: 'andsc@email.com',
      avatar: '../assets/images/avatar.jpg',
      friend: true,
      me: true
    };
    ///////////////////////////////////////////////
  }

  editProfile(event) {
    this.events.publish('user', this.user);
    console.log('object', this.user);
    this.navCtrl.navigateForward(['/users/edit-profile']);
  }

  addFriend() {
    this._usersService.addFriend( this.user )
      .subscribe( async () => {
        (await this.toastCtrl.create({
          duration: 3000,
          position: 'bottom',
          message: `${this.user.nick} and you are friends`
        })).present();
        this.user.friend = true;
      },
       async (error) => {
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
      componentProps: {},
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

  private editAvatar() {
    this._usersService.saveAvatar( this.newAvatarTemp ).subscribe(
      async () => {
        (await this.toastCtrl.create({
          duration: 3000,
          position: 'bottom',
          message: 'Avatar changed!'
        })).present();
        this.user.avatar = this.newAvatarTemp;
        this.newAvatarTemp = '';
      },
      async (error) => {
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
