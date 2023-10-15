import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { AutenticacionService } from '../../servicios/autenticacion.service';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.page.html',
  styleUrls: ['./forgot.page.scss'],
})
export class ForgotPage implements OnInit {

  constructor(private router: Router, private auth: AutenticacionService) { }
  public mensaje = ""
  public estado: String = "";
  
  public alertButtons = ['Ok'];

  ngOnInit() {
  }

  
  user = {
    usuario: "",
    password: ""
  }

  cancel() {
    this.router.navigate(['/login'],);
  }

  confirm() {
    this.estado = "";
    this.mensaje = "";
    if(this.user.usuario == ''){
      console.log("Por favor ingrese un nombre de usuario");
      this.mensaje = "Por favor ingrese un nombre de usuario";
    } 
    else {
      this.auth.delete(this.user.usuario).then((res) => {
      if (res) {
        this.mensaje = "Usuario no encontrado";
      } 
      else {
        this.mensaje = "Usuario eliminado correctamente, ya puede registrarse de nuevo";
        setTimeout(() => {
          this.router.navigate(['/login'],);
        }, 3000);    
      }
    })
    }
  }
}