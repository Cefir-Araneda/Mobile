import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { AutenticacionService } from '../servicios/autenticacion.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

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

  viaje() {
    this.router.navigate(['/viaje']);
  }

  volver(): string {
    return '/login';
  }
}

