import { Component, ElementRef } from '@angular/core';
import { NavBarService } from '../../services/nav-bar.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  // variable con la cantidad de items del carrito
  cartCant: number = 0;

  // llama el servicio del navbar
  constructor(private navBarService: NavBarService) {
    // cuenta cuantod productos hay en el carrito apenas se crea el componente
    this.cartCant = this.navBarService.cartCount()
  }

  // actualiza el conteo de items del carrito
  updateCartCount(){
    this.cartCant = this.navBarService.cartCount()
  }

}
