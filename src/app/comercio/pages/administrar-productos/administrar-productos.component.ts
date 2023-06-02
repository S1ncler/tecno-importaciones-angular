import { Component } from '@angular/core';
import { TiendaService } from '../../services/tienda.service';

@Component({
  selector: 'app-administrar-productos',
  templateUrl: './administrar-productos.component.html',
  styleUrls: ['./administrar-productos.component.css']
})
export class AdministrarProductosComponent {

  constructor(public tiendaService: TiendaService) {}

}
