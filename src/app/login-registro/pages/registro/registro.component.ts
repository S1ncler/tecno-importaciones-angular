import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
})
export class RegistroComponent {
  get nombre() {
    return this.formUser.get('nombre') as FormControl;
  }
  get username() {
    return this.formUser.get('username') as FormControl;
  }
  get email() {
    return this.formUser.get('email') as FormControl;
  }
  get cumpleanos() {
    return this.formUser.get('cumpleanos') as FormControl;
  }
  get telefono() {
    return this.formUser.get('telefono') as FormControl;
  }
  get contrasena() {
    return this.formUser.get('contrasena') as FormControl;
  }
  get departamento() {
    return this.formUser.get('departamento') as FormControl;
  }
  get ciudad() {
    return this.formUser.get('ciudad') as FormControl;
  }
  get direccion() {
    return this.formUser.get('direccion') as FormControl;
  }
  get complemento() {
    return this.formUser.get('complemento') as FormControl;
  }
  get codigoPostal() {
    return this.formUser.get('codigoPostal') as FormControl;
  }
  formUser = new FormGroup({
    nombre: new FormControl(``, Validators.required),
    email: new FormControl(``, [Validators.required, Validators.email]),
    username: new FormControl(``, Validators.required),
    cumpleanos: new FormControl(``, Validators.required),
    telefono: new FormControl(``, Validators.required),
    contrasena: new FormControl(``, Validators.required),
    departamento: new FormControl(``, Validators.required),
    ciudad: new FormControl(``, Validators.required),
    direccion: new FormControl(``, Validators.required),
    complemento: new FormControl(``),
    codigoPostal: new FormControl(``),
  });
  valContrasena = '';
  valnick = true;
  valfecha = true;
  valTel = true;
  valCont  = true;
  confirmCont = true
  async registrar() {
    let url = `http://localhost:3002/auth/register`;
    await fetch(url, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.formUser.value),
    })
      .then(response => response.json())
      .then(data => {
        alert(data.msg === "ALREADY_USER" ? "Ya tienes un usuario con este mismo email" : data.msg);
        this.formUser.reset();
        this.valContrasena = '';
      })
      .catch(e => console.log(e));
  }
  async validarNick() {
    let url = `http://localhost:3002/usuarios/${this.formUser.value.username}`;
    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data.username === this.formUser.value.username)
          this.valnick = false;
        else this.valnick = true;
      })
      .catch((e) => console.log(e));
  }
  compararFecha() {
    this.valfecha =
      new Date(this.formUser.value.cumpleanos || '') < new Date('2005-01-01');
  }
  validarTel() {
    var numbers = /^[0-9+]+$/;
    if (numbers.test(this.formUser.value.telefono || '')) this.valTel = true;
    else this.valTel = false;
  }
  validarContrasena() {
    const tieneMayuscula = /[A-Z]/.test(this.formUser.value.contrasena || '');
    const tieneMinuscula = /[a-z]/.test(this.formUser.value.contrasena || '');
    const tieneNumero = /[0-9]/.test(this.formUser.value.contrasena || '');
    const tieneSimbolo = /[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/.test(
      this.formUser.value.contrasena || ''
    );
    const tieneLongitudSuficiente =
      this.formUser.value.contrasena || ''.length >= 8;
    if (tieneMayuscula &&
      tieneMinuscula &&
      tieneNumero &&
      tieneSimbolo &&
      tieneLongitudSuficiente)this.valCont = true;
    else this.valCont = false
  }
  confirmarContrasena(contrasena2: string){
    if (this.formUser.value.contrasena === contrasena2) this.confirmCont = true;
    else this.confirmCont = false;
  }
}
