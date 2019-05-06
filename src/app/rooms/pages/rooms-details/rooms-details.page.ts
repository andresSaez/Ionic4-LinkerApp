import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavController, ModalController, ActionSheetController,
  LoadingController, AlertController, ToastController, IonRouterOutlet } from '@ionic/angular';
import { ShowImageComponent } from 'src/app/shared/modals/show-image/show-image.component';
import { myEnterAnimation } from 'src/app/animations/modal-animations/enter';
import { myLeaveAnimation } from 'src/app/animations/modal-animations/leave';
import { IRoom } from 'src/app/interfaces/i-room.interface';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { RoomService } from 'src/app/services/room-service/room.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-rooms-details',
  templateUrl: './rooms-details.page.html',
  styleUrls: ['./rooms-details.page.scss'],
})
export class RoomsDetailsPage implements OnInit, OnDestroy {

  room: IRoom;
  newImageTemp: string;
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
    private navCtrl: NavController,
    private modalCtrl: ModalController,
    private actionSheetCtrl: ActionSheetController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private camera: Camera,
    private _roomService: RoomService,
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

    this.room = this.route.snapshot.data.room;

    this.subscription = this.store.select('user').subscribe(
      userState => {
        this.userState = userState.user;
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.routerEvents.unsubscribe();
  }

  viewProfile( id: string ) {
    if (id !== this.userState.id ) {
      this.navCtrl.navigateForward(['/users/profile', id]);
    }
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

  backToChat( chatId: string ) {
    this.navCtrl.navigateBack(['/chat', chatId]);
  }

}
