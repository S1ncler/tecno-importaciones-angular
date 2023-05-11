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

  @Output() titleChange = new EventEmitter<string>();
  //se crea una funcion que va a devolver la variable al componente padre
  emitTitleChange() {
    //cada vez que se ejeucta la funcion se devuelve la variable al componente padre mediante el evento
    //this.titleChange.emit(this.title);
  }

  async expandChanger(bool: boolean) {
    this.expand = bool;
    if (bool) {
      const url2: string = 'http://localhost:3000/api/dbti/get5marcas';
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
