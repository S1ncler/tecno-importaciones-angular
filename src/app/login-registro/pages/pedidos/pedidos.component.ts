import { Component } from '@angular/core';
import { RegistroService } from 'src/app/login-registro/services/login-registro.service';


@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent {
  token: any = {
    exp: '',
    iat: '',
    username: '',
  };
  constructor(public RegisterService: RegistroService) {
  }
  ngOnInit() {
    window.scrollTo(0, 0);
    this.getUser()
  }

  getUser() {
    this.token = this.RegisterService.decodeToken();
    this.RegisterService.usuarioPropio(this.token.email).subscribe(
      (res: any) => {
        this.RegisterService.user = JSON.parse(JSON.stringify(res)) || [];
      }
    );
  }

}
