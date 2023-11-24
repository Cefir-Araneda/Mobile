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
  emails: String[]
}

@Component({
  selector: 'app-viaje',
  templateUrl: './viaje.page.html',
  styleUrls: ['./viaje.page.scss'],
})
export class ViajePage implements OnInit {

  constructor(private auth: AutenticacionService, private api: ApiService, private router: Router) { }
  public mensaje = ""
  public user = {
    usuario: ""
  }

  public datosAPI = "";

  public viaje = {
    chofer: "",
    inicio: "",
    termino: "",
    capacidad: 0,
    costo: 0,
    emails: [""]
  }

  ngOnInit() {
    this.user = {
      usuario: this.auth.username
    }
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
  }
