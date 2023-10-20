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

  public viaje = {
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

  add() {
    console.log(this.viaje);
    this.api.createPost(this.viaje).subscribe((success) => {
      this.datosAPI = "Agregado con Exito  ";
      console.log("Funciono")
    }, (err) => {
      console.error(err);
    })
  }

  volver(): string {
    return '/home';
  }
}
