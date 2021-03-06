import { Component, OnInit, OnDestroy } from '@angular/core';
import { ISettings } from 'src/app/interfaces/i-settings.interface';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import * as fromActions from '../../../store/actions';

@Component({
  selector: 'app-settings-notifications',
  templateUrl: './settings-notifications.page.html',
  styleUrls: ['./settings-notifications.page.scss'],
})
export class SettingsNotificationsPage implements OnInit, OnDestroy {

  settings: ISettings;

  subscription: Subscription = new Subscription();

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.subscription = this.store.select('settings').subscribe(
      settingsState => {
        this.settings = settingsState.settings;
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  changeSettings(value) {
    const newSettings: ISettings = {...this.settings};
    this.store.dispatch( new fromActions.SetSettings(newSettings) );
  }

}
