import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PassengerPage } from './passenger.page';

const routes: Routes = [
  {
    path: '',
    component: PassengerPage
  },
  {
    path: 'travel',
    loadChildren: () => import('./travel/travel.module').then( m => m.TravelPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PassengerPageRoutingModule {}
