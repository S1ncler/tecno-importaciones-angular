import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NosotrosComponent } from './pages/nosotros/nosotros.component';


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
