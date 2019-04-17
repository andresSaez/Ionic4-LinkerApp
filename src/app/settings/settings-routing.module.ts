import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: './pages/settings-home/settings-home.module#SettingsHomePageModule',
  },
  {
    path: '',
    loadChildren: './pages/settings-home/settings-home.module#SettingsHomePageModule',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }