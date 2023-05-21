import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RegistroService } from '../../services/registro.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
})
export class RegistroComponent {

  constructor(private registroService: RegistroService) {}

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
  registrar() {
    this.registroService.registrar(this.formUser).subscribe(data => {
      alert(data.msg === "ALREADY_USER" ? "Ya tienes un usuario con este mismo email" : data.msg);
      this.formUser.reset();
      this.valContrasena = '';      
    })
  }
  async validarNick() {
    await this.registroService.validarNick(this.formUser).then(bool => this.valnick = bool);
  }
  compararFecha() {
    this.valfecha = this.registroService.compararFecha(this.formUser);
  }
  validarTel() {
    this.valTel = this.registroService.validarTel(this.formUser);
  }
  validarContrasena() {
    this.valCont = this.registroService.validarContrasena(this.formUser);
  }
  confirmarContrasena(contrasena2: string){
    this.confirmCont = this.registroService.confirmarContrasena(this.formUser, contrasena2);
  }
}
