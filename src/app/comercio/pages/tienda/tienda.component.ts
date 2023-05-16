import { Component } from '@angular/core';

@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.css'],
})
export class TiendaComponent {
  constructor() {}
  // para saber si hay algun filtro de precio aplicado
  filtradoPrecio: boolean = false
  // almacenar los productos completos cuando haya un filtro de precios
  productos: any[] = [];
  // almacena los productos que se muestran al usuario
  productosMostrar: any[] = [];

  horVer: boolean = false;
  // almacena 4 rangos de precios de los productos que se estan mostrando a usuario
  rangosPrecios: any[] = [];

  // ejecucion apenas se carga el componente
  async ngOnInit(): Promise<void> {
    // al iniciar elimina las variables de filtros del local storage
    localStorage.removeItem('typeQuery');
    localStorage.removeItem('typeQuery2');
    localStorage.removeItem('query');
    localStorage.removeItem('query2');
    // realiza una consulta inicial de 10 productos random
    const url1: string = 'http://localhost:3002/productos/r';
    await fetch(url1)
      .then((response) => response.json())
      .then((data) => {
        this.productosMostrar = data;
      })
      .catch((error: any) => {
        console.log(error);
      });
    this.getPrecios();
  }

  // funcion que se ejecuta en caso de que se accione el boton de mostrar mas productos
  async mostrarMas() {
    let url1: string = 'http://localhost:3002/productos/r';
    // llena los ids de los productos ya mostrados para que no se repitan en la nueva consulta
    let idsProductos: number[] = [];
    for (let producto of this.productosMostrar) idsProductos.push(producto.id);
    // evalua si hay filtros y realiza la consulta con los filtros que el usuario haya
    // seleccionado y los guarda en data para despues hacer la peticion a la api
    let data: Record<string, any> = {};
    if (localStorage.getItem('typeQuery'))
      data[localStorage.getItem('typeQuery') || ''] =
        localStorage.getItem('query');
    if (localStorage.getItem('typeQuery2'))
      data[localStorage.getItem('typeQuery2') || ''] =
        localStorage.getItem('query2');
    data['ids'] = idsProductos;
    // realiza la peticion a la api
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
        // obtiene los productos que debe mostrar
        this.productosMostrar = [...this.productosMostrar, ...data];
      })
      .catch((error: any) => {
        console.log(error);
      });
    this.getPrecios();
  }

  horVerchanger(bool: boolean) {
    this.horVer = bool;
  }

  // obtiene los productos que se deben mostrar cuando se establecio un filtro en alguno
  // de los componentes aside y tambien su rango de precios
  getporductosMostrar(otrosProductos: JSON[]) {
    this.productosMostrar = otrosProductos;
    this.getPrecios();
  }

  // obtiene el rango de precios de los productos que se estan mostrando
  getPrecios() {
    this.rangosPrecios = [];
    let precios: number[] = [];
    for (let producto of this.productosMostrar) precios.push(producto.price);
    precios.sort((a, b) => a - b);
    const totalPrecios = precios.length;
    const rango = Math.floor(totalPrecios / 4);

    this.rangosPrecios.push([precios[0], precios[rango - 1]]);
    this.rangosPrecios.push([precios[rango], precios[rango * 2 - 1]]);
    this.rangosPrecios.push([precios[rango * 2], precios[rango * 3 - 1]]);
    this.rangosPrecios.push([precios[rango * 3], precios[totalPrecios - 1]]);
  }

  // realiza el filtrado por precio
  filtroPrecio(rangoprecio: number[]) {
    if (rangoprecio[0] === -1) {
      this.productosMostrar = this.productos;
      return
    }
    if ( !this.filtradoPrecio ) this.productos = this.productosMostrar;
    this.filtradoPrecio = true;
    this.productosMostrar = [];
    for (let producto of this.productos)
      if (producto.price >= rangoprecio[0] && producto.price <= rangoprecio[1])
        this.productosMostrar.push(producto);
  }
}
