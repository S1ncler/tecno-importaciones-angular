import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { user } from '../interfaces/user.interface';
import { User } from 'src/app/models/user.model';
import Swal from 'sweetalert2';
import { NavBarService } from 'src/app/Shared/services/nav-bar.service';

@Injectable({
  providedIn: 'root',
})
export class RegistroService {
  userToUpdate: User = new User();
  user: user = {
    _id: '',
    username: '',
    nombre: '',
    email: '',
    cumpleanos: "",
    telefono: '',
    contrasena: '',
    departamento: '',
    ciudad: '',
    direccion: '',
    complemento: '',
    codigoPostal: '',
    rol:'',
    facturas:[]
  };
  token: string = '';
  loginForm: any = {
    username: '',
    password: '',
  };

  constructor(private http: HttpClient, private router: Router, private navbarService: NavBarService) {}
  usuarioPropio(usuario: string) {
    const url = environment.API_URI + `usuarios/${usuario}`;
    return this.http.get(url);
  }
  updateUser(usuario: User) {
    const url = environment.API_URI + `usuarios`;
    let data = {
      _id: usuario._id,
      dataToUpdate: usuario,
    };
    return this.http.put(`${url}`, data);
  }

  login() {
    const url = environment.API_URI + 'auth/login';
    this.http
      .post(`${url}`, {
        email: this.loginForm.username,
        contraseña: this.loginForm.password,
      })
      .subscribe((res) => {
        const res2 = JSON.parse(JSON.stringify(res));
        if (res2.token) {
          this.token = res2.token;
          localStorage.setItem('token', this.token);
          this.navbarService.testToken();
          this.router.navigate(['comercio/tienda']);
        } else {
          Swal.fire({
            title: "Error",
            text: 'Usuario o contraseña incorrectos',
            icon: "error"
          })
        }
      });
  }

  registrar(formUser: FormGroup): Observable<any> {
    let url = `http://localhost:3002/auth/register`;
    return this.http.post(url, formUser.value);
  }
  async validarNick(formUser: FormGroup): Promise<boolean> {
    let url = `http://localhost:3002/usuarios/${formUser.value.username}`;
    let retornador: boolean = true;
    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data.username === formUser.value.username) retornador = false;
      });
    return retornador;
  }
  compararFecha(formUser: FormGroup): boolean {
    return (
      new Date(formUser.value.cumpleanos || '').getTime() <
      new Date().getTime() - 1000 * 60 * 60 * 24 * 365 * 18
    );
  }
  validarTel(formUser: FormGroup): boolean {
    var numbers = /^[0-9+]+$/;
    if (numbers.test(formUser.value.telefono || '')) return true;
    else return false;
  }
  validarContrasena(formUser: FormGroup): boolean {
    const tieneMayuscula = /[A-Z]/.test(formUser.value.contrasena || '');
    const tieneMinuscula = /[a-z]/.test(formUser.value.contrasena || '');
    const tieneNumero = /[0-9]/.test(formUser.value.contrasena || '');
    const tieneSimbolo = /[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/.test(
      formUser.value.contrasena || ''
    );
    const tieneLongitudSuficiente = formUser.value.contrasena || ''.length >= 8;
    if (
      tieneMayuscula &&
      tieneMinuscula &&
      tieneNumero &&
      tieneSimbolo &&
      tieneLongitudSuficiente
    )
      return true;
    else return false;
  }
  confirmarContrasena(formUser: FormGroup, contrasena2: string): boolean {
    if (formUser.value.contrasena === contrasena2) return true;
    else return false;
  }


  isLoggedIn() {
    return localStorage.getItem('token') ? true : false;
  }


  decodeToken() {
    const token = localStorage.getItem('token');
    const decoded = jwtDecode(token ? token : 'Error en el token');
    return decoded;
  }

  sendEmail(email: string) {
    const url = environment.API_URI + 'auth/forgpass';
    const link = 'http://localhost:4200/usuarios/forgpass/';
    this.http.post(url, { email: email, link: link }).subscribe((res) => {
      const res2 = JSON.parse(JSON.stringify(res));
      if (res2.msg === 'Email sended ok') console.log(res2.msg);
      else console.log('Error sending email');
    });
  }

  updatePass(email: string, pass: string) {

    let updateOk = false;
    const url = environment.API_URI + 'auth/updatepass';
    this.http.post(url, { email: email, password: pass }).subscribe((res) => {
      const res2 = JSON.parse(JSON.stringify(res));
      if (res2.msg === 'Password updated ok') {
        Swal.fire({
          title: 'Exito',
          text: 'Se cambio tu contraseña correctamente',
          icon: 'success',
        });
        this.router.navigate(['usuarios/login']);
      } else {
        Swal.fire({
          title: 'Error',
          text: 'Hubo un error al actualizar la contraseña',
          icon: 'error',
        });
      }
    });
    return updateOk;
  }
}
