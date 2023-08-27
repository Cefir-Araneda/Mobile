import { Component,ViewChild,ElementRef} from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { IonAvatar, IonTitle } from '@ionic/angular';
import type { Animation } from '@ionic/angular';
import { AnimationController } from '@ionic/angular';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],

  
})
export class HomePage {
  @ViewChild(IonAvatar,{read:ElementRef}) avatar!:ElementRef<HTMLIonAvatarElement>;
  @ViewChild(IonTitle,{read:ElementRef}) title!:ElementRef<HTMLIonTitleElement>;

  private animation!:Animation;
  private animationn!:Animation;
  constructor(private router: Router,private animationCtrl:AnimationController) { }
  public mensaje = ""

  ngAfterViewInit() {
    this.animation = this.animationCtrl.create()
    .addElement(this.title.nativeElement)
    .addElement(this.avatar.nativeElement)
    .duration(5000)
    .iterations(Infinity)
    .keyframes([
      {offset:0, transform:'translateX(0px)',opacity:'1'},
      {offset:0.25, transform:'translateX(100px)',opacity:'0.2'},
      {offset:0.50, transform:'translateX(0px)',opacity:'1'},
      {offset:0.75, transform:'translateX(-100px)',opacity:'0.2'},
      {offset:1, transform:'translateX(0px)',opacity:'1'},
    ])
  }

  user = {
    usuario: "",
    password: ""
  }
  
  playAnimation(){
    this.animation.play();
  }

  enviarInformacion() {
    if (this.user.usuario != "") {
      let navigationExtras: NavigationExtras = {
        state: { user: this.user }
      }
      this.router.navigate(['/login'], navigationExtras);
    } else {
      this.mensaje = "Debe ingresar sus credenciales";
    }
  }
  mostrarConsola() {
    console.log(this.user);
    if (this.user.usuario != "" && this.user.password != "") {
      this.mensaje = "Usuario Conectado";
    } else {
      this.mensaje = "Usuario y contraseña deben tener algun valor"
    }
  }

}
