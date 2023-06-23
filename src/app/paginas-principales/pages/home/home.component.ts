import { Component, OnInit } from '@angular/core';
import { ProductHomeService } from '../../api/products-home/product-home.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
 
  public mostrarCuadro1: boolean = false;
  public mostrarCuadro2: boolean = false;
  public mostrarCuadro3: boolean = false;
  public mostrarCuadro4: boolean = false;
  public mostrarCuadro5: boolean = false;
  public mostrarCuadro6: boolean = false;
  public mostrarCuadro7: boolean = false;
  public mostrarCuadro8: boolean = false;
  
  constructor(private router: Router, private productHomeService: ProductHomeService) { }

  public toggleCuadro(cuadro: string): void {
    switch (cuadro) {
      case 'cuadro1':
        this.mostrarCuadro1 = !this.mostrarCuadro1;
        break;
      case 'cuadro2':
        this.mostrarCuadro2 = !this.mostrarCuadro2;
        break;
      case 'cuadro3':
        this.mostrarCuadro3 = !this.mostrarCuadro3;
        break;
      case 'cuadro4':
        this.mostrarCuadro4 = !this.mostrarCuadro4;
        break;
      case 'cuadro5':
        this.mostrarCuadro5 = !this.mostrarCuadro5;
        break;
      case 'cuadro6':
        this.mostrarCuadro6 = !this.mostrarCuadro6;
        break;
      case 'cuadro7':
        this.mostrarCuadro7 = !this.mostrarCuadro7;
        break;
      case 'cuadro8':
        this.mostrarCuadro8 = !this.mostrarCuadro8;
        break;
      default:
        break;
    }
  };
  categorias = [
    {
      nombre: 'Tarjetas Gráficas',
      imagen: '../../../../assets/images/tarjeta-de-video.png'
    },
    {
      nombre: 'Memorias Ram',
      imagen: '../../../../assets/images/memoria-ram.png'
    },
    {
      nombre: 'Fuentes de poder',
      imagen: '../../../../assets/images/fuente-de-alimentacion.png'
    },
    {
      nombre: 'Motherboards',
      imagen: '../../../../assets/images/Motherboard.jpeg'
    }
  ];

  nuevosProductos = [
    {
      nombre: 'Producto 1',
      imagen: '../../../../assets/images/tarjeta-de-video.png'
    },
    {
      nombre: 'Producto 2',
      imagen: '../../../../assets/images/memoria-ram.png'
    },
    {
      nombre: 'Producto 3',
      imagen: '../../../../assets/images/fuente-de-alimentacion.png'
    },
    {
      nombre: 'Producto 4',
      imagen: '../../../../assets/images/Motherboard.jpeg'
    }
  ];

  
  redireccionarTienda(categoria: string): void {
    // Guardar los valores en el localStorage
    localStorage.setItem('typeQuery2', 'categoria');
    localStorage.setItem('query2', categoria);

    // Redireccionar a la página de la tienda
    this.router.navigate(['/comercio']);

    // Emitir el evento para actualizar los productos en la tienda
    this.emitProductosMostrarChange('categoria', categoria);
  }

  async emitProductosMostrarChange(typeQuery: string, query: string): Promise<void> {
    localStorage.setItem('typeQuery2', typeQuery);
    localStorage.setItem('query2', query);

    const data: Record<string, any> = {};
    if (localStorage.getItem('typeQuery')) {
      data[localStorage.getItem('typeQuery') || ''] = localStorage.getItem('query');
    }
    if (localStorage.getItem('typeQuery2')) {
      data[localStorage.getItem('typeQuery2') || ''] = localStorage.getItem('query2');
    }
    const url: string = `http://localhost:3002/productos/r`;

    try {
      const response = await fetch(url);
      const result = await response.json();
      // Hacer algo con el resultado de la llamada a la API
    } catch (error) {
      console.log(error);
    }
  }

  
}



