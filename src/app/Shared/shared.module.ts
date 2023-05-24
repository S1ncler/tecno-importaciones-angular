import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { FooterComponent } from './components/footer/footer.component';
import { LogoWhatsComponent } from './components/logo-whats/logo-whats.component';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatBadgeModule} from '@angular/material/badge';




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
  ],
  exports:[
    NavBarComponent,
    FooterComponent,
    LogoWhatsComponent
  ]
})
export class SharedModule { }
