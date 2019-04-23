import { Component, OnInit } from '@angular/core';
import { NavController, ModalController, ActionSheetController, LoadingController, AlertController, ToastController } from '@ionic/angular';
import { ShowImageComponent } from 'src/app/shared/modals/show-image/show-image.component';
import { myEnterAnimation } from 'src/app/animations/modal-animations/enter';
import { myLeaveAnimation } from 'src/app/animations/modal-animations/leave';
import { IRoom } from 'src/app/interfaces/i-room.interface';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { RoomService } from 'src/app/services/room-service/room.service';


@Component({
  selector: 'app-rooms-details',
  templateUrl: './rooms-details.page.html',
  styleUrls: ['./rooms-details.page.scss'],
})
export class RoomsDetailsPage implements OnInit {

  room: IRoom;
  newImageTemp: string;

  constructor(
    private navCtrl: NavController,
    private modalCtrl: ModalController,
    private actionSheetCtrl: ActionSheetController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private camera: Camera,
    private _roomService: RoomService
  ) { }

  ngOnInit() {

    /** Esto se debe de quitar cuando cargue la información con el servicio. Para pruebas lo estoy hardcodeando */
    this.room = {
      name: 'DAW 2019',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
      image: '../../../../assets/images/default-image.jpg', // mirar lo de la imagen
      hastags: [ 'beach', 'sun', 'beer'],
      date: new Date().toDateString(),
      lat: 12.5,
      lng: 5.7,
      distance: 12.5,
      mine: true,
      members: [
        {
          id: '1',
          nick: 'Andres90',
          biography: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
          exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`,
          interests: [ 'Beach', 'Gym', 'Movies' ],
          name: 'Andrés Sáez Cases',
          email: 'andsc@email.com',
          avatar: '../../../../assets/images/avatar.jpg',
          friend: true,
        },
        {
          id: '2',
          nick: 'Pilar91',
          biography: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
          exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`,
          interests: [ 'Beach', 'Gym', 'Movies' ],
          name: 'Pilar Messeguer',
          email: 'pilar@email.com',
          avatar: '../../../../assets/images/avatar.jpg',
          friend: true,
        },
        {
          id: '3',
          nick: 'LuisL',
          biography: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
          exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`,
          interests: [ 'Beach', 'Gym', 'Movies' ],
          name: 'Luis Lopez',
          email: 'luis@email.com',
          avatar: '../../../../assets/images/avatar.jpg',
          friend: false,
        }
      ]
    };
    /////////////////////////////////////////////////////////////
  }

  viewProfile( id: string ) {
    this.navCtrl.navigateForward(['/users/profile', id]);
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
    this.newImageTemp = 'data:image/jpeg;base64,' + imageData;
    this.editRoomImage(); // En este caso es especial
  }

  private async editRoomImage() {

    const loading = await this.loadingCtrl.create({
      message: 'Please wait...',
    });

    await loading.present();

    this._roomService.saveImage( this.newImageTemp, this.room.id ).subscribe(
      async () => {
        await loading.dismiss();
        (await this.toastCtrl.create({
          duration: 3000,
          position: 'bottom',
          message: 'Avatar changed!'
        })).present();
        this.room.image = this.newImageTemp;
        this.newImageTemp = '';
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
