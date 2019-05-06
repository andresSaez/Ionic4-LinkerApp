import { Component, OnInit, AfterViewInit, ViewChild, OnDestroy } from '@angular/core';
import { IRoom } from 'src/app/interfaces/i-room.interface';
import { IUser } from 'src/app/interfaces/i-user.interface';
import { MapComponent } from 'ngx-mapbox-gl';
import { Subscription } from 'rxjs';
import { NavController, LoadingController, ToastController, AlertController, IonRouterOutlet } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import { RoomService } from 'src/app/services/room-service/room.service';
import * as fromActions from '../../../../store/actions';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-events-location',
  templateUrl: './events-location.page.html',
  styleUrls: ['./events-location.page.scss'],
})
export class EventsLocationPage implements OnInit, AfterViewInit, OnDestroy {

  zoom = 10;
  centerRoom: IRoom = null;

  rooms: IRoom[] = [];
  loguedUser: IUser;
  userState: any;
  subscription: Subscription = new Subscription();
  loadingFail = false;
  loaded = false;
  center = {
    lat: 0,
    lng: 0
  };

  // Routes Management
  routerEvents: any;
  previousUrl: string;
  currentUrl: string;
  canGoBack: boolean;

  @ViewChild(MapComponent) mapComp: MapComponent;

  constructor(
    private navCtrl: NavController,
    private router: Router,
    private ionRouterOutlet: IonRouterOutlet,
    private route: ActivatedRoute,
    // private launchNavigator: LaunchNavigator,
    private loadingCtrl: LoadingController,
    private _roomService: RoomService,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
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

    this.getRooms();

    this.centerRoom = this.route.snapshot.data.room;

    this.subscription = this.store.select('user').subscribe(
      userState => {
        this.userState = userState.user;

        if (this.centerRoom) {
          this.center = {
            lat: this.centerRoom.lat,
            lng: this.centerRoom.lng
          };
        } else {
          this.center = {
            lat: this.userState.lat,
            lng: this.userState.lng
          };
        }
      }
    );
  }

  ngAfterViewInit() {
    this.mapComp.load.subscribe(
      () => {
      this.mapComp.mapInstance.resize(); // Necessary for full height
      }
      );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.routerEvents.unsubscribe();
  }

  async getRooms() {
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...',
    });

    await loading.present();

    this._roomService.getRooms()
      .subscribe(
        async (rooms) => {
          this.loadingFail = false;
          this.loaded = true;
          await loading.dismiss();
          this.rooms = rooms;
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
         }
      );
  }

  async openAlert( room: IRoom ) {
    const alert = await this.alertCtrl.create({
      header: 'Do you want to join this room?',
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

      this._roomService.addMemberToRoom(room.id).subscribe(
        async () => {
          await loading.dismiss();
          (await this.toastCtrl.create({
            duration: 3000,
            position: 'bottom',
            message: `You have joined to ${room.name}`
          })).present();
          this.userState.rooms.push(room.id);
          this.changeUserState({});
          this.navCtrl.navigateForward(['/home/rooms']);
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

  async navigate( room: IRoom ) {
    // const options: LaunchNavigatorOptions = {};

    // await this.launchNavigator.navigate([room.lat, room.lng], options);
  }

  changeUserState(value) {
    const newUserState: IUser = {...this.userState};
    this.store.dispatch( new fromActions.SetUser(newUserState) );
  }

}
