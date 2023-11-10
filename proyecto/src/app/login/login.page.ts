import { Component, ViewChild, ElementRef } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { IonCard, AnimationController, IonModal } from '@ionic/angular';
import { ApiService } from 'src/app/servicios/api.service';
import type { Animation } from '@ionic/angular';
import { AutenticacionService } from '../servicios/autenticacion.service';
import { first } from 'rxjs/operators';

interface datosAPI {
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
    username: "",
    password: "",
    rol: ""
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

  enviarInformacion() {
    this.auth.verificarCredenciales(this.credentials.username, this.credentials.password).then(() => {
      if (this.auth.autenticado) {
        const navigationExtras: NavigationExtras = {
          state: { user: this.credentials }
        };
        this.router.navigate(['/home'], navigationExtras);
      } else {
        if (this.credentials.username == '' || this.credentials.password == '') {
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
    if (this.credentials.username === '' || this.credentials.password === '') {
      console.log("Algun campo no tiene valor");
      this.mensaje = "Algun campo no tiene valor";
      setTimeout(() => {
        this.mensaje = "";
      }, 2500);
    } else if (this.credentials.password.length < 8) {
      console.log("Contraseña con menos de 8 caracteres");
      this.mensaje = "Contraseña con menos de 8 caracteres";
      setTimeout(() => {
        this.mensaje = "";
      }, 2500);
    }
    else {
      // Verificar si el nombre de usuario ya existe
      this.api.getPostsL().pipe(first()).subscribe(
        (users) => {
          const existeUsuario = users.find((user: any) => user.username === this.credentials.username);
          if (existeUsuario) {
            console.log("Nombre de usuario ya existe");
            this.mensaje = "Usuario existente";
            setTimeout(() => {
              this.mensaje = "";
            }, 2500);
          } else {
            // El nombre de usuario no existe, proceder con el registro
            console.log(this.credentials);
            this.api.createPostL(this.credentials).subscribe(
              (success) => {
                this.datosAPI = "Agregado con Éxito";
                console.log("Funcionó");
              },
              (err) => {
                console.error(err);
              }
            );
            setTimeout(() => {
              this.modal.dismiss(this.credentials.username, 'confirm');
            }, 3000);
          }
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }
}