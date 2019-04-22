import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EventsLocationPage } from './events-location.page';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';

const routes: Routes = [
  {
    path: '',
    component: EventsLocationPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    NgxMapboxGLModule
  ],
  declarations: [EventsLocationPage]
})
export class EventsLocationPageModule {}
