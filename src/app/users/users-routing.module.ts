import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileResolverService } from './resolvers/profile-resolver/profile-resolver.service';
import { resolve } from 'url';

const routes: Routes = [
  {
    path: 'profile/:id',
    loadChildren: './pages/user-profile/user-profile.module#UserProfilePageModule',
    resolve: { user: ProfileResolverService }
  },
  {
    path: 'profile',
    loadChildren: './pages/user-profile/user-profile.module#UserProfilePageModule',
    resolve: { user: ProfileResolverService }
  },
  { path: 'edit-profile',
    loadChildren: './pages/edit-profile/edit-profile.module#EditProfilePageModule',
    resolve: { user: ProfileResolverService }
  },
  { path: 'my-contacts', loadChildren: './pages/my-contacts/my-contacts.module#MyContactsPageModule' }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }