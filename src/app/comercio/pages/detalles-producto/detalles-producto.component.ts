import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TiendaService, productoCompleto } from '../../services/tienda.service';
import { NavBarService } from 'src/app/Shared/services/nav-bar.service';


@Component({
  selector: 'app-detalles-producto',
  templateUrl: './detalles-producto.component.html',
  styleUrls: ['./detalles-producto.component.css']
})


export class DetallesProductoComponent {

  producto: productoCompleto = {
    id: 0,
    name: '',
    marca: '',
    descripcion: '',
    price: 0,
    image: [''],
    categoria: '',
    stock: 0,
  };

  id:number = 0;
  constructor(private router: ActivatedRoute, private tiendaservice:TiendaService,
               public narbarservice: NavBarService, public imageproducto: TiendaService){}

  async ngOnInit(){
    this.id = this.router.snapshot.params['id'];
    this.tiendaservice.traerUnProducto(this.id);
    this.producto = this.tiendaservice.productoFormulario
  }

  
}




