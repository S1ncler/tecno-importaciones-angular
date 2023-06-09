import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import { NosotrosComponent } from './pages/nosotros/nosotros.component';



@NgModule({
  declarations: [
    HomeComponent,
    NosotrosComponent
  ],
  imports: [
    CommonModule
  ]
})
export class PaginasPrincipalesModule { }
