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
  },
  { path: 'edit-profile', loadChildren: './pages/edit-profile/edit-profile.module#EditProfilePageModule' }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }