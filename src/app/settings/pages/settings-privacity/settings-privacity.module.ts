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
  }
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
