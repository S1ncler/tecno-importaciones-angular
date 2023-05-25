import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavBarService {

  private productosCarrito: any[];
  private productosCarrito$: Subject<any[]>;

  constructor() { 
    this.productosCarrito = [];
    this.productosCarrito$ = new Subject();
   }

  loadCart(){
    this.productosCarrito = JSON.parse(localStorage.getItem('carrito') || "[]");
    return this.productosCarrito.length
  }

  addToCart(producto :any){
    this.productosCarrito.push(producto);
    localStorage.setItem('carrito', JSON.stringify(this.productosCarrito));
    this.productosCarrito$.next(this.productosCarrito);
  }

  getProductosCarrito$(): Observable<any[]> {
    return this.productosCarrito$.asObservable();
  }
}
