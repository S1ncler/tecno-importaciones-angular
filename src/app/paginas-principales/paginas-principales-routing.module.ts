import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NosotrosComponent } from './pages/nosotros/nosotros.component';
import { DesarrolloComponent } from './pages/desarrollo/desarrollo.component';
import { PoliticasComponent } from './pages/politicas/politicas.component';


const routes: Routes = [
  {
    path: "home",
    component: HomeComponent
  },
  {
    path: "nosotros",
    component: NosotrosComponent
  },
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full"
  },
  {
    path:"desarrollo",
    component: DesarrolloComponent
    
  },
  {
    path: "politicas",
    component: PoliticasComponent
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
export class paginasPrincipalesRoutingModule { }
