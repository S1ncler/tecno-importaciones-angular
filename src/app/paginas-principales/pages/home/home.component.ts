import { Component } from '@angular/core';
import { NavBarService } from 'src/app/Shared/services/nav-bar.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  tokenExist: boolean = false;
  public mostrarCuadro1: boolean = false;
  public mostrarCuadro2: boolean = false;
  public mostrarCuadro3: boolean = false;
  public mostrarCuadro4: boolean = false;
  public mostrarCuadro5: boolean = false;
  public mostrarCuadro6: boolean = false;
  public mostrarCuadro7: boolean = false;
  public mostrarCuadro8: boolean = false;
  
    constructor(private navBarService: NavBarService) {
      this.tokenExist = navBarService.testToken();
     }
   

  public toggleCuadro(cuadro: string): void {
    switch (cuadro) {
      case 'cuadro1':
        this.mostrarCuadro1 = !this.mostrarCuadro1;
        break;
      case 'cuadro2':
        this.mostrarCuadro2 = !this.mostrarCuadro2;
        break;
      case 'cuadro3':
        this.mostrarCuadro3 = !this.mostrarCuadro3;
        break;
      case 'cuadro4':
        this.mostrarCuadro4 = !this.mostrarCuadro4;
        break;
      case 'cuadro5':
        this.mostrarCuadro5 = !this.mostrarCuadro5;
        break;
      case 'cuadro6':
        this.mostrarCuadro6 = !this.mostrarCuadro6;
        break;
      case 'cuadro7':
        this.mostrarCuadro7 = !this.mostrarCuadro7;
        break;
      case 'cuadro8':
        this.mostrarCuadro8 = !this.mostrarCuadro8;
        break;
      default:
        break;
    }
  }
}
