import { Component, ViewChild, ElementRef } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { IonCard, AnimationController, IonModal } from '@ionic/angular';
import { ApiService } from 'src/app/servicios/api.service';
import type { Animation } from '@ionic/angular';
import { AutenticacionService } from '../servicios/autenticacion.service';

interface login {
  username: String,
  password: String
  //,rol: String,
}

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  @ViewChild(IonCard, { read: ElementRef }) card!: ElementRef<HTMLIonCardElement>;

  @ViewChild(IonModal) modal!: IonModal;

  private animation!: Animation;
  constructor(private router: Router, private animationCtrl: AnimationController, private auth: AutenticacionService, private api: ApiService) { }
  public mensaje = ""
  public estado: String = "";

  public alertButtons = ['Ok'];

  public datosAPI = "";

  public credentials = {
    user: "",
    pass: ""
    //,rol: ""
  }

  ngAfterViewInit() {
    this.animation = this.animationCtrl
      .create()
      .addElement(this.card.nativeElement)
      .duration(1500)
      .iterations(Infinity)
      .direction('alternate')
      .fromTo('background', '#3AAFB9', 'var(--background)');
    this.animation.play()
  }

  //user = {
  //usuario: "",
  //password: ""
  //}

  enviarInformacion() {
    this.auth.verificarCredenciales(this.credentials.user, this.credentials.pass).then(() => {
      if (this.auth.autenticado) {
        const navigationExtras: NavigationExtras = {
          state: { user: this.credentials }
        };
        this.router.navigate(['/home'], navigationExtras);
      } else {
        if (this.credentials.user == '' || this.credentials.pass == '') {
          console.log("Algun campo no tiene valor");
          this.mensaje = "Algun campo no tiene valor";
        } else {
          this.mensaje = "Ingrese credenciales correctas";
        }
      }
      setTimeout(() => {
        this.mensaje = "";
      }, 5000);
    });
  }

  forgot() {
    this.router.navigate(['forgot']);
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    if (this.credentials.user == '' || this.credentials.pass == '') {
      console.log("Algun campo no tiene valor");
      this.mensaje = "Algun campo no tiene valor";
      setTimeout(() => {
        this.mensaje = "";
      }, 2500);
    }
    else if (this.credentials.pass.length < 8) {
      console.log("Contraseña con menos de 8 caracteres");
      this.mensaje = "Contraseña con menos de 8 caracteres";
      setTimeout(() => {
        this.mensaje = "";
      }, 2500);
    }
    else {
      console.log(this.credentials);
      this.api.createPostL(this.credentials).subscribe((success) => {
        this.datosAPI = "Agregado con Exito  ";
        console.log("Funciono")
      }, (err) => {
        console.error(err);
      })
      setTimeout(() => {
        this.modal.dismiss(this.credentials.user, 'confirm');
      }, 3000);
    }
    setTimeout(() => {
      this.mensaje = "";
      this.estado = "";
    }, 25000);
  }
}


