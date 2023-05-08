import { Component } from '@angular/core';

@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.css']
})
export class TiendaComponent {
  constructor() {}
  productos: any;
  marcas: any;
  precioRangos: any;
  categorias: any;

  ngOnInit(): void {
    this.productos = [
      {
        id: 1,
        marca: 'Crucial',
        referencia: 'Portatil 16gb 3200mhz',
        precio: 266000,
        categoria: 'Ram',
        stock: 10,
        descripcion: 'Memoria Ram crucial para portatil de 16Gb a 3200mhz'
      },
      {
        id: 2,
        marca: 'Evga',
        referencia: '750W 80+ White',
        precio: 250000,
        categoria: 'Fuentes de poder',
        stock: 8,
        descripcion: 'Fuente Evga de 750W de potencia con certificacion 80+ White semimodular'
      },
      {
        id: 3,
        marca: 'Asus',
        referencia: '750W 80+ White',
        precio: 250000,
        categoria: 'Fuentes de poder',
        stock: 8,
        descripcion: 'Fuente Evga de 750W de potencia con certificacion 80+ White semimodular'
      },
    ];
    this.marcas = [
      'Nvidia',
      'AMD',
      'Kingstone',
      'EVGA',
      'Corsair',
      'XPG',
      'Asus',
      'Asrock',
      'Gigabyte',
      'Aorus',
      'MSI',
    ];
    this.precioRangos = [
      '$0 a $200.000',
      '$200.000 a $400.000',
      '$400.000 a $600.000',
      '$600.000 en adelante',
    ];
    this.categorias = [];
  }
}
