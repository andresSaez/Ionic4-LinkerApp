import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    loadChildren: './pages/home-tabs/home-tabs.module#HomeTabsPageModule',
  },
  {
    path: '',
    loadChildren: './pages/home-tabs/home-tabs.module#HomeTabsPageModule',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }