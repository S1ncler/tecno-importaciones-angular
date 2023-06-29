import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { user } from 'src/app/login-registro/interfaces/user.interface';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class NavBarService {
  user: user = {
    _id: '',
    username: '',
    nombre: '',
    email: '',
    cumpleanos: "",
    telefono: '',
    contrasena: '',
    departamento: '',
    ciudad: '',
    direccion: '',
    complemento: '',
    codigoPostal: '',
    rol:'',
    facturas: []
  };
  private productosCarrito: any[];
  private productosCarrito$: Subject<any[]>;
  private tokenExist: boolean;
  private tokenExist$: Subject<boolean>;
  
  router: any;

  constructor(private _router: Router) {
    this.productosCarrito = [];
    this.productosCarrito$ = new Subject();
    this.tokenExist = false;
    this.tokenExist$ = new Subject();
  }
  ngOnInit() {}

  //  usuarioPropio(usuario:string){
  //   const url = environment.API_URI + `usuarios/${usuario}`
  //   return this.http?.get(url)
  // }

  loadCart() {
    this.productosCarrito = JSON.parse(localStorage.getItem('carrito') || '[]');
    return this.productosCarrito.length;
  }

  addToCart(producto: any) {
    this.productosCarrito.push(producto);
    localStorage.setItem('carrito', JSON.stringify(this.productosCarrito));
    this.productosCarrito$.next(this.productosCarrito);
  }

  removeFromCart(producto: any) {
    this.loadCart();
    let i = -1;
    for (let item of this.productosCarrito) {
      i += 1;
      if (item._id === producto._id) {
        this.productosCarrito.splice(i, 1);
      }
    }
    localStorage.removeItem('carrito');
    localStorage.setItem('carrito', JSON.stringify(this.productosCarrito));
    this.productosCarrito$.next(this.productosCarrito);
  }

  getProductosCarrito$(): Observable<any[]> {
    return this.productosCarrito$.asObservable();
  }  
  //si existe el token o no
  testToken() {
    const token = localStorage.getItem('token') || "";
    token !== "" ? this.tokenExist = true : this.tokenExist = false;
    if(token != ""){
      const decoded:any = jwtDecode(token);
      if (decoded)
      if (decoded.exp < (new Date().getTime() + 2) / 1000) {
        this.tokenExist = false;
        localStorage.removeItem("token");
      }
    }
    this.tokenExist$.next(this.tokenExist)
    return this.tokenExist;
  }
  getTokenExist$(): Observable<boolean> {
    return this.tokenExist$.asObservable();
  }
  removeToken() {
    localStorage.removeItem('token');
    this.tokenExist = false;
    this.tokenExist$.next(this.tokenExist);
  }

  search(searchBar: string) {
    this._router.navigate([`comercio/tienda/${searchBar}`]);
  }
}
