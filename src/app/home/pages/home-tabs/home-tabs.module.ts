import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { HomeTabsPage } from './home-tabs.page';

const routes: Routes = [
  {
    path: '',
    component: HomeTabsPage,
    children: [
      { path: 'rooms', loadChildren: './public-rooms/public-rooms.module#PublicRoomsPageModule' },
      { path: 'private-rooms', loadChildren: './private-rooms/private-rooms.module#PrivateRoomsPageModule' },
      { path: 'events-location', loadChildren: './events-location/events-location.module#EventsLocationPageModule' },
      { path: '', pathMatch: 'full', redirectTo: 'rooms'}
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [HomeTabsPage]
})
export class HomeTabsPageModule {}
