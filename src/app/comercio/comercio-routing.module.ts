import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TiendaComponent } from './pages/tienda/tienda.component';
import { AdministrarProductosComponent } from './pages/administrar-productos/administrar-productos.component';
import { CarritoComponent } from './pages/carrito/carrito.component';
import { DetallesProductoComponent } from './pages/detalles-producto/detalles-producto.component';

const routes: Routes = [
  {
    path: "",
    component: TiendaComponent
  },
  {
    path: "administrar",
    component: AdministrarProductosComponent
  },
  {
    path: "tusCompras",
    component: CarritoComponent
  },
  {
    path: "detallesProductos",
    component: DetallesProductoComponent
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class ComercioRoutingModule { }
