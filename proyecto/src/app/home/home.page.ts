import { Component,ViewChild,ElementRef} from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import type { Animation } from '@ionic/angular';
import { IonCard,AnimationController } from '@ionic/angular';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  @ViewChild(IonCard,{read:ElementRef}) card!:ElementRef<HTMLIonCardElement>;

  private animation!:Animation;
  constructor(private router: Router,private animationCtrl:AnimationController) { }
  public mensaje = ""

  ngAfterViewInit() {
    this.animation = this.animationCtrl
      .create()
      .addElement(this.card.nativeElement)
      .duration(1500)
      .iterations(Infinity)
      .direction('alternate')
      .fromTo('background', '#3AAFB9', 'var(--background)');
  }

  user = {
    usuario: "",
    password: ""
  }
  
  playAnimation(){
    this.animation.play();
  }

  enviarInformacion() {
    if (this.user.usuario != "" && this.user.password != "") {
      let navigationExtras: NavigationExtras = {
        state: { user: this.user }
      }
      this.router.navigate(['/init'], navigationExtras);
    } else {
      this.mensaje = "Complete los campos por favor";
      this.router.navigate(['/home']);
    }
  }
}

