import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-aside-collapse',
  templateUrl: './aside-collapse.component.html',
  styleUrls: ['./aside-collapse.component.css'],
})
export class AsideCollapseComponent {
  // almacena las marcas para filtrar por marca
  marcas: string[] = [];
  // recibe los rangos de precios de los productos que se estan mostrando a usuario
  @Input() RangoPrecios: any;
  // almacena las categorias de productos para filtrar
  categorias: string[] = [];
  // controla si se estan mostrando todas las marcas o solo 5
  expand: boolean = true;
  // almacena los productos que se muestran al usuario cuando se aplica un filtro
  // para luego devolverlos al componente tienda
  productosMostrar: JSON[] = [];
  // controla si hay filtros aplicados
  filtros: boolean = false;

  // se ejecuta cuando se muestra el componente por primera vez
  async ngOnInit() {
    // hace una peticion a la api de las marcas de los procutos
    const url2: string = 'http://localhost:3002/productos/marcas';
    await fetch(url2)
      .then((response) => response.json())
      .then((data) => {
        // selecciona las 5 primeras marcas para mostrarlas
        data = data.slice(0, 5);
        // almacena las marcas
        this.marcas = data;
      })
      .catch((error: any) => {
        console.log(error);
      });

    // realiza la peticion a la api de las categorias de productos
    const url3: string = 'http://localhost:3002/productos/categorias';
    await fetch(url3)
      .then((response) => response.json())
      .then((data) => {
        // almacena las categorias de productos
        this.categorias = data;
      })
      .catch((error: any) => {
        console.log(error);
      });
    // verifica si hay filtros y activa el boton de eliminar filtros
    if (localStorage.getItem('typeQuery') || localStorage.getItem('typeQuery2'))
      this.filtros = true;
  }

  // funcion que se ejecuta al momento de aplicar un filtro y devuelve  la nueva lista
  // de productos a mostrar con los filtros aplicados
  @Output() productosMostrarChange = new EventEmitter<JSON[]>();
  //se crea una funcion que va a devolver la variable al componente padre
  async emitProductosMostrarChange(typeQuery: string = '', query: string = '') {
    // se selecciona que si hay filtros
    this.filtros = true;
    // evalua si se filtro por marca y almacena en el local storage el filtro
    if (typeQuery === 'marca') {
      localStorage.setItem('typeQuery', typeQuery);
      localStorage.setItem('query', query);
    }
    // evalua si se filtro por categoria y almacena en el local storage el filtro
    if (typeQuery === 'categoria') {
      localStorage.setItem('typeQuery2', typeQuery);
      localStorage.setItem('query2', query);
    }
    // realiza la consulta a la api con los nuevos filtros aplicados
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

  // funcion que genera el filtro por rango de precios al componente tienda
  @Output() filtroPrecio = new EventEmitter<number[]>();
  // devuelve el rango de precios seleccionado por el usuario para que lo aplique la funcion
  // del componente tienda
  async emitfitroPrecioChange(rango: number[]) {
    this.filtros = true;
    this.filtroPrecio.emit(rango);
  }

  // funcion que cambia la cantidad de marcas que ve el usuario para filtrar
  async expandChanger(bool: boolean) {
    // cambia el estado de si esta expandido
    this.expand = bool;
    // si se debe ocultar y muestra solo 5 marcas
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
    }
    // si se deben mostrar todas las marcas
    else {
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

  // elimina todos los filtros aplicados
  eliminarFiltros() {
    let otherFilters = false;
    if (localStorage.getItem('typeQuery') || localStorage.getItem('typeQuery2'))
      otherFilters = true;
    if (otherFilters) {
      localStorage.removeItem('typeQuery');
      localStorage.removeItem('query');
      localStorage.removeItem('typeQuery2');
      localStorage.removeItem('query2');
      this.emitProductosMostrarChange();
    }
    this.emitfitroPrecioChange([-1, 0]);
    this.filtros = false;
  }
}
