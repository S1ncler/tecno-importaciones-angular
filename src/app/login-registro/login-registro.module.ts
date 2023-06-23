import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRegistroRoutingModule } from './login-registro-routing.module';
import { RegistroComponent } from './pages/registro/registro.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../Shared/shared.module';
import { LoginComponent } from './pages/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { RegistroService } from './services/login-registro.service';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { ForgPassComponent } from './pages/forg-pass/forg-pass.component';



@NgModule({
  declarations: [
    RegistroComponent,
    LoginComponent,
    ForgPassComponent,
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
  providers: [RegistroService]
})
export class LoginRegistroModule { }
