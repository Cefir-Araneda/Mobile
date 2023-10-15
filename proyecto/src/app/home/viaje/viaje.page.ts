import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { AutenticacionService } from '../../servicios/autenticacion.service';

@Component({
  selector: 'app-viaje',
  templateUrl: './viaje.page.html',
  styleUrls: ['./viaje.page.scss'],
})
export class ViajePage implements OnInit {

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
  
  volver(): string {
    return '/home';
  }
}
