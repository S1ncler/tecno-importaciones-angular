import { Component, Input } from '@angular/core';
import { NavBarService } from 'src/app/Shared/services/nav-bar.service';

@Component({
  selector: 'app-horizontal-card',
  templateUrl: './horizontal-card.component.html',
  styleUrls: ['./horizontal-card.component.css']
})
export class HorizontalCardComponent {
  // recibe el item a mostrar
  @Input() item: any;

  constructor(private navBarService: NavBarService){  }

  // agrega el id del item y llama una funcion en el componente padre
  addToCart(item: any){
    // llama la funcion padre para que el navbar actualice la cantidad de elementos del carrito
    this.navBarService.addToCart(item);
  }
}
