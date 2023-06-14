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



@NgModule({
  declarations: [
    RegistroComponent,
    LoginComponent,
    AdminUsersComponent,
    FormComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    LoginRegistroRoutingModule,
    SharedModule,
    HttpClientModule,
  ],
  providers: [
    RegistroService,
    AdminUserService
  ]
})
export class LoginRegistroModule { }
