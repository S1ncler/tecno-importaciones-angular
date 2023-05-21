import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistroComponent } from './pages/registro/registro.component';

const routes: Routes = [
  {
    path: "registro",
    component: RegistroComponent
  },
  {
    path: "",
    redirectTo: "/registro",
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRegistroRoutingModule { }
