import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { ViajePage } from './viaje.page';

import { ViajePageRoutingModule } from './viaje-routing.module';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViajePageRoutingModule
  ],
  declarations: [ViajePage]
})
export class ViajePageModule {}
