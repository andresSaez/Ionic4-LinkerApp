import { Component, OnInit, OnDestroy } from '@angular/core';
import { IRoom } from 'src/app/interfaces/i-room.interface';
import { ActionSheetController, ModalController, NavController, ToastController, AlertController, LoadingController } from '@ionic/angular';
import { SelectLocationComponent } from 'src/app/shared/modals/select-location/select-location.component';
import { IUser } from 'src/app/interfaces/i-user.interface';
import { RoomService } from 'src/app/services/room-service/room.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import * as fromActions from '../../../store/actions';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-rooms-create',
  templateUrl: './rooms-create.page.html',
  styleUrls: ['./rooms-create.page.scss'],
})
export class RoomsCreatePage implements OnInit, OnDestroy {

  newRoom: IRoom;
  logguedUser: IUser = {
    lat: 0,
    lng: 0
  };
  hastag = '';
  hastagList: string[] = [];
  subscription: Subscription = new Subscription();
  userState: any;

  constructor(
    private actionSheetCtrl: ActionSheetController,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private navCtrl: NavController,
    private toastCtrl: ToastController,
    private _roomService: RoomService,
    private camera: Camera,
    private geolocation: Geolocation,
    private loadingCtrl: LoadingController,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.geolocate();
    this.resetForm();

    this.subscription = this.store.select('user').subscribe(
      userState => {
        this.userState = userState.user;
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  async submitCreateRoomForm() {

    const loading = await this.loadingCtrl.create({
      message: 'Please wait...',
    });

    await loading.present();

    this._roomService.newRoom( this.newRoom )
      .subscribe(
        async (resp) => {
          await loading.dismiss();
          (await this.toastCtrl.create({
            duration: 3000,
            position: 'bottom',
            message: 'Room created!'
          })).present();
          this.userState.rooms.push(resp.id);
          this.changeUserState({});
          this.navCtrl.navigateBack(['/home/rooms']);
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

  resetForm() {
    this.newRoom = {
      name: '',
      description: '',
      image: '../../../../assets/images/default-image.jpg', // mirar lo de la imagen
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

  geolocate() {
    this.geolocation.getCurrentPosition().then((data) => {
      this.logguedUser.lat = data.coords.latitude;
      this.logguedUser.lng = data.coords.longitude;
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  changeUserState(value) {
    const newUserState: IUser = {...this.userState};
    this.store.dispatch( new fromActions.SetUser(newUserState) );
  }

}
