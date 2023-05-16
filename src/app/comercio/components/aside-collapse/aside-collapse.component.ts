import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-aside-collapse',
  templateUrl: './aside-collapse.component.html',
  styleUrls: ['./aside-collapse.component.css'],
})
export class AsideCollapseComponent {
  marcas: string[] = [];
  precioRangos: any;
  categorias: string[] = [];
  expand: boolean = true;
  productosMostrar: JSON[] = [];
  filtros: boolean = false;

  async ngOnInit() {
    const url2: string = 'http://localhost:3002/productos/marcas';
    await fetch(url2)
      .then((response) => response.json())
      .then((data) => {
        data = data.slice(0, 5);
        this.marcas = data;
      })
      .catch((error: any) => {
        console.log(error);
      });

    const url3: string = 'http://localhost:3002/productos/categorias';
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
  @Output() productosMostrarChange = new EventEmitter<JSON[]>();
  //se crea una funcion que va a devolver la variable al componente padre
  async emitProductosMostrarChange(typeQuery: string = "", query: string = "") {
    this.filtros = true;
    if (typeQuery === 'marca') {
      localStorage.setItem('typeQuery', typeQuery);
      localStorage.setItem('query', query);
    }
    if (typeQuery === 'categoria') {
      localStorage.setItem('typeQuery2', typeQuery);
      localStorage.setItem('query2', query);
    }
    let data: Record<string, any> = {};
    if (localStorage.getItem('typeQuery'))
      data[localStorage.getItem('typeQuery') || ''] =
        localStorage.getItem('query');
    if (localStorage.getItem('typeQuery2'))
      data[localStorage.getItem('typeQuery2') || ''] =
        localStorage.getItem('query2');
    const url: string = `http://localhost:3002/productos/r`;
    await fetch(url, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        this.productosMostrar = data;
      })
      .catch((error: any) => {
        console.log(error);
      });

    //cada vez que se ejeucta la funcion se devuelve la variable al componente padre mediante el evento
    this.productosMostrarChange.emit(this.productosMostrar);
  }

  async expandChanger(bool: boolean) {
    this.expand = bool;
    if (bool) {
      const url2: string = 'http://localhost:3002/productos/marcas';
      await fetch(url2)
        .then((response) => response.json())
        .then((data) => {
          data = data.slice(0, 5);
          this.marcas = data;
        })
        .catch((error: any) => {
          console.log(error);
        });
    } else {
      const url2: string = 'http://localhost:3002/productos/marcas';
      await fetch(url2)
        .then((response) => response.json())
        .then((data) => {
          this.marcas = data;
        })
        .catch((error: any) => {
          console.log(error);
        });
    }
  }

  eliminarFiltros() {
    localStorage.removeItem('typeQuery');
    localStorage.removeItem('query');
    localStorage.removeItem('typeQuery2');
    localStorage.removeItem('query2');
    this.emitProductosMostrarChange();
    this.filtros = false;
  }
}
