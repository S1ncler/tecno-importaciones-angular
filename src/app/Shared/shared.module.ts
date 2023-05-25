import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { FooterComponent } from './components/footer/footer.component';
import { LogoWhatsComponent } from './components/logo-whats/logo-whats.component';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatBadgeModule} from '@angular/material/badge';
import { RouterLink } from '@angular/router';
import { TiendaService } from '../comercio/services/tienda.service';




@NgModule({
  declarations: [
    NavBarComponent,
    FooterComponent,
    LogoWhatsComponent
  ],
  imports: [
    CommonModule,    
    MatBadgeModule, 
    MatButtonModule, 
    MatIconModule,
    RouterLink
  ],
  providers: [TiendaService],
  exports:[
    NavBarComponent,
    FooterComponent,
    LogoWhatsComponent
  ]
})
export class SharedModule { }
