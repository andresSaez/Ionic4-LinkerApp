import { Component, OnInit } from '@angular/core';

import { Platform, ModalController, NavController, ToastController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { myEnterAnimation } from './animations/modal-animations/enter';
import { myLeaveAnimation } from './animations/modal-animations/leave';
import { ShowImageComponent } from './shared/modals/show-image/show-image.component';
import { AuthService } from './services/auth-service/auth.service';
import { Store } from '@ngrx/store';
import { AppState } from './store/app.reducer';
import * as fromActions from './store/actions';
import { Subscription } from 'rxjs';
import { OneSignal } from '@ionic-native/onesignal/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {
  menuDisabled = true;
  subscription: Subscription = new Subscription();
  avatar = '';
  loaded = false;
  usersState: any;

  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Profile',
      url: '/users/profile',
      icon: 'person'
    },
    {
      title: 'Search room',
      url: '/rooms',
      icon: 'chatboxes'
    },
    {
      title: 'Settings',
      url: '/settings',
      icon: 'settings'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private modalCtrl: ModalController,
    private _authService: AuthService,
    private nav: NavController,
    private oneSignal: OneSignal,
    private toastCtrl: ToastController,
    private store: Store<AppState>
  ) {
    this.initializeApp();
    this._authService.loginChange$.subscribe(
      loggued => {

        this.menuDisabled = !loggued;

        if (loggued) {
          this.store.dispatch( new fromActions.LoadLogguedUser() );
          this.store.dispatch( new fromActions.LoadSettingsMine() );
          this.store.dispatch( new fromActions.LoadRoomsMine() );
        }
      }
    );
  }

  ngOnInit() {
    this.subscription = this.store.select('user').subscribe(
      userState => {
        this.loaded = userState.loaded;
        this.usersState = userState;
      }
    );
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this.oneSignal.startInit('ea9a1f32-879f-4c2a-8e35-f4123c5b06c0', '990723395777');
      this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.None);

      this.oneSignal.handleNotificationOpened().subscribe(
        notif => {
          if (notif.notification.payload.additionalData.proomId) {
            console.log(notif.notification.payload.additionalData.proomId);
            this.nav.navigateForward([`/chat/private/${notif.notification.payload.additionalData.proomId}`]);
          }
        }
      );
      this.oneSignal.handleNotificationReceived().subscribe(
        async notif => {
          console.log('estoy en handleReceived:' + notif);
          if (!notif.shown) { // The user did not see the notification
            const toast = await this.toastCtrl.create({
              duration: 2000,
              position: 'bottom',
              message: notif.payload.title
            });
            toast.present();
          }
        }
      );
      this.oneSignal.endInit();
    });
  }

  async logout() {
    await this._authService.logout();
    this.nav.navigateRoot(['/auth/login']);
  }

  async showImage() {
    const modal = await this.modalCtrl.create({
      component: ShowImageComponent,
      componentProps: { image: this.usersState.user.avatar },
      // cssClass: ['custom-modal', 'eliminate-account-modal'],
      showBackdrop: true,
      backdropDismiss: false,
      enterAnimation: myEnterAnimation,
      leaveAnimation: myLeaveAnimation
    });

    await modal.present();
  }
}
