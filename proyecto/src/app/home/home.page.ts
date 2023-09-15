import { Component,ViewChild,ElementRef,ViewChildren} from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { IonAvatar } from '@ionic/angular';
import type { Animation } from '@ionic/angular';
import type { QueryList } from '@angular/core';
import { AnimationController, IonCard } from '@ionic/angular';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  @ViewChild(IonAvatar,{read:ElementRef}) avatar!:ElementRef<HTMLIonAvatarElement>;
  @ViewChild(IonCard,{read:ElementRef}) card!: ElementRef<HTMLIonCardElement>;

  private animation!:Animation;
  constructor(private router: Router,private animationCtrl:AnimationController) { }
  public mensaje = ""

  ngAfterViewInit() {
    this.animation = this.animationCtrl
      .create()
      .addElement(this.card.nativeElement)
      .duration(1500)
      .iterations(1)
      .direction('alternate')
      .fromTo('background', 'white', 'var(--background)');
  }

  playAnimation() {
    this.animation.play();
  }

  pause() {
    this.animation.pause();
  }

  stop() {
    this.animation.stop();
  }

  user = {
    usuario: "",
    password: ""
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

