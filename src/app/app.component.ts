import { Component } from '@angular/core';

import { Platform, ModalController, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { myEnterAnimation } from './animations/modal-animations/enter';
import { myLeaveAnimation } from './animations/modal-animations/leave';
import { ShowImageComponent } from './shared/modals/show-image/show-image.component';
import { AuthService } from './services/auth-service/auth.service';
import { Store } from '@ngrx/store';
import { AppState } from './store/app.reducer';
import * as fromActions from './store/actions';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  menuDisabled = true;
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
    private store: Store<AppState>
  ) {
    this.initializeApp();
    this._authService.loginChange$.subscribe(
      loggued => {

        this.menuDisabled = !loggued;

        if (loggued) {
          this.store.dispatch( new fromActions.LoadLogguedUser() );
          this.store.dispatch( new fromActions.LoadSettingsMine() );
        }
      }
    );
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  async logout() {
    await this._authService.logout();
    this.nav.navigateRoot(['/auth/login']);
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
}
