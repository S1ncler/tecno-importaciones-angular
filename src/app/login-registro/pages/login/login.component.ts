import { Component } from '@angular/core';
import { RegistroService } from '../../services/login-registro.service';
import Swal from 'sweetalert2';
import jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(public RegisterService: RegistroService, private router: Router) {}

  ngOnInit() {
    window.scrollTo(0, 0);
    this.RegisterService.loginForm.username = undefined;
    this.RegisterService.loginForm.password = undefined;
    let token = localStorage.getItem('token');
    if (token) {
      let decoded: any = jwt_decode(token);
      if (decoded.exp > (new Date().getTime() + 2) / 1000)
        this.router.navigate(['comercio']);
    }
  }

  showModal() {
    Swal.fire({
      title: 'Recuperar contraseña',
      text: 'Escribe el email con el que te registraste',
      input: 'email',
      inputPlaceholder: 'example@correo.com',
      showCloseButton: true,
      confirmButtonText: 'enviar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.RegisterService.sendEmail(result.value);
        Swal.fire({
          icon: 'success',
          text: 'Si el email es correcto te llegara un link de recuperacion',
        });
      }
    });
  }
}
