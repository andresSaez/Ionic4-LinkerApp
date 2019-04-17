import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'profile',
    loadChildren: './pages/user-profile/user-profile.module#UserProfilePageModule'
  },
  {
    path: 'profile/:id',
    loadChildren: './pages/user-profile/user-profile.module#UserProfilePageModule'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }