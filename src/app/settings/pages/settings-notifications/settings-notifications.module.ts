import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SettingsNotificationsPage } from './settings-notifications.page';

const routes: Routes = [
  { path: '', component: SettingsNotificationsPage },
  { path: 'private-chats', loadChildren: './private-notifications/private-notifications.module#PrivateNotificationsPageModule' },
  { path: 'rooms', loadChildren: './rooms-notifications/rooms-notifications.module#RoomsNotificationsPageModule' },
  { path: 'choose-exception', loadChildren: './choose-exception/choose-exception.module#ChooseExceptionPageModule' }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SettingsNotificationsPage]
})
export class SettingsNotificationsPageModule {}
