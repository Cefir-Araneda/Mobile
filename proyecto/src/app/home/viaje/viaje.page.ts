import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/servicios/api.service';
import { Router } from '@angular/router';
import { AutenticacionService } from '../../servicios/autenticacion.service';
import { Geolocation } from '@capacitor/geolocation';

interface dataAPI {
  id: Number,
  chofer: String,
  inicio: String,
  termino: String,
  capacidad: Number,
  costo: Number,
  emails: String[]
}

@Component({
  selector: 'app-viaje',
  templateUrl: './viaje.page.html',
  styleUrls: ['./viaje.page.scss'],
})
export class ViajePage implements OnInit {
  @ViewChild('map') mapRef!: ElementRef<HTMLElement>;
  constructor(private auth: AutenticacionService, private api: ApiService, private router: Router) { }
  public mensaje = ""
  public user = {
    usuario: ""
  }

  map: google.maps.Map | null = null;
  originMarker: google.maps.Marker | null = null; // Marcador inicial llamado "Origen"
  currentMarker: google.maps.Marker | null = null; // Nueva línea para mantener la referencia al marcador actual

  public latitude = 0;
  public longitude = 0;

  public datosAPI = "";

  public viaje = {
    chofer: "",
    inicio: "",
    termino: "",
    capacidad: 0,
    costo: 0,
    emails: []
  }

  directionsService = new google.maps.DirectionsService();
  directionsDisplay = new google.maps.DirectionsRenderer();

  ngOnInit() {
    this.user = {
      usuario: this.auth.username
    }
    this.printCurrentPosition();
    console.log("Esto funciona");
  }

  add() {
    const capacidadMaxima = 4;
    const valorMaximo = 3000;
    if (this.viaje.inicio === '' || this.viaje.termino === '') {
      console.log("Algun campo no tiene valor");
      this.mensaje = "Algun campo no tiene valor";
      setTimeout(() => {
        this.mensaje = "";
      }, 2000);
    } else if (this.viaje.capacidad > capacidadMaxima) {
      this.mensaje = "Excede capacidad máxima";
      console.log("Excede capacidad máxima");
      setTimeout(() => {
        this.mensaje = "";
      }, 2000);
    } else if (this.viaje.costo > valorMaximo) {
      this.mensaje = "Excede valor de costo máximo";
      console.log("Excede valor de costo máximo");
      setTimeout(() => {
        this.mensaje = "";
      }, 2000);
    } else {
      this.viaje.chofer = this.auth.username;
      const emailsActual = Array.isArray(this.viaje.emails) ? this.viaje.emails : [];
      const conductormail = emailsActual.concat(this.viaje.emails);
      this.viaje.emails = conductormail;

      this.api.createTravel(this.viaje).subscribe((success) => {
        this.mensaje = "Ruta guardada con éxito";
        console.log("Funcionó");
        console.log(this.viaje);
        setTimeout(() => {
          this.mensaje = "";
          this.router.navigate(['/home']);
        }, 2500);
      }, (err) => {
        console.error(err);
      });
    }
  }

  volver(): string {
    return '/home';
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
