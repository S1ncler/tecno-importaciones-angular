import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TiendaComponent } from './pages/tienda/tienda.component';
import { ComercioRoutingModule } from './comercio-routing.module';
import { SharedModule } from '../Shared/shared.module';
import { SquareCardComponent } from './components/square-card/square-card.component';
import { HorizontalCardComponent } from './components/horizontal-card/horizontal-card.component';
import { AsideComponent } from './components/aside/aside.component';
import { AsideCollapseComponent } from './components/aside-collapse/aside-collapse.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    TiendaComponent,
    SquareCardComponent,
    HorizontalCardComponent,
    AsideComponent,
    AsideCollapseComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    ComercioRoutingModule,
    SharedModule
  ]
})
export class ComercioModule { }