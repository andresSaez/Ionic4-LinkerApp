import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { RoomsHomePage } from './rooms-home.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { RoomSlideItemComponent } from '../../components/room-slide-item/room-slide-item.component';

const routes: Routes = [
  {
    path: '',
    component: RoomsHomePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  declarations: [RoomsHomePage, RoomSlideItemComponent]
})
export class RoomsHomePageModule {}
