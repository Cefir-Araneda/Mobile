import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/servicios/api.service';
import { AutenticacionService } from '../../servicios/autenticacion.service';

interface dataAPI {
  id: Number,
  inicio: String,
  termino: String,
  capacidad: Number,
  costo: Number,
  email: String
}

@Component({
  selector: 'app-travel',
  templateUrl: './travel.page.html',
  styleUrls: ['./travel.page.scss'],
})
export class TravelPage implements OnInit {
  
  viajes: dataAPI[] = [];
  
  constructor(private auth: AutenticacionService, private api: ApiService) { }

  public user = {
    usuario: ""
  };

  public datosAPI = "";

  public viaje = {
    id: 0,
    inicio: "",
    termino: "",
    capacidad: 0,
    costo: 0,
    email: ""
  }
  viajeSeleccionado: any;
  
  ngOnInit() {
    this.user = {
      usuario: this.auth.username
    };
    this.cargarViajes();
  }
  
  cargarViajes() {
    this.api.getPosts().subscribe(
      (data: dataAPI[]) => {
        this.viajes = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  volver(): string {
    return '/passenger';
  }
}
