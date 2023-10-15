import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular'

interface User {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})

export class AutenticacionService {
  public mensaje = ""
  public autenticado!: boolean;
  public username: string = '';
  private local!: Storage;

  constructor(private storage: Storage, private route: Router) {
    this.init()
  }
  async init() {
    const storage = await this.storage.create();
    this.local = storage;

  }

  async register(username: string, password: string): Promise<Boolean> {
    const users = await this.local?.get('users') || [];
    const existe = users.find((us: User) => us.username === username);
    console.log(users)
    if (existe) {
      console.log("Usuario existente")
      return false; 
      }
    else{
      const nuevo: User = { username, password };
      users.push(nuevo);
      await this.local.set('users', users);
      console.log("Registro Exitoso")
      return true;
    }
  }

  async delete(username: string): Promise<boolean> {
    const users: User[] = (await this.local.get('users')) || [];
    const index = users.findIndex((us: User) => us.username === username);
    console.log(users)
    if (index !== -1) {
      users.splice(index, 1);
      await this.local.set('users', users);
      console.log('Usuario eliminado correctamente, ya puede registrarse de nuevo');
      return false;
    } else {
      console.log("Usuario no encontrado")
      return true;
    }

  }

  async login(username: string, password: string): Promise<boolean> {
    const users: User[] = (await this.local.get('users')) || [];
    const user = users.find((us: User) => us.username === username && us.password === password);
    console.log(users)
    if (user) {
      this.autenticado = true;
      this.username = username;
      return true;
    }
    this.autenticado = false;
    return false;

  }

  logout() {
    this.autenticado = false;
    this.username = '';
    this.route.navigate(['/login']);
  }
}
