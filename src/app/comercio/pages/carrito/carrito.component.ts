import { Component } from '@angular/core';
import { NavBarService } from 'src/app/Shared/services/nav-bar.service';

export interface productoCompleto {
  id: number;
  name: string;
  marca: string;
  descripcion: string;
  price: number;
  image: string[];
  categoria: string;
  stock: number;
  repetidos: number;
}

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css'],
})
export class CarritoComponent {
  log: boolean = false;
  public productoFormulario: productoCompleto = {
    id: 0,
    name: '',
    marca: '',
    descripcion: '',
    price: 0,
    image: [''],
    categoria: '',
    stock: 0,
    repetidos: 0,
  };

  constructor(public navBarService: NavBarService) {}
  //lista de productos recibida por el localhost
  arrayProductos: any[] = [];
  //precio sumado de todos los productos (sin iva)
  subtotal: number = 0;
  // 19% del precio total de los productos
  iva: number = 0;
  // suma del subtotal y el iva
  total: number = 0;
  ngOnInit() {
    this.logged();
    //se recurpera la informacion del local storage
    let entrada = localStorage.getItem('carrito');

    //si la informacion es valida, se convierte de string a objeto
    if (entrada) {
      this.arrayProductos = JSON.parse(entrada);
      //se lanza error si la informacion es invalida
    } else {
      return console.log('El valor es nulo o indefinido');
    }

    //se suman los precios de los productos
    for (let item of this.arrayProductos) {
      if (item.repetidos) {
        this.subtotal = this.subtotal + item.price * item.repetidos;
      } else this.subtotal = this.subtotal + item.price;
    }
    this.subtotal = Math.round(this.subtotal);
    //se obtiene el iva
    this.iva = Math.round(this.subtotal * 0.19);
    //se obtiene el total
    this.total = Math.round(this.subtotal + this.iva);
  }

  removeProduct(data: object) {
    let i = -1;
    for (let item of this.arrayProductos) {
      i += 1;
      if (item == data) {
        this.navBarService.removeFromCart(this.arrayProductos[i]);
      }
    }
    this.subtotal = 0;
    this.iva = 0;
    this.total = 0;
    this.ngOnInit();
  }

  addProduct(data: object) {
    for (let item of this.arrayProductos) {
      if (item == data) {
        if (!item.repetidos) {
          item.repetidos = 2;
        } else item.repetidos = item.repetidos += 1;
      }
    }

    localStorage.removeItem('carrito');
    localStorage.setItem('carrito', JSON.stringify(this.arrayProductos));
    this.subtotal = 0;
    this.iva = 0;
    this.total = 0;
    this.ngOnInit();
  }

  substractProduct(data: object) {
    for (let item of this.arrayProductos) {
      if (item == data) {
        if (item.repetidos >= 2) {
          item.repetidos = item.repetidos - 1;
        } else this.removeProduct(data);
      }
    }
    localStorage.removeItem('carrito');
    localStorage.setItem('carrito', JSON.stringify(this.arrayProductos));
    this.subtotal = 0;
    this.iva = 0;
    this.total = 0;
    this.ngOnInit();
  }

  logged() {
    let token = localStorage.getItem('token');
    if (token) {
      this.log = true;
    }
  }
  factura(){
    let factura = {
      subtotal: this.subtotal,
      iva: this.iva,
      total: this.total
    }
    localStorage.setItem("factura" , JSON.stringify(factura))
  }
}
