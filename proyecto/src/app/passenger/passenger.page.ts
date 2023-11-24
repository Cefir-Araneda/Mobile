import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AutenticacionService } from '../servicios/autenticacion.service';

@Component({
  selector: 'app-passenger',
  templateUrl: './passenger.page.html',
  styleUrls: ['./passenger.page.scss'],
})
export class PassengerPage implements OnInit {

  constructor(private router: Router, private auth: AutenticacionService) { }
  public mensaje = ""
  public user = {
    usuario: ""
  }

  ngOnInit() {
    this.user = {
      usuario: this.auth.username
    }
  }

  buscar() {
    this.router.navigate(['/travel']);
  }

  volver(): string {
    return '/login';
  }
}
