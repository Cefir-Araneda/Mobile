import { Component,ViewChild,ElementRef} from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import {IonCard,AnimationController, IonModal } from '@ionic/angular';
import type { Animation } from '@ionic/angular';
import { AutenticacionService } from '../servicios/autenticacion.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage{
  @ViewChild(IonCard,{read:ElementRef}) card!:ElementRef<HTMLIonCardElement>;

  @ViewChild(IonModal) modal!: IonModal;

  private animation!:Animation;
  constructor(private router: Router,private animationCtrl:AnimationController, private auth: AutenticacionService) { }
  public mensaje = ""
  public estado: String = "";

  public alertButtons = ['Ok'];

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

  user = {
    usuario: "",
    password: ""
  }

  showAlert(title: string, message: string) {
    alert(title + ': ' + message);
  }

  enviarInformacion() {
    this.auth.login(this.user.usuario, this.user.password).then(() => {
      if (this.auth.autenticado) {
        const navigationExtras: NavigationExtras = {
          state: { user: this.user }
        };
        this.router.navigate(['/home'], navigationExtras);
      } else {
        if(this.user.usuario == '' || this.user.password == ''){
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
    if (this.user.usuario == '' || this.user.password == ''){
      console.log("Algun campo no tiene valor");
      this.mensaje = "Algun campo no tiene valor";
      this.showAlert('Error', this.mensaje);
    }
    else if(this.user.password.length < 8){
      console.log("Contraseña con menos de 8 caracteres");
      this.mensaje = "Contraseña con menos de 8 caracteres";
      this.showAlert('Error', this.mensaje);
    }
    else {
      this.auth.register(this.user.usuario, this.user.password).then((res) => {
        if (res) {
          this.mensaje = "Registro Exitoso";
          this.modal.dismiss(this.user.usuario, 'confirm');
        } else {
          this.estado = "Usuario Existente";
        }
        setTimeout(() => {
          this.mensaje = "";
          this.estado = "";
        }, 5000);
      });
    }
  }
}

