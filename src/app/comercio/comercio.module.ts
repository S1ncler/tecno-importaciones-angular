import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TiendaComponent } from './pages/tienda/tienda.component';
import { ComercioRoutingModule } from './comercio-routing.module';
import { SharedModule } from '../Shared/shared.module';



@NgModule({
  declarations: [
    TiendaComponent
  ],
  imports: [
    CommonModule,
    ComercioRoutingModule,
    SharedModule
  ]
})
export class ComercioModule { }
