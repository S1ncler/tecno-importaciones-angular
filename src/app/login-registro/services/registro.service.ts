import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { user } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class RegistroService {
  constructor(private http: HttpClient) {}

  registrar(formUser: FormGroup): Observable<any> {
    let url = `http://localhost:3002/auth/register`;
    return this.http.post(url, formUser.value);
  }
  async validarNick(formUser: FormGroup): Promise<boolean> {
    let url = `http://localhost:3002/usuarios/${formUser.value.username}`;
    let retornador: boolean = true;
    await fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data.username === formUser.value.username) retornador = false;
      });
    return retornador;            
  }
  compararFecha(formUser: FormGroup): boolean {
    return new Date(formUser.value.cumpleanos || '').getTime() < new Date().getTime() - (1000 * 60 * 60 * 24 * 365 * 18);
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
    const tieneLongitudSuficiente =
      formUser.value.contrasena || ''.length >= 8;
    if (tieneMayuscula &&
      tieneMinuscula &&
      tieneNumero &&
      tieneSimbolo &&
      tieneLongitudSuficiente)return true;
    else return false
  }
  confirmarContrasena(formUser: FormGroup, contrasena2: string): boolean {
    if (formUser.value.contrasena === contrasena2) return true;
    else return false;
  }
}
