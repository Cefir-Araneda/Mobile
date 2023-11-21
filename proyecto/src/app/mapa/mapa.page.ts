import { Component, OnInit } from '@angular/core';
import { AutenticacionService } from '../servicios/autenticacion.service';
import { Geolocation } from '@capacitor/geolocation';
import { GoogleMap } from '@capacitor/google-maps';
import { Capacitor } from '@capacitor/core';

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

    if (Capacitor.isPluginAvailable('GoogleMaps')) {
      this.createGoogleMap();
      console.log("Esto funca");
      
    }
  }

  // Esto es de Maps
  async createGoogleMap() {
    const apiKey = 'AIzaSyAAaYutH33JmuJZCyAcuo33IcmxLGSWj9g';
    
    try {
      const mapRef = document.getElementById('map');
      
      if (mapRef) {
        const newMap = await GoogleMap.create({
          id: 'my-map',
          element: mapRef,
          apiKey: apiKey,
          config: {
            center: {
              lat: 33.6,
              lng: -117.9,
            },
            zoom: 8,
          },
        });
      } else {
        console.error('Elemento con el ID "map" no encontrado en el DOM');
      }
    } catch (error) {
      console.error('Error al crear el mapa', error);
    }
  }
  
  // Esto es de Geolocation
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
  