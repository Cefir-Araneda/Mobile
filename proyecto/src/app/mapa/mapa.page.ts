import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
})
export class MapaPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  
  async printCurrentPosition() {
    try {
      const coordinates = await Geolocation.getCurrentPosition();
      console.log('Posición actual:', coordinates);
    } catch (error) {
      console.error('Error al obtener la posición actual', error);
    }
  }


}
