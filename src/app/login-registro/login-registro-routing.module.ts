import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistroComponent } from './pages/registro/registro.component';
import { LoginComponent } from './pages/login/login.component';
import { AdminUsuarioPropioComponent } from './pages/admin-usuario-propio/admin-usuario-propio.component';
import { AdminUsersComponent } from './pages/admin-users/admin-users.component';
import { ForgPassComponent } from './pages/forg-pass/forg-pass.component';
import { PayguardGuard } from '../guards/payguard.guard';
import { PedidosComponent } from './pages/pedidos/pedidos.component';

const routes: Routes = [
  {
    path: "registro",
    component: RegistroComponent
  },
  {
    path: "manageUsers",
    canActivate: [PayguardGuard],
    component: AdminUsersComponent
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "usuario-propio",
    canActivate: [PayguardGuard],
    component: AdminUsuarioPropioComponent
  },
  {
    path: "forgpass/:token",
    component: ForgPassComponent
  },
  {
    path: "pedidos",
    canActivate: [PayguardGuard],
    component: PedidosComponent
  },
  {
    path: "",
    redirectTo: "/registro",
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class LoginRegistroRoutingModule { }
