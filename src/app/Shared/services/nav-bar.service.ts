import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import jwtDecode from 'jwt-decode';
import { user } from 'src/app/login-registro/interfaces/user.interface';
import { Router } from '@angular/router';
import { TiendaService } from 'src/app/comercio/services/tienda.service';

@Injectable({
  providedIn: 'root',
})
export class NavBarService {
  user: user = {
    _id: '',
    username: '',
    nombre: '',
    email: '',
    cumpleanos: new Date('2023-06-22'),
    telefono: '',
    contrasena: '',
    departamento: '',
    ciudad: '',
    direccion: '',
    complemento: '',
    codigoPostal: '',
  };
  private productosCarrito: any[];
  private productosCarrito$: Subject<any[]>;
  private tokenExist$: Subject<boolean>;
  router: any;

  constructor(private tiendaService: TiendaService, private _router: Router) {
    this.productosCarrito = [];
    this.productosCarrito$ = new Subject();
    this.tokenExist$ = new Subject();

    this.testToken();
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

  testToken() {
    const token = localStorage.getItem('token');
    return !!token;
  }
  getTokenExist$(): Observable<boolean> {
    return this.tokenExist$.asObservable();
  }
  removeToken() {
    localStorage.removeItem('token');
    this.tokenExist$.next(false);
  }
  decodeToken() {
    const token = localStorage.getItem('token');
    const decoded = jwtDecode(token ? token : 'Error en el token');
    return decoded;
  }

  search(searchBar: string) {
    this._router.navigate([`comercio/tienda/${searchBar}`]);
  }
}
