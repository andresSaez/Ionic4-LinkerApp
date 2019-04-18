import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SettingsPrivacityPage } from './settings-privacity.page';

const routes: Routes = [
  {
    path: '',
    component: SettingsPrivacityPage
  },
  { path: 'blocked-users', loadChildren: './blocked-users/blocked-users.module#BlockedUsersPageModule' },
  { path: 'last-connection', loadChildren: './last-connection/last-connection.module#LastConnectionPageModule' },
  { path: 'profile-photo', loadChildren: './profile-photo/profile-photo.module#ProfilePhotoPageModule' },
  { path: 'profile-data', loadChildren: './profile-data/profile-data.module#ProfileDataPageModule' },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SettingsPrivacityPage]
})
export class SettingsPrivacityPageModule {}
