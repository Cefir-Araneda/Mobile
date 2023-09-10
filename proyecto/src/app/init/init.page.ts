import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-init',
  templateUrl: './init.page.html',
  styleUrls: ['./init.page.scss'],
})
export class InitPage{

  constructor(private router: Router) { }
  public mensaje = ""

  user = {
    usuario: "",
    password: ""
  }

  enviarInformacion() {
    if (this.user.usuario != "" && this.user.password != "") {
      let navigationExtras: NavigationExtras = {
        state: { user: this.user }
      }
      this.router.navigate(['/login'], navigationExtras);
    } else {
      this.mensaje = "Complete los campos por favor";
      this.router.navigate(['/home']);
    }
  }
}

