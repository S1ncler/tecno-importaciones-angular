import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavBarService {
  private productosCarrito: any[];
  private productosCarrito$: Subject<any[]>;
  private tokenExist$: Subject<boolean>;
  
  constructor() { 
    this.productosCarrito = [];
    this.productosCarrito$ = new Subject();
    this.tokenExist$ = new Subject();

    this.testToken();
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

  removeFromCart(producto: any){
    this.loadCart()
    let i=-1
    for (let item of this.productosCarrito){
      i+=1
      if (item._id === producto._id){
        this.productosCarrito.splice(i,1)
      }
    }
    localStorage.removeItem("carrito")
    localStorage.setItem("carrito" , JSON.stringify(this.productosCarrito))
    this.productosCarrito$.next(this.productosCarrito)
  }

  getProductosCarrito$(): Observable<any[]> {
    return this.productosCarrito$.asObservable();
  }

testToken(){
  const token = localStorage.getItem('token');
  return !!token;
}
getTokenExist$():Observable<boolean> {
  return this.tokenExist$.asObservable();
}
removeToken() {
  localStorage.removeItem('token');
  this.tokenExist$.next(false);
}


}
