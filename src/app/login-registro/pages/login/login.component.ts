import { Component } from '@angular/core';
import { RegistroService } from '../../services/login-registro.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(public RegisterService: RegistroService) {}

}
