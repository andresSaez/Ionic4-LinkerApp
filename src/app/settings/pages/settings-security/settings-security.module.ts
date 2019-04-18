import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SettingsSecurityPage } from './settings-security.page';
import { EliminateAccountComponent } from './modals/eliminate-account/eliminate-account.component';

const routes: Routes = [
  {
    path: '',
    component: SettingsSecurityPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SettingsSecurityPage, EliminateAccountComponent ],
  entryComponents: [ EliminateAccountComponent ]
})
export class SettingsSecurityPageModule {}
