import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
  @ViewChild('map') mapRef!: ElementRef<HTMLElement>;
  newMap!: GoogleMap;
  constructor(private auth: AutenticacionService) { }
  public user = {
    usuario: ""
  }
  public latitude = 0;
  public longitude = 0;

  ngOnInit() {
    this.user = {
      usuario: this.auth.username
    }

  }
  ngAfterViewInit() {
    if (Capacitor.isPluginAvailable('GoogleMaps')) {
      this.createGoogleMap();
      console.log("Esto funca");

    } else {
      this.createGoogleMap();
      console.log("No funciona")
    }

  }

  // Esto es de Maps
  async createGoogleMap() {
    const apiKey = 'AIzaSyC6uufOewfJJzchCGopXNJp6bDQkksC6Vg';

    try {
      const mapRef = this.mapRef.nativeElement;
      const coordinates = await Geolocation.getCurrentPosition();
      const { latitude, longitude } = coordinates.coords;
      this.latitude = latitude;
      this.longitude = longitude; 

      if (mapRef) {
        this.newMap = await GoogleMap.create({
          id: 'my-map',
          element: mapRef,
          apiKey: apiKey,
          config: {
            center: {
              lat: this.latitude,
              lng: this.longitude,
            },
            zoom: 15,
          },
        });
        // Agregar marcador
        const markerId = await this.newMap.addMarker({
          coordinate: {
            lat: this.latitude,
            lng: this.longitude,
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
      this.latitude = latitude;
      this.longitude = longitude; 
      const latitud = document.getElementById('latitud');
      const longitud = document.getElementById('longitud');

      if (latitud !== null && longitud !== null) {
        latitud.innerHTML = `${latitude}`;
        longitud.innerHTML = `${longitude}`;
        console.log('funciona')
      } else {
        console.error('Elemento con el ID "latitud" o "longitud" no encontrado en el DOM');
      }
    } catch (error) {
      console.error('Error al obtener la posición actual', error);
    }
  }
}
