import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { Router } from '@angular/router';
import { user } from '../interfaces/user.interface';
import { User } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class RegistroService {
  userToUpdate: User = new User ()
  user: user = {
    username: "",
    nombre: "",
    email: "",
    cumpleanos: "",
    telefono: "",
    contrasena: "",
    departamento: "",
    ciudad: "",
    direccion: "",
    complemento: "",
    codigoPostal: ""
  }
  token: string = "";
  loginForm: any = {
    username: '',
    password: '',
  };

  constructor(private http: HttpClient, private router: Router) {}
  usuarioPropio(usuario:string){
    const url = environment.API_URI + `usuarios/${usuario}`
    return this.http.get(url)
  }
  updateUser(usuario:string){
    const url = environment.API_URI + `usuarios/${usuario}`
    
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
        if(res2.token){
          this.token = res2.token;
          this.router.navigate(["../../comercio/"]);
        }
        else{
          alert("Usuario o contraseña incorrectos")
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
}
