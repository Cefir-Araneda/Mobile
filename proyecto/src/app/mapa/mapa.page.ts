import { Component, OnInit } from '@angular/core';
import { AutenticacionService } from '../servicios/autenticacion.service';
import { Geolocation } from '@capacitor/geolocation';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
})
export class MapaPage implements OnInit {

  constructor(private auth: AutenticacionService) { }
  public user = {
    usuario: ""
  }

  ngOnInit() {
    this.user = {
      usuario: this.auth.username
    }
  }

  async printCurrentPosition() {
    try {
      const coordinates = await Geolocation.getCurrentPosition();
      const { latitude, longitude } = coordinates.coords;
      const latitud = document.getElementById('latitud');
      const longitud = document.getElementById('longitud');
  
      if (latitud !== null && longitud !== null) {
        latitud.innerHTML = `${latitude}`;
        longitud.innerHTML = `${longitude}`;
      } else {
        console.error('Elemento con el ID "latitud" o "longitud" no encontrado en el DOM');
      }
    } catch (error) {
      console.error('Error al obtener la posición actual', error);
    }
  }
}
  