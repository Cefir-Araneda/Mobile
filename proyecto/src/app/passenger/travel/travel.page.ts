import { Component, OnInit } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { ApiService } from 'src/app/servicios/api.service';
import { AutenticacionService } from '../../servicios/autenticacion.service';
import { EmailService } from '../../servicios/mail.service';

interface dataAPI {
  id: Number,
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

  constructor(private auth: AutenticacionService, private api: ApiService,private emailService: EmailService) { }
  public mensaje = ""
  public user = {
    usuario: ""
  };

  public datosAPI = "";

  public viaje = {
    id: 0,
    chofer: "",
    inicio: "",
    termino: "",
    capacidad: 0,
    costo: 0,
    emails: []
  }

  viajeSeleccionado: any;
  nuevoEmail: string = "";

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
        this.datosAPI += tmp.emails + "\n";
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

  reserva() {
    if (this.viajeSeleccionado && this.viajeSeleccionado.emails) {
      if (this.nuevoEmail != '') {
        const viajeElegido = this.viajes.find(viaje => viaje.id === this.viajeSeleccionado.id);

        if (viajeElegido) {
          if (viajeElegido.emails.length == viajeElegido.capacidad) {
            this.mensaje = "No puede reservar, auto con capacidad máxima";
            setTimeout(() => {
              this.mensaje = "";
            }, 3000);
          } else {
            this.viajeSeleccionado.emails.push(this.nuevoEmail);

            this.api.updatePost(this.viajeSeleccionado.id, this.viajeSeleccionado).subscribe(
              (success) => {
                this.mensaje = "Reserva realizada";
                console.log("Viaje actualizado con nuevo email");
                this.enviarCorreo(
                  viajeElegido.emails,
                  'Reserva Exitosa',
                  `¡Gracias por reservar el viaje!\n\nDetalles del Viaje:\nInicio: ${viajeElegido.inicio}\nTermino: ${viajeElegido.termino}\nCosto: ${viajeElegido.costo}`,
                );
              },
              (error) => {
                console.error(error);
              }
            );
          }
        }
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

  enviarCorreo(destinatarios: string[], asunto: string, contenido: string) {
    this.emailService.sendEmail(destinatarios, asunto, contenido).subscribe(
      (response) => {
        console.log('Correo enviado con éxito:', response);
      },
      (error) => {
        console.error('Error al enviar el correo:', error);
      }
    );
  }

  volver(): string {
    return '/passenger';
  }
}
