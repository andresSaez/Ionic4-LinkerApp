import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { RoomsNotificationsPage } from './rooms-notifications.page';

const routes: Routes = [
  {
    path: '',
    component: RoomsNotificationsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [RoomsNotificationsPage]
})
export class RoomsNotificationsPageModule {}
