import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoomDetailsResolverService } from './resolvers/room-details-resolver.service';

const routes: Routes = [
    {
        path: 'details/:id',
        loadChildren: './pages/rooms-details/rooms-details.module#RoomsDetailsPageModule',
        resolve: { room: RoomDetailsResolverService }
    },
    {
        path: 'map/:id',
        loadChildren: './../home/pages/home-tabs/events-location/events-location.module#EventsLocationPageModule',
        resolve: { room: RoomDetailsResolverService }
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