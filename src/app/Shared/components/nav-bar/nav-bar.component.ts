import { Component, OnInit } from '@angular/core';
import { NavBarService } from '../../services/nav-bar.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit{
  token:any= {
    exp: "",
    iat:"",
    username:""
  }

  // variable con la cantidad de items del carrito
  cartCant: number = 0;

  //variable para saber si el token existe
  tokenExist: boolean = false;
// nombre y appellido 

  // llama el servicio del navbar
  constructor(public navBarService: NavBarService) {
    this.cartCant = navBarService.loadCart();
    this.tokenExist = navBarService.testToken();
   }

  ngOnInit() {
    this.navBarService.getProductosCarrito$().subscribe(productosCarrito => {
      this.cartCant = productosCarrito.length;
      
    });
   

  }

  // getUser() {
  //   this.token = this.navBarService.decodeToken()
  //   this.navBarService.usuarioPropio(this.token.email).subscribe((res: any) => {
  //     this.navBarService.user = JSON.parse(JSON.stringify(res)) || [];
  //   })
  // }
 

  eliminarToken() {
    this.navBarService.removeToken();
    this.tokenExist = this.navBarService.testToken()
  }


  
  
}
