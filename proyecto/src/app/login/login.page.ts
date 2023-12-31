import { Component, ViewChild, ElementRef } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { IonCard, AnimationController, IonModal } from '@ionic/angular';
import { ApiService } from 'src/app/servicios/api.service';
import type { Animation } from '@ionic/angular';
import { AutenticacionService } from '../servicios/autenticacion.service';
import { distinct, first } from 'rxjs/operators';

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
    this.auth.verificarCredenciales(this.credentials.username, this.credentials.password)
      .then(() => {
        if (this.auth.autenticado) {
          // Busca al usuario en la bdd
          this.api.listCredentials().subscribe(
            (users) => {
              const buscaUsuario = users.find((user: any) => user.username === this.credentials.username);
              if (buscaUsuario) {
                //Comprobar contraseña
                if (buscaUsuario.password === this.credentials.password) {
                  // Guarda el rol del usuario
                  this.credentials.rol = buscaUsuario.rol;
                  // Verifica el rol y navega a la página correspondiente
                  if (this.credentials.rol === 'Conductor') {
                    this.router.navigate(['/home'], {
                      state: { credentials: this.credentials }
                    });
                  } else {
                    this.router.navigate(['/passenger'], {
                      state: { credentials: this.credentials }
                    });
                  }
                } else {
                  this.mensaje = "Contraseña incorrecta";
                }
              } else {
                this.mensaje = "Usuario inexistente";
              }
            },
            (error) => {
              console.error(error);
            }
          );
        } else {
          if (this.credentials.username === '' || this.credentials.password === '') {
            console.log("Algun campo no tiene valor");
            this.mensaje = "Algun campo no tiene valor";
          } else {
            this.mensaje = "Ingrese credenciales correctas";
          }
        }
        setTimeout(() => {
          this.mensaje = "";
        }, 5000);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  forgot() {
    this.router.navigate(['forgot']);
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.api.createCredential(this.credentials)
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
    } else if (this.credentials.rol === '') {
      console.log("Ningun rol seleccionado");
      this.mensaje = "Ningun rol seleccionado";
      setTimeout(() => {
        this.mensaje = "";
      }, 2500);
    } else {
      // Verificar si el nombre de usuario ya existe
      this.api.listCredentials().subscribe(
        (success: any[]) => {
          const userExists = success.some((cred: { username: string }) => cred.username === this.credentials.username);
          if (userExists) {
            console.log("Nombre de usuario ya existe");
            this.mensaje = "Usuario existente";
            setTimeout(() => {
              this.mensaje = "";
            }, 2500);
          } else {
            // El nombre de usuario no existe, proceder con el registro
            this.api.createCredential(this.credentials).subscribe(
              (res: any[]) => {
                this.mensaje = "Registro Exitoso";
                console.log("Funcionaaaa :D");
                setTimeout(() => {
                  this.mensaje = "";
                  this.modal.dismiss(this.credentials.username, 'confirm');
                }, 2000);
              },
              (err: any) => {
                console.error(err);
              }
            );
          }
        },
        (err: any) => {
          console.error("Error al obtener las credenciales:", err);
        }
      );
    }
  }
}