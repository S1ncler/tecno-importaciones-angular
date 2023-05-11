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
  marcas: string[] = [];
  precioRangos: any;
  categorias: string[] = [];

  async ngOnInit(): Promise<void> {
    const url1: string = 'http://localhost:3000/api/dbti/get10randomproducts';
    await fetch(url1)
      .then((response) => response.json())
      .then((data) => {
        this.productosMostrar = data;
      })
      .catch((error: any) => {
        console.log(error);
      });

    const url2: string = 'http://localhost:3000/api/dbti/getmarcas';
    await fetch(url2)
      .then((response) => response.json())
      .then((data) => {
        this.marcas = data;
      })
      .catch((error: any) => {
        console.log(error);
      });

    const url3: string = 'http://localhost:3000/api/dbti/getcategorias';
    await fetch(url3)
      .then((response) => response.json())
      .then((data) => {
        this.categorias = data;
      })
      .catch((error: any) => {
        console.log(error);
      });

    this.precioRangos = [
      '$0 a $200.000',
      '$200.000 a $400.000',
      '$400.000 a $600.000',
      '$600.000 en adelante',
    ];
  }

  async mostrarMas() {
    const url1: string = 'http://localhost:3000/api/dbti/get10randomproducts';
    await fetch(url1)
      .then((response) => response.json())
      .then((data) => {
        this.productosMostrar = [ ...this.productosMostrar, ...data];
      })
      .catch((error: any) => {
        console.log(error);
      });
  }
}
