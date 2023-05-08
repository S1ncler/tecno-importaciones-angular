import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TiendaComponent } from './pages/tienda/tienda.component';

const routes: Routes = [
  {
    path: "",
    component: TiendaComponent
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
