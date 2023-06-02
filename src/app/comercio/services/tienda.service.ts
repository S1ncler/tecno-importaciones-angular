import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Observable } from 'rxjs';
export interface productos {
  id: number;
  name: string;
  marca: string;
  price: number;
  stock: number;
}

@Injectable({
  providedIn: 'root',
})
export class TiendaService {
  public stateFormulario = false;
  public ELEMENT_DATA: productos[] = [];
  private url = `${environment.API_URI}productos`;

  constructor(private http: HttpClient) {}

  async traerProductos(productosMostrar: any[] = []) {
    let url1: string = 'http://localhost:3002/productos/r';
    // llena los ids de los productos ya mostrados para que no se repitan en la nueva consulta
    let idsProductos: number[] = [];
    for (let producto of productosMostrar) idsProductos.push(producto.id);
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
        productosMostrar = [...productosMostrar, ...data];
      })
      .catch((error: any) => {
        console.log(error);
      });
    return productosMostrar;
  }

  getPrecios(productosMostrar: any[] = []) {
    // obtiene todos los precios de los productos a mostrar y los divide en 4 rangos
    const rangosPrecios = [];
    let precios: number[] = [];
    for (let producto of productosMostrar) precios.push(producto.price);
    precios.sort((a, b) => a - b);
    const totalPrecios = precios.length;
    const rango = Math.floor(totalPrecios / 4);

    rangosPrecios.push([precios[0], precios[rango - 1]]);
    rangosPrecios.push([precios[rango], precios[rango * 2 - 1]]);
    rangosPrecios.push([precios[rango * 2], precios[rango * 3 - 1]]);
    rangosPrecios.push([precios[rango * 3], precios[totalPrecios - 1]]);

    return rangosPrecios;
  }

  ordenar(productosMostrar: any[], opcionOrdenar: string) {
    // ordena los productos a mostrar segun el criterio elegido por el usuario
    if (opcionOrdenar === 'nombre-A-Z') {
      productosMostrar = productosMostrar.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
    }
    if (opcionOrdenar === 'nombre-Z-A') {
      productosMostrar = productosMostrar.sort((a, b) =>
        b.name.localeCompare(a.name)
      );
    }
    if (opcionOrdenar === 'precio-ascendente') {
      productosMostrar = productosMostrar.sort((a, b) => a.price - b.price);
    }
    if (opcionOrdenar === 'precio-descendente') {
      productosMostrar = productosMostrar.sort((a, b) => b.price - a.price);
    }

    return productosMostrar;
  }

  traerTodosProductos(): Observable<any> {
    return this.http.get(`${this.url}/`)
  }

  mostrarFormulario(state: boolean): void {
    this.stateFormulario = state;
  }
}
