import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRegistroRoutingModule } from './login-registro-routing.module';
import { RegistroComponent } from './pages/registro/registro.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../Shared/shared.module';


@NgModule({
  declarations: [
    RegistroComponent
  ],
  imports: [    
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    LoginRegistroRoutingModule,
    SharedModule
  ]
})
export class LoginRegistroModule { }
