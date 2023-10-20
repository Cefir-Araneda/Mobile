import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/servicios/api.service';
import { AutenticacionService } from '../../servicios/autenticacion.service';

interface dataAPI {
  id: Number,
  inicio: String,
  termino: String,
  capacidad: Number,
  costo: Number
}

@Component({
  selector: 'app-viaje',
  templateUrl: './viaje.page.html',
  styleUrls: ['./viaje.page.scss'],
})
export class ViajePage implements OnInit {

  constructor(private router: Router, private auth: AutenticacionService, private api: ApiService) { }
  public mensaje = ""
  public user = {
    usuario: ""
  }

  public datosAPI = "";

  public post = {
    id: 0,
    inicio: "",
    termino: "",
    capacidad: 0,
    costo: 0
  }

  ngOnInit() {
    this.user = {
      usuario: this.auth.username
    }
  }

  //viajar(){}
  obtenerTodo() {
    this.datosAPI = ""
    this.api.getPosts().subscribe((res) => {
      console.log(res);
      res.forEach((tmp: dataAPI) => {
        this.datosAPI += tmp.id + "\n";
        this.datosAPI += tmp.inicio + "\n";
        this.datosAPI += tmp.termino + "\n";
        this.datosAPI += tmp.capacidad + "\n";
        this.datosAPI += tmp.costo + "\n";
      });
    }, (error) => {
      console.log(error);
    })
  }

  volver(): string {
    return '/home';
  }
}
