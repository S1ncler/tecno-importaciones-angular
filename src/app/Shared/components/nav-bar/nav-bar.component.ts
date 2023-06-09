import { Component, OnInit } from '@angular/core';
import { NavBarService } from '../../services/nav-bar.service';
import { TiendaService } from 'src/app/comercio/services/tienda.service';
import { Router } from '@angular/router';
import { RegistroService } from 'src/app/login-registro/services/login-registro.service';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  token: any = {
    exp: '',
    iat: '',
    username: '',
  };

  searchBar?: string;
 
  // variable con la cantidad de items del carrito
  cartCant: number = 0;

  //variable para saber si el token existe
  tokenExist:boolean;
// nombre y appellido 

  // llama el servicio del navbar
  constructor(public navBarService: NavBarService , public RegisterService: RegistroService,private router: Router,) {
    this.cartCant = navBarService.loadCart();
    this.tokenExist = navBarService.testToken();
  }

  ngOnInit() {
    // se suscribe a los cambios del tocken
    this.navBarService.getTokenExist$().subscribe((token) => {
      this.tokenExist = token;
    }) 
    // se suscribe a los cambios del tocken
    this.navBarService.getProductosCarrito$().subscribe((productosCarrito) => {
      this.cartCant = productosCarrito.length;
    });
    this.getUser()       
    this.tokenExist = this.navBarService.testToken();
  }

  getUser() {
    this.token = this.RegisterService.decodeToken();
    this.RegisterService.usuarioPropio(this.token.email).subscribe(
      (res: any) => {
        this.RegisterService.user = JSON.parse(JSON.stringify(res)) || [];
      }
    );
  }
 

  eliminarToken() {
    this.navBarService.removeToken();
    this.router.navigate(['/principal/home']);
  }

  search() {
    if (this.searchBar) {
      if (this.searchBar !== '') {
        this.navBarService.search(this.searchBar);
      }
    }
  }
}
