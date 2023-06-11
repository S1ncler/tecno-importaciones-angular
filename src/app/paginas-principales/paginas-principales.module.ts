import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import { NosotrosComponent } from './pages/nosotros/nosotros.component';
import { paginasPrincipalesRoutingModule } from './paginas-principales-routing.module';



@NgModule({
  declarations: [
    HomeComponent,
    NosotrosComponent
  ],
  imports: [
    CommonModule,
    paginasPrincipalesRoutingModule
  ]
})
export class PaginasPrincipalesModule { }
