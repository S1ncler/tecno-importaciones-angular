import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.css'],
})
export class AsideComponent {
  marcas: string[] = [];
  precioRangos: any;
  categorias: string[] = [];
  expand: boolean = true;
  productosMostrar: JSON[] = [];

  async ngOnInit() {
    const url2: string = 'http://localhost:3000/api/dbti/getmarcas?cantidad=5';
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

  @Output() productosMostrarChange = new EventEmitter<JSON[]>();
  //se crea una funcion que va a devolver la variable al componente padre
  async emitProductosMostrarChange(query: string) {
    localStorage.setItem('query', query);
    const url: string = `http://localhost:3000/api/dbti/getrandomproducts?categoria=${query}`;
      await fetch(url)
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
      const url2: string = 'http://localhost:3000/api/dbti/getmarcas?cantidad=5';
      await fetch(url2)
        .then((response) => response.json())
        .then((data) => {
          this.marcas = data;
        })
        .catch((error: any) => {
          console.log(error);
        });
    } else {
      const url2: string = 'http://localhost:3000/api/dbti/getmarcas';
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

}
