import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/servicios/api.service';

@Injectable({
  providedIn: 'root'
})

export class AutenticacionService {
  public mensaje = ""
  public autenticado!: boolean;
  public username: string = '';

  constructor(private api: ApiService, private route: Router) {
  }

  async verificarCredenciales(username: string, password: string): Promise<boolean> {
    try {
      const usuarioAutenticado = await this.api.verificarCredenciales(username, password);
      if (usuarioAutenticado) {
        this.autenticado = true;
        this.username = username;
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  logout() {
    this.autenticado = false;
    this.username = '';
    this.route.navigate(['/login']);
  }
}
