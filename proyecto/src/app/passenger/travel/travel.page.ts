import { Component, OnInit } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { ApiService } from 'src/app/servicios/api.service';
import { AutenticacionService } from '../../servicios/autenticacion.service';

interface dataAPI {
  id: String,
  chofer: String
  inicio: String,
  termino: String,
  capacidad: Number,
  costo: Number,
  emails: string[];
}

@Component({
  selector: 'app-travel',
  templateUrl: './travel.page.html',
  styleUrls: ['./travel.page.scss'],
})
export class TravelPage implements OnInit {
  //Creamos Encabezado
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    })
  }

  viajes: dataAPI[] = [];

  constructor(private auth: AutenticacionService, private api: ApiService) { }
  public mensaje = ""
  public user = {
    usuario: ""
  };

  public datosAPI = "";

  public emails= []

  viajeSeleccionado: any;
  nuevoEmail: string = "";

  ngOnInit() {
    this.user = {
      usuario: this.auth.username
    };
    this.cargarViajes();
  }

  cargarViajes() {
    this.api.listTravels().subscribe(
      (data: dataAPI[]) => {
        this.viajes = data;
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  reserva() {
    if (this.viajeSeleccionado && this.viajeSeleccionado.emails) {
      if (this.nuevoEmail !== '') {
        this.api.getTravel(this.viajeSeleccionado.id).subscribe(
          (success: any) => {
            if (this.viajeSeleccionado.emails.length === this.viajeSeleccionado.capacidad) {
              this.mensaje = "No puede reservar, auto con capacidad máxima";
              setTimeout(() => {
                this.mensaje = "";
              }, 3000);
            } else {
              this.viajeSeleccionado.emails.push(this.nuevoEmail);
              console.log(this.viajeSeleccionado.emails)
              this.api.updateTravel(this.viajeSeleccionado.id, this.viajeSeleccionado).subscribe(
                (success: any) => {
                  this.mensaje = "Reserva realizada";
                  console.log("Viaje actualizado con nuevo email");
                },
                (error: any) => {
                  console.error(error);
                }
              );
            }
          }
        );
      } else {
        this.mensaje = "No puede reservar sin escribir su correo";
        setTimeout(() => {
          this.mensaje = "";
        }, 2000);
      }
    } else {
      this.mensaje = "Debe seleccionar algún viaje";
      console.log('Viaje no seleccionado');
      setTimeout(() => {
        this.mensaje = "";
      }, 2000);
    }
  }


  volver(): string {
    return '/passenger';
  }
}
