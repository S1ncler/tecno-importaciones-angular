import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavBarService {

  constructor() { }

  cartCount(){
    let cartCant = 0
    if(!localStorage.getItem('cart')) {
      localStorage.setItem('cart', "");
      cartCant = 0;
    }
    else {
      cartCant = `${localStorage.getItem('cart')}`.split(",").length - 1;
    }
    return cartCant;
  }
}
