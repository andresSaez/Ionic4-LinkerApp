import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/store/app.reducer';
import { Store } from '@ngrx/store';
import { ISettings } from 'src/app/interfaces/i-settings.interface';
import { LanguageOptions } from '../../../enums/language-options.enum';
import * as fromActions from '../../../store/actions';

@Component({
  selector: 'app-settings-language',
  templateUrl: './settings-language.page.html',
  styleUrls: ['./settings-language.page.scss'],
})
export class SettingsLanguagePage implements OnInit, OnDestroy {
  settings: ISettings;

  lang = 'ENG';

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

  changeSettings() {
    console.log(this.settings.language);
    console.log('object');
    // const newSettings: ISettings = {...this.settings};
    // this.store.dispatch( new fromActions.SetSettings(newSettings) );
  }

}
