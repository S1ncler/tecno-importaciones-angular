import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TiendaComponent } from './pages/tienda/tienda.component';
import { AdministrarProductosComponent } from './pages/administrar-productos/administrar-productos.component';

const routes: Routes = [
  {
    path: "",
    component: TiendaComponent
  },
  {
    path: "administrar",
    component: AdministrarProductosComponent
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
