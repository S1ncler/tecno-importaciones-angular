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
  cantidadProductosMostrar = 20;
  marcas: string[] = [];
  precioRangos: any;
  categorias: string[] = [];

  async ngOnInit(): Promise<void> {
    const url: string = 'http://localhost:3000/api/dbti/getproducts';

    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        this.DB = data;
        for (let i in this.DB) {
          this.DB[i].forEach((producto: any) => {
            if (!this.marcas.includes(producto.marca))
              this.marcas.push(producto.marca);
            producto.image = producto.image.replace(/\[|\]|"/g, '').split(',');
            this.productos.push(producto);
          });
        }
        for (let i = 0; i < this.cantidadProductosMostrar; i++)
          this.productosMostrar.push(
            this.productos[Math.floor(Math.random() * this.productos.length)]
          );
      })
      .catch((error: any) => {
        console.log(error);
      });

    this.categorias = Object.keys(this.DB);

    this.precioRangos = [
      '$0 a $200.000',
      '$200.000 a $400.000',
      '$400.000 a $600.000',
      '$600.000 en adelante',
    ];
  }
}
