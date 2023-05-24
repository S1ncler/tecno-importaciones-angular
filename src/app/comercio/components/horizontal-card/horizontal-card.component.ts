import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-horizontal-card',
  templateUrl: './horizontal-card.component.html',
  styleUrls: ['./horizontal-card.component.css']
})
export class HorizontalCardComponent {
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
