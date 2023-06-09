import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRegistroRoutingModule } from './login-registro-routing.module';
import { RegistroComponent } from './pages/registro/registro.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../Shared/shared.module';
import { LoginComponent } from './pages/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { RegistroService } from './services/login-registro.service';
import { AdminUsersComponent } from './pages/admin-users/admin-users.component';
import { FormComponent } from './components/form/form.component';
import { AdminUserService } from './services/admin-user.service';
import { TableComponent } from './components/table/table.component';

import { AdminUsuarioPropioComponent } from './pages/admin-usuario-propio/admin-usuario-propio.component';
import { AcordeonComponent } from './components/acordeon/acordeon.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { ForgPassComponent } from './pages/forg-pass/forg-pass.component';
import { PedidosComponent } from './pages/pedidos/pedidos.component';

@NgModule({
  declarations: [
    RegistroComponent,
    LoginComponent,
    AdminUsersComponent,
    FormComponent,
    TableComponent,
    AdminUsuarioPropioComponent,
    AcordeonComponent,
    ForgPassComponent,
    PedidosComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    LoginRegistroRoutingModule,
    SharedModule,
    HttpClientModule,
    SweetAlert2Module,
  ],
  providers: [
    RegistroService,
    AdminUserService
  ]
})
export class LoginRegistroModule { }
