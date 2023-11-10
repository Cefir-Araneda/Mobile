import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/servicios/api.service';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.page.html',
  styleUrls: ['./forgot.page.scss'],
})
export class ForgotPage implements OnInit {

  constructor(private router: Router, private api: ApiService) { }
  public mensaje = ""
  public estado: String = "";

  public alertButtons = ['Ok'];

  public credentials = {
    username: ""
  }

  ngOnInit() {
  }

  cancel() {
    this.router.navigate(['/login'],);
  }

  confirm() {
    this.estado = "";
    this.mensaje = "";

    if (this.credentials.username === '') {
      console.log("Por favor ingrese un nombre de usuario");
      this.mensaje = "Por favor ingrese un nombre de usuario";
    } else {
      // Verificar si el usuario existe
      this.api.getPostsL().subscribe(
        (users) => {
          const existeUsuario = users.find((user: any) => user.username === this.credentials.username);
          if (existeUsuario) {
            // El usuario existe, obtenenemos ID y eliminamos
            const Id = existeUsuario.id; 
            this.api.deletePostL(Id).subscribe(
              (success) => {
                console.log("Se borró :D");
                this.mensaje = "Usuario eliminado, puede registrarse nuevamente";
                {
                setTimeout(() => {
                  this.mensaje = "";
                  this.router.navigate(['/login']);
                }, 2500);
              }
              },
              (err) => {
                console.error(err);
              }
            );
            setTimeout(() => {
            }, 3000);
          } else {
            console.log("Nombre de usuario no existe");
            this.mensaje = "Usuario inexistente";
            setTimeout(() => {
              this.mensaje = "";
            }, 2500);
          }
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }
}