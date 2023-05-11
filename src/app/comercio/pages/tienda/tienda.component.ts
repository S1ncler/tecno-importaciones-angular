import { Component } from '@angular/core';

@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.css'],
})
export class TiendaComponent {
  constructor() {}
  DB: any;
  productos: JSON[] = [];
  productosMostrar: JSON[] = [];
  cantidadProductosMostrar = 10;
  horVer: boolean = false;

  async ngOnInit(): Promise<void> {
    localStorage.removeItem('query');
    const url1: string = 'http://localhost:3000/api/dbti/getrandomproducts';
    await fetch(url1)
      .then((response) => response.json())
      .then((data) => {
        this.productosMostrar = data;
      })
      .catch((error: any) => {
        console.log(error);
      });
  }

  async mostrarMas() {
    let url1: string = 'http://localhost:3000/api/dbti/getrandomproducts';
    if (localStorage.getItem('query') != null) url1 = `http://localhost:3000/api/dbti/getrandomproducts?categoria=${localStorage.getItem('query')}`
    await fetch(url1)
      .then((response) => response.json())
      .then((data) => {
        this.productosMostrar = [ ...this.productosMostrar, ...data];
      })
      .catch((error: any) => {
        console.log(error);
      });
  }

  horVerchanger (bool: boolean) {
    this.horVer = bool;
  }

  getporductosMostrar(otrosProductos: JSON[]){
    this.productosMostrar = otrosProductos;
  }
}
