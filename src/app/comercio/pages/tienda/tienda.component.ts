import { query } from '@angular/animations';
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
  productosMostrar: any[] = [];
  cantidadProductosMostrar = 10;
  horVer: boolean = false;

  async ngOnInit(): Promise<void> {
    localStorage.removeItem('query');
    const url1: string = 'http://localhost:3002/productos/r';
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
    let url1: string = 'http://localhost:3002/productos/r';
    let idsProductos: number[] = [];
    for (let producto of this.productosMostrar) idsProductos.push(producto.id);
    let data: any[] = [];
    if (localStorage.getItem('typeQuery'))
      data.push(
        JSON.parse(
          `${localStorage.getItem('typeQuery')}: ${localStorage.getItem(
            'query'
          )}`
        )
      );
    if (localStorage.getItem('typeQuery2'))
      data.push(
        JSON.parse(
          `${localStorage.getItem('typeQuery2')}: ${localStorage.getItem(
            'query2'
          )}`
        )
      );
    data.push({id: idsProductos});
    let peticion = {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
    await fetch(url1)
      .then((response) => response.json())
      .then((data) => {
        this.productosMostrar = [...this.productosMostrar, ...data];
      })
      .catch((error: any) => {
        console.log(error);
      });
  }

  horVerchanger(bool: boolean) {
    this.horVer = bool;
  }

  getporductosMostrar(otrosProductos: JSON[]) {
    this.productosMostrar = otrosProductos;
  }
}
