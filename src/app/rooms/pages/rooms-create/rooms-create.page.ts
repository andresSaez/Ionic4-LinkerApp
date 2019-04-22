import { Component, OnInit } from '@angular/core';
import { IRoom } from 'src/app/interfaces/i-room.interface';
import { ActionSheetController, ModalController, NavController, ToastController } from '@ionic/angular';
import { SelectLocationComponent } from 'src/app/shared/modals/select-location/select-location.component';
import { IUser } from 'src/app/interfaces/i-user.interface';
import { RoomService } from 'src/app/services/room-service/room.service';
import { Camera } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-rooms-create',
  templateUrl: './rooms-create.page.html',
  styleUrls: ['./rooms-create.page.scss'],
})
export class RoomsCreatePage implements OnInit {

  newRoom: IRoom;
  logguedUser: IUser;
  hastag = '';
  hastagList: string[] = [];

  constructor(
    private actionSheetCtrl: ActionSheetController,
    private modalCtrl: ModalController,
    private navCtrl: NavController,
    private toastCtrl: ToastController,
    private _roomService: RoomService,
    private camera: Camera
  ) { }

  ngOnInit() {
    // primero recupero el usuario logueado 'logguedUser' del store
    this.resetForm();
    console.log(this.newRoom);
  }

  submitCreateRoomForm() {
    // this.newRoom.creator = this.logguedUser;
    this._roomService.newRoom( this.newRoom )
      .subscribe(
        async () => {
          (await this.toastCtrl.create({
            duration: 3000,
            position: 'bottom',
            message: 'Room created!'
          })).present();
          this.navCtrl.navigateBack(['/home/rooms']);
        }
      );
  }

  resetForm() {
    this.newRoom = {
      name: '',
      description: '',
      image: '../../../../assets/images/default-image.jpg',
      hastags: [],
      date: new Date().toDateString(),
      lat: null,
      lng: null
    };
  }

  deleteHastag( hastag: string ) {
    this.newRoom.hastags = this.newRoom.hastags.filter( i => i !== hastag);
  }

  addHastag() {
    this.newRoom.hastags.push( this.hastag );
    this.hastag = '';
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

    const result = await actionSheet.onDidDismiss();
    console.log(result);
  }

  async openSelectLocation() {
    const modal = await this.modalCtrl.create({
      component: SelectLocationComponent,
      componentProps: { lat: this.logguedUser.lat, lng: this.logguedUser.lng }
    });

    await modal.present();

    const result = await modal.onDidDismiss();
    this.newRoom.lat = result.data.lat;
    this.newRoom.lng = result.data.lng;
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
    this.newRoom.image = 'data:image/jpeg;base64,' + imageData;
  }


}
