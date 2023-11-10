import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/servicios/api.service';
import { AutenticacionService } from '../../servicios/autenticacion.service';

interface dataAPI {
  id: Number,
  chofer: String
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
    chofer:"",
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

  obtenerTodo() {
    this.datosAPI = ""
    this.api.getPosts().subscribe((res) => {
      console.log(res);
      res.forEach((tmp: dataAPI) => {
        this.datosAPI += tmp.id + "\n";
        this.datosAPI += tmp.chofer + "\n";
        this.datosAPI += tmp.inicio + "\n";
        this.datosAPI += tmp.termino + "\n";
        this.datosAPI += tmp.capacidad + "\n";
        this.datosAPI += tmp.costo + "\n";
        this.datosAPI += tmp.email + "\n";
      });
    }, (error) => {
      console.log(error);
    })
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
