import { Component, ElementRef } from '@angular/core';
import { NavBarService } from '../../services/nav-bar.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  cartCant: number = 10;

  constructor(private navBarService: NavBarService) {
    this.cartCant = this.navBarService.cartCount()
  }

  updateCartCount(){
    this.cartCant = this.navBarService.cartCount()
  }

}
