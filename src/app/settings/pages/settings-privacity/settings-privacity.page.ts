import { Component, OnInit, OnDestroy } from '@angular/core';
import { ISettings } from 'src/app/interfaces/i-settings.interface';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/store/app.reducer';
import { Store } from '@ngrx/store';
import * as fromActions from '../../../store/actions';

@Component({
  selector: 'app-settings-privacity',
  templateUrl: './settings-privacity.page.html',
  styleUrls: ['./settings-privacity.page.scss'],
})
export class SettingsPrivacityPage implements OnInit, OnDestroy {
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

}
