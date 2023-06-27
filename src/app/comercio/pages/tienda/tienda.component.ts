import { Component, OnInit } from '@angular/core';
import { TiendaService } from '../../services/tienda.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.css'],
})
export class TiendaComponent implements OnInit {
  // valor que guarda la opcion con la que ordenar
  opcionOrdenar: string = 'ordenar';

  constructor(
    private tiendaService: TiendaService,
    private router: ActivatedRoute
  ) {
    // recibe el parametro de la url para pasarlo a la funcion de busqueda
    this.router.params.subscribe((data) => {
      this.search(data['search']);
      this.searching = data['search'];
    });
  }

  // para saber si hay algun filtro de precio aplicado
  filtradoPrecio: boolean = false;
  // almacenar los productos completos cuando haya un filtro de precios
  productos: any[] = [];
  // almacena los productos que se muestran al usuario
  productosMostrar: any[] = [];

  horVer: boolean = false;
  // almacena 4 rangos de precios de los productos que se estan mostrando a usuario
  rangosPrecios: any[] = [];
  //almacena la busqueda del usuario
  searching?: string;

  // ejecucion apenas se carga el componente
  async ngOnInit(): Promise<void> {
    window.scrollTo(0, 0);
    // realiza una consulta inicial de 10 productos random

    // obtiene el rango de precios de los productos que se estan mostrando
    this.rangosPrecios = this.tiendaService.getPrecios(this.productosMostrar);
  }

  // funcion que se ejecuta en caso de que se accione el boton de mostrar mas productos
  async mostrarMas() {
    await this.tiendaService
      .traerProductos(
        this.productosMostrar,
        this.searching ? this.searching : ''
      )
      .then((data) => (this.productosMostrar = data));
    // obtiene el rango de precios de los productos que se estan mostrando
    this.rangosPrecios = this.tiendaService.getPrecios(this.productosMostrar);
  }

  horVerchanger(bool: boolean) {
    this.horVer = bool;
  }

  // obtiene los productos que se deben mostrar cuando se establecio un filtro en alguno
  // de los componentes aside y tambien su rango de precios
  getporductosMostrar(otrosProductos: JSON[]) {
    this.productosMostrar = otrosProductos;
    // obtiene el rango de precios de los productos que se estan mostrando
    this.rangosPrecios = this.tiendaService.getPrecios(this.productosMostrar);
  }

  // realiza el filtrado por precio
  filtroPrecio(rangoprecio: number[]) {
    if (rangoprecio[0] === -1) {
      this.productosMostrar = this.productos;
      return;
    }
    if (!this.filtradoPrecio) this.productos = this.productosMostrar;
    this.filtradoPrecio = true;
    this.productosMostrar = [];
    for (let producto of this.productos)
      if (producto.price >= rangoprecio[0] && producto.price <= rangoprecio[1])
        this.productosMostrar.push(producto);
  }

  // funcion para ordenar segun lo que escoja el usuario
  ordenar() {
    this.productosMostrar = this.tiendaService.ordenar(
      this.productosMostrar,
      this.opcionOrdenar
    );
  }

  // funcion que ejecuta la busqueda en la api deacuerdo al valor ingresador por el usuario
  async search(search: string) {
    if (search) {
      await this.tiendaService
        .traerProductos([], search)
        .then((data) => (this.productosMostrar = data));
      this.rangosPrecios = this.tiendaService.getPrecios(this.productosMostrar);
    } else {
      await this.tiendaService
        .traerProductos()
        .then((data) => (this.productosMostrar = data));
      this.rangosPrecios = this.tiendaService.getPrecios(this.productosMostrar);
    }
  }
}
