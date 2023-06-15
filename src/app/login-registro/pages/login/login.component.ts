import { Component } from '@angular/core';
import { RegistroService } from '../../services/login-registro.service';
import { ForgPassComponent } from '../../components/forg-pass/forg-pass.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(public RegisterService: RegistroService) {}

  showModal() {
    Swal.fire({
      title: 'Recuperar contraseña',
      text: 'Escribe el email con el que te registraste',
      input: 'email',
      inputPlaceholder: 'example@correo.com',
      showCloseButton: true,
      confirmButtonText: 'enviar'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: 'success',
          text: 'Si el email es correcto te llegara un link de recuperacion',
        });
      }
    });
  }
}
