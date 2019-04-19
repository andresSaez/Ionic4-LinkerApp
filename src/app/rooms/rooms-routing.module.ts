import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        path: 'details',
        loadChildren: './pages/rooms-details/rooms-details.module#RoomsDetailsPageModule'
    },
    {
        path: 'create',
        loadChildren: './pages/rooms-create/rooms-create.module#RoomsCreatePageModule'
    },
    {
        path: 'home',
        loadChildren: './pages/rooms-home/rooms-home.module#RoomsHomePageModule'
    },
    {
        path: '',
        loadChildren: './pages/rooms-home/rooms-home.module#RoomsHomePageModule',
        pathMatch: 'full'
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoomsRoutingModule { }