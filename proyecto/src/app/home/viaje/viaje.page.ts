import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/servicios/api.service';
import { Router } from '@angular/router';
import { AutenticacionService } from '../../servicios/autenticacion.service';

interface dataAPI {
  id: Number,
  chofer: String,
  inicio: String,
  termino: String,
  capacidad: Number,
  costo: Number,
  emails: String
}

@Component({
  selector: 'app-viaje',
  templateUrl: './viaje.page.html',
  styleUrls: ['./viaje.page.scss'],
})
export class ViajePage implements OnInit {

  constructor(private auth: AutenticacionService, private api: ApiService,private router: Router) { }
  public mensaje = ""
  public user = {
    usuario: ""
  }

  public datosAPI = "";

  public viaje = {
    id: 0,
    chofer:"",
    inicio: "",
    termino: "",
    capacidad: 0,
    costo: 0,
    emails: []
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
        this.datosAPI += tmp.chofer + "\n";
        this.datosAPI += tmp.inicio + "\n";
        this.datosAPI += tmp.termino + "\n";
        this.datosAPI += tmp.capacidad + "\n";
        this.datosAPI += tmp.costo + "\n";
        this.datosAPI += tmp.emails + "\n";
      });
    }, (error) => {
      console.log(error);
    })
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
    }
    else if (this.viaje.capacidad > capacidadMaxima) {
      this.mensaje = "Excede capacidad maxima"
      console.log("Excede capacidad maxima")
      setTimeout(() => {
        this.mensaje = "";
      }, 2000);
    }
  
    else if (this.viaje.costo > valorMaximo) {
      this.mensaje = "Excede valor de costo maximo"
      console.log("Excede valor de costo maximo")
      setTimeout(() => {
        this.mensaje = "";
      }, 2000);
    }
    else {
      this.viaje.chofer = this.auth.username
      this.api.createPost(this.viaje).subscribe((success) => {
        this.datosAPI = "Agregado con Exito  ";
        this.mensaje = "Ruta guardada con exito"
        console.log("Funciono")
        console.log(this.viaje);
        setTimeout(() => {
          this.mensaje = "";
          this.router.navigate(['/home']);
        }, 2500);
      }, (err) => {
        console.error(err);
      })
    }
  }
  volver(): string {
    return '/home';
  }
}
