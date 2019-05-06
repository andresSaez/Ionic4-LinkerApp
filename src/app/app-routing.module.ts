import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LogoutActivateGuard } from './guards/logout-activate/logout-activate.guard';
import { LoginActivateGuard } from './guards/login-activate/login-activate.guard';

const routes: Routes = [
  { path: 'home',
  canActivate: [LoginActivateGuard],
    loadChildren: './home/home.module#HomeModule'
  },
  {
    path: 'auth',
    canActivate: [LogoutActivateGuard],
    loadChildren: './auth/auth.module#AuthModule'
  },
  {
    path: 'users',
    canActivate: [LoginActivateGuard],
    loadChildren: './users/users.module#UsersModule'
  },
  {
    path: 'settings',
    canActivate: [LoginActivateGuard],
    loadChildren: './settings/settings.module#SettingsModule'
  },
  {
    path: 'rooms',
    canActivate: [LoginActivateGuard],
    loadChildren: './rooms/rooms.module#RoomsModule'
  },
  {
    path: 'chat',
    canActivate: [LoginActivateGuard],
    loadChildren: './chat/chat.module#ChatPageModule'
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
