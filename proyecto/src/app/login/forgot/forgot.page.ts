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
    username: "",
    password: "",
    rol: ""
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
    } else if (this.credentials.password === '') {
      console.log("Por favor ingrese contraseña");
      this.mensaje = "Por favor ingrese contraseña";
    } else if (this.credentials.password.length < 8) {
      console.log("Contraseña con menos de 8 caracteres");
      this.mensaje = "Contraseña con menos de 8 caracteres";
      setTimeout(() => {
        this.mensaje = "";
      }, 2500);
    }else {
      // Verificar si el usuario existe
      this.api.getPostsL().subscribe(
        (users) => {
          const existeUsuario = users.find((user: any) => user.username === this.credentials.username);
          if (existeUsuario) {
            // El usuario existe, obtenenemos ID y updateamos
            const Id = existeUsuario.id;
            this.credentials.rol = existeUsuario.rol
            this.api.getPostL(Id)
            this.api.updatePostL(Id,this.credentials).subscribe(
              (success) => {
                console.log("Se cambió :D");
                this.mensaje = "Usuario actualizado correctamente, ya puede ingresar nuevamente";
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