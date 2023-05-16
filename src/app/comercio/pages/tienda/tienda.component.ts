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
  horVer: boolean = false;

  async ngOnInit(): Promise<void> {
    localStorage.removeItem('typeQuery');
    localStorage.removeItem('typeQuery2');
    localStorage.removeItem('query');
    localStorage.removeItem('query2');
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
    let data: Record<string, any> = {};
    if (localStorage.getItem('typeQuery'))
      data[localStorage.getItem('typeQuery') || ''] =
        localStorage.getItem('query');
    if (localStorage.getItem('typeQuery2'))
      data[localStorage.getItem('typeQuery2') || ''] =
        localStorage.getItem('query2');
    data['ids'] = idsProductos;
    await fetch(url1, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
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
