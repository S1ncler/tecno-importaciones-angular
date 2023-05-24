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

  addToCart(item: any){
    let cart = "";
    cart = localStorage.getItem('cart') || "";
    cart += `${item.id},`;
    localStorage.setItem('cart', cart);
    this.cartAdded.emit();
  }
}
