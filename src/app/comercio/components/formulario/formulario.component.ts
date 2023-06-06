import { Component } from '@angular/core';
import { TiendaService } from '../../services/tienda.service';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent {

  constructor(public tiendaService: TiendaService) {}

  guardar() {
    if (this.tiendaService.updateFormulario)
      this.tiendaService.actualizarProducto(this.tiendaService.productoFormulario.id);
    else
      this.tiendaService.enviarProducto();
    this.tiendaService.mostrarFormulario(false, false);
  }

}
