import { Component, OnInit } from '@angular/core';
import { AutenticacionService } from '../../servicios/autenticacion.service';

@Component({
  selector: 'app-travel',
  templateUrl: './travel.page.html',
  styleUrls: ['./travel.page.scss'],
})
export class TravelPage implements OnInit {

  constructor(private auth: AutenticacionService ) {}

  public user = {
    usuario: ""
  }

  ngOnInit() {
    this.user = {
      usuario: this.auth.username
    }
  }

  volver(): string {
    return '/passenger';
  }
}
