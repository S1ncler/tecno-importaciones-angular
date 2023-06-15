import { Component, OnInit } from '@angular/core';
import { NavBarService } from '../../services/nav-bar.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit{

  // variable con la cantidad de items del carrito
  cartCant: number = 0;

  //variable para saber si el token existe
  tokenExist: boolean = false;
// nombre y appellido 

  // llama el servicio del navbar
  constructor(private navBarService: NavBarService) {
    this.cartCant = navBarService.loadCart();
    this.tokenExist = navBarService.testToken();
   }

  ngOnInit() {

   
    this.navBarService.getProductosCarrito$().subscribe(productosCarrito => {
      this.cartCant = productosCarrito.length;
    });

  }
 




  
  
}
