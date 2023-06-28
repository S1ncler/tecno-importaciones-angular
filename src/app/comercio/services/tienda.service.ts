import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Observable, Subject } from 'rxjs';
export interface productoTabla {
  id: number;
  name: string;
  marca: string;
  price: number;
  stock: number;
}
export interface productoCompleto {
  id: number;
  name: string;
  marca: string;
  descripcion: string;
  price: number;
  image: string[];
  categoria: string;
  stock: number;
}

@Injectable({
  providedIn: 'root',
})
export class TiendaService {
  public stateFormulario = false;
  public updateFormulario = false;
  public productoFormulario: productoCompleto = {
    id: 0,
    name: '',
    marca: '',
    descripcion: '',
    price: 0,
    image: [''],
    categoria: '',
    stock: 0,
  };
  public ELEMENT_DATA: productoTabla[] = [];
  private url = `${environment.API_URI}productos`;

  constructor(private http: HttpClient) {}

  async traerProductos(productosMostrar: any[] = [], search: string = "") {
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
    if (search !== "")
      data['criterion'] = search;
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
    return this.http.get(`${this.url}/`);
  }

  mostrarFormulario(state: boolean, fun: boolean): void {
    this.stateFormulario = state;
    this.updateFormulario = fun;
  }

  enviarProducto(): void {
    this.http.post(`${this.url}`, this.productoFormulario).subscribe((data) => {
      const data2 = JSON.parse(JSON.stringify(data));
      alert(data2.msg);
    });
  }

  actualizarProducto(id: number): void {
    this.http
      .put(`${this.url}/${id}`, this.productoFormulario)
      .subscribe((data) => {
        const data2 = JSON.parse(JSON.stringify(data));
        alert(data2.msg);
      });
  }

  traerUnProducto(id: number): void {
    this.http.get(`${this.url}/${id}`).subscribe((data) => {
      const data2 = JSON.parse(JSON.stringify(data));
      if (data2.msg === 'No encontrado') {
        alert('Producto no encontrado');
        return;
      }
      this.productoFormulario.id = data2.msg.id;
      this.productoFormulario.name = data2.msg.name;
      this.productoFormulario.categoria = data2.msg.categoria;
      this.productoFormulario.descripcion = data2.msg.descripcion;
      this.productoFormulario.image = data2.msg.image;
      this.productoFormulario.marca = data2.msg.marca;
      this.productoFormulario.price = data2.msg.price;
      this.productoFormulario.stock = data2.msg.stock;
    });
  }

  eliminarProducto(id: number): void {
    this.http.delete(`${this.url}/${id}`).subscribe((data) => {
      const data2 = JSON.parse(JSON.stringify(data));
      alert(data2.msg);
    });
  }

  

}

