import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-square-card',
  templateUrl: './square-card.component.html',
  styleUrls: ['./square-card.component.css']
})
export class SquareCardComponent {
  // recibe el item a mostrar
  @Input() item: any;  
  @Output() cartAdded = new EventEmitter();

  // agrega el id del item y llama una funcion en el componente padre
  addToCart(item: any){
    let cart = "";
    cart = localStorage.getItem('cart') || "";
    cart += `${item.id},`;
    localStorage.setItem('cart', cart);
    // llama la funcion padre para que el navbar actualice la cantidad de elementos del carrito
    this.cartAdded.emit();
  }
}
