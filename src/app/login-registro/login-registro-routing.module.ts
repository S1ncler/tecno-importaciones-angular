import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistroComponent } from './pages/registro/registro.component';
import { LoginComponent } from './pages/login/login.component';
import { AdminUsuarioPropioComponent } from './pages/admin-usuario-propio/admin-usuario-propio.component';

const routes: Routes = [
  {
    path: "registro",
    component: RegistroComponent
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "usuario-propio",
    component: AdminUsuarioPropioComponent
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
