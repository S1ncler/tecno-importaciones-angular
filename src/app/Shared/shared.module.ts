import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { FooterComponent } from './components/footer/footer.component';
import { LogoWhatsComponent } from './components/logo-whats/logo-whats.component';



@NgModule({
  declarations: [
    NavBarComponent,
    FooterComponent,
    LogoWhatsComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    NavBarComponent,
    FooterComponent,
    LogoWhatsComponent
  ]
})
export class SharedModule { }
