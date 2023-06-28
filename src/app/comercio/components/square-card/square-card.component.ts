import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NavBarService } from 'src/app/Shared/services/nav-bar.service';

@Component({
  selector: 'app-square-card',
  templateUrl: './square-card.component.html',
  styleUrls: ['./square-card.component.css']
})
export class SquareCardComponent {
  // recibe el item a mostrar
  @Input() item: any;

  constructor(private navBarService: NavBarService, private router: Router){}

  // agrega el id del item y llama una funcion en el componente padre
  addToCart(item: any){
    // llama la funcion padre para que el navbar actualice la cantidad de elementos del carrito
    this.navBarService.addToCart(item);
    
  }
  pasarid(){
    this.router.navigate([`comercio/detallesProducto/${this.item.id}`])
  }
}
