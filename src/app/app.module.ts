import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './Shared/shared.module';
import { TiendaService } from './comercio/services/tienda.service';
import { CarritoComponent } from './comercio/pages/carrito/carrito.component';
import { AdminUserService } from "./login-registro/services/admin-user.service";


@NgModule({
  declarations: [
    AppComponent,
    CarritoComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
  ],
  providers: [
    TiendaService,
    AdminUserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
