import { Component, OnInit } from '@angular/core';
import { ProductHomeService } from '../../api/products-home/product-home.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
 
  currentIndex = 0;
 
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
      nombre: 'Graficas',
      imagen: '../../../../assets/images/tarjeta-de-video.png'
    },
    {
      nombre: 'Rams',
      imagen: '../../../../assets/images/memoria-ram.png'
    },
    {
      nombre: 'Psus',
      imagen: '../../../../assets/images/fuente-de-alimentacion.png'
    },
    {
      nombre: 'Motherboards',
      imagen: '../../../../assets/images/Motherboard.jpeg'
    },
    {
      nombre: 'Hdds',
      imagen: '../../../../assets/images/hdds.jpeg'
    },
    {
      nombre: 'Procesadores',
      imagen: '../../../../assets/images/procesadores.jpg'
    },
    {
      nombre: 'Ssds',
      imagen: '../../../../assets/images/ssd.png'
    },
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

//CATEGORIAS Y MARCAS GENERAR EN EL LOCAL STORAGE PARA APLICAR FILTROS 
  redireccionarTienda(categoria: string): void {
    // Guarda los valores en el localStorage
    localStorage.setItem('typeQuery2', 'categoria');
    localStorage.setItem('query2', categoria);

    // Cambia a la página de la tienda
    this.router.navigate(['/comercio']);

    this.emitProductosMostrarChange('categoria', categoria);
  }

  async emitProductosMostrarChange(typeQuery: string, query: string): Promise<void> {
    console.log(typeQuery)
    localStorage.setItem('typeQuery2', typeQuery);

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
    } catch (error) {
      console.log(error);
    }
  }

 //Carrusel
  previousSlide() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }
  
  nextSlide() {
    const maxIndex = this.categorias.length - 4;
    if (this.currentIndex < maxIndex) {
      this.currentIndex++;
    }
  }


  //Redirigir marcas 
  redirigir(typeQuery: string, query: string) {
    localStorage.setItem('typeQuery', typeQuery);
    localStorage.setItem('query', query);
    this.router.navigate(['/comercio']);
  }

  
}



