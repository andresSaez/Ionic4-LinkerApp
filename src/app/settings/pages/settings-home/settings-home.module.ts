import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SettingsHomePage } from './settings-home.page';

const routes: Routes = [
    { path: '', component: SettingsHomePage },
    { path: 'privacity', loadChildren: '../settings-privacity/settings-privacity.module#SettingsPrivacityPageModule' },
    { path: 'notifications', loadChildren: '../settings-notifications/settings-notifications.module#SettingsNotificationsPageModule' },
    { path: 'language', loadChildren: '../settings-language/settings-language.module#SettingsLanguagePageModule' },
    { path: 'security', loadChildren: '../settings-security/settings-security.module#SettingsSecurityPageModule' }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SettingsHomePage]
})
export class SettingsHomePageModule {}
