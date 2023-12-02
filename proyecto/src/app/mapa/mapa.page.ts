import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AutenticacionService } from '../servicios/autenticacion.service';
import { Geolocation } from '@capacitor/geolocation';

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

  map: google.maps.Map | null = null;
  originMarker: google.maps.Marker | null = null; // Marcador inicial llamado "Origen"
  currentMarker: google.maps.Marker | null = null; // Nueva línea para mantener la referencia al marcador actual

  public latitude = 0;
  public longitude = 0;

  directionsService = new google.maps.DirectionsService();
  directionsDisplay = new google.maps.DirectionsRenderer();

  ngOnInit() {
    this.user = {
      usuario: this.auth.username
    };
    this.printCurrentPosition();
    console.log("Esto funciona");
  }

  async printCurrentPosition() {
    try {
      const coordinates = await Geolocation.getCurrentPosition();
      const { latitude, longitude } = coordinates.coords;
      this.latitude = latitude;
      this.longitude = longitude;

      this.loadMap();
    } catch (error) {
      console.error('Error al obtener la posición actual', error);
    }
  }

  loadMap() {
    const mapEle: HTMLElement | null = document.getElementById('map');
    if (mapEle) {
      this.map = new google.maps.Map(mapEle, {
        center: { lat: this.latitude, lng: this.longitude },
        zoom: 17,
      });

      this.originMarker = new google.maps.Marker({
        position: { lat: this.latitude, lng: this.longitude },
        title: 'Origen',
        map: this.map,
      });

      this.directionsDisplay.setMap(this.map);

      // Añadir evento de clic al mapa
      google.maps.event.addListener(this.map, 'click', (event: any) => {
        this.addMarker(event.latLng);
      });

      google.maps.event.addListenerOnce(this.map, 'idle', () => {
        mapEle.classList.add('show-map');
        // Puedes agregar otras acciones después de que el mapa se haya cargado completamente.
      });
    } else {
      console.error('Elemento con el ID "map" no encontrado en el DOM');
    }
  }

  addMarker(location: google.maps.LatLng) {
    // Eliminar el marcador actual (excepto el marcador "Origen")
    if (this.currentMarker && this.currentMarker !== this.originMarker) {
      this.currentMarker.setMap(null);
    }

    // Agregar el nuevo marcador
    this.currentMarker = new google.maps.Marker({
      position: location,
      map: this.map,
      title: 'Nuevo Marcador',
    });

    // Calcular la ruta con el nuevo marcador
    this.calculateRoute();
  }

  private calculateRoute() {
    if (this.originMarker && this.currentMarker) {
      const origin = this.originMarker.getPosition() as google.maps.LatLng;
      const destination = this.currentMarker.getPosition() as google.maps.LatLng;
  
      this.directionsService.route({
        origin: origin,
        destination: destination,
        travelMode: google.maps.TravelMode.DRIVING,
      }, (response: any, status: string) => {
        if (status === google.maps.DirectionsStatus.OK) {
          this.directionsDisplay.setDirections(response);
        } else {
          alert('Could not display directions due to: ' + status);
        }
      });
    }
  }
}
