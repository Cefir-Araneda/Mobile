import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.page.html',
  styleUrls: ['./forgot.page.scss'],
})
export class ForgotPage implements OnInit {

  constructor(private router: Router) { }
  public mensaje = ""
  
  ngOnInit() {
  }

  
  user = {
    usuario: "",
    password: ""
  }

  enviarInformacion() {
    if (this.user.usuario) {
      let navigationExtras: NavigationExtras = {
        state: { user: this.user }
      }
      this.mensaje = "Contraseña reestablecida"
      this.router.navigate(['/login'], navigationExtras);
    } else {
      this.mensaje = "Complete el campo por favor";
      this.router.navigate(['/forgot']);
    }
  }
}
