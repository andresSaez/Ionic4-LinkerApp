import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { RoomsDetailsPage } from './rooms-details.page';

const routes: Routes = [
  {
    path: '',
    component: RoomsDetailsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [RoomsDetailsPage]
})
export class RoomsDetailsPageModule {}