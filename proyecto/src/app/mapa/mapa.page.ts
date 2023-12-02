import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AutenticacionService } from '../servicios/autenticacion.service';
import { Geolocation } from '@capacitor/geolocation';
import { GoogleMap } from '@capacitor/google-maps';
import { Capacitor } from '@capacitor/core';

declare var google: any;

interface Marker {
  position: {
    lat: number,
    lng: number,
  };
  title: string;
}

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
})
export class MapaPage implements OnInit {
  @ViewChild('map') mapRef!: ElementRef<HTMLElement>;
  constructor(private auth: AutenticacionService) { }
  public user = {
    usuario: ""
  }

  map = null;

  public latitude = 0;
  public longitude = 0;

  directionsService = new google.maps.DirectionsService();
  directionsDisplay = new google.maps.DirectionsRenderer();

  // Ubicacion Actual
  origin = { lat: this.latitude, lng: this.longitude };

  // Parque la 93
  destination = { lat: 4.676802158355713, lng: -74.04825592041016 };

  ngOnInit() {
    this.user = {
      usuario: this.auth.username
    };
    this.printCurrentPosition(); // Llama a la función para obtener la posición al inicio
    console.log("Esto funca");
  }

  async printCurrentPosition() {
    try {
      const coordinates = await Geolocation.getCurrentPosition();
      const { latitude, longitude } = coordinates.coords;
      this.latitude = latitude;
      this.longitude = longitude;

    // Una vez que obtengas las coordenadas, llama a loadMap()
    this.loadMap();
  } catch(error) {
    console.error('Error al obtener la posición actual', error);
  }
}

loadMap() {
  const mapEle: HTMLElement | null = document.getElementById('map');
  if (mapEle) {
    this.map = new google.maps.Map(mapEle, {
      center: { lat: this.latitude, lng: this.longitude },
      zoom: 12
    });
    const marker = {
      position: {
        lat: this.latitude,
        lng: this.longitude
      },
      title: 'Origen'
    };
    this.addMarker(marker);

    this.directionsDisplay.setMap(this.map);

    google.maps.event.addListenerOnce(this.map, 'idle', () => {
      mapEle.classList.add('show-map');
      this.calculateRoute();
    });
  } else {
    console.error('Elemento con el ID "map" no encontrado en el DOM');
  }
}


  private calculateRoute() {
  this.directionsService.route({
    origin: this.origin,
    destination: this.destination,
    travelMode: google.maps.TravelMode.DRIVING,
  }, (response: any, status: string) => {
    if (status === google.maps.DirectionsStatus.OK) {
      this.directionsDisplay.setDirections(response);
    } else {
      alert('Could not display directions due to: ' + status);
    }
  });
}

addMarker(marker: Marker) {
  return new google.maps.Marker({
    position: marker.position,
    map: this.map,
    title: marker.title
  });
}
}
