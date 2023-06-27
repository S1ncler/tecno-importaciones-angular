import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import { NosotrosComponent } from './pages/nosotros/nosotros.component';
import { paginasPrincipalesRoutingModule } from './paginas-principales-routing.module';
import { Page404Component } from './pages/page404/page404.component';
import { DesarrolloComponent } from './pages/desarrollo/desarrollo.component';
import { PoliticasComponent } from './pages/politicas/politicas.component';



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
