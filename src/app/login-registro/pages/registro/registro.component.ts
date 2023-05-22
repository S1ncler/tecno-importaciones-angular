import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RegistroService } from '../../services/registro.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
})
export class RegistroComponent {

  // Se inportan los servicios de este componente
  constructor(private registroService: RegistroService) {}

  // funciones para la asignacion de variables en el formGroup
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

  // declaracion del formGroup
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

  // declaracion de las variables del formulario
  valContrasena = '';
  valnick = true;
  valfecha = true;
  valTel = true;
  valCont  = true;
  confirmCont = true

  // funcion para registrar el usuario en la base de datos mediante la api
  registrar() {
    // llamado al servicio que comunica el formulario con la api
    this.registroService.registrar(this.formUser).subscribe(data => {
      // mensaje del resultado del intento de registro
      alert(data.msg === "ALREADY_USER" ? "Ya tienes un usuario con este mismo email" : data.msg);
      // se resetea el formulario
      this.formUser.reset();
      // se resetea el valor de la validacion de la contraseña ya que esta fuera del formGroup
      this.valContrasena = '';      
    })
  }

  // funcion para la validacion del nick mediante la api
  async validarNick() {
    // llamado al servicio que calida el nick con la api
    await this.registroService.validarNick(this.formUser).then(bool => this.valnick = bool);
  }

  // funcion que valida que el usuario que se va a registrar sea mayor de edad
  compararFecha() {
    // llamado al servicio de validacion de la mayoria de edad
    this.valfecha = this.registroService.compararFecha(this.formUser);
  }

  // funcion que valida que el numero de telefono tenga los caracteres correctos
  validarTel() {
    // llamado al servicio de validacion del telefono
    this.valTel = this.registroService.validarTel(this.formUser);
  }

  // funcion que valida que la contraseña tenga los caracteres correctos
  validarContrasena() {
    // llamado al servicio de validacion de la contraseña
    this.valCont = this.registroService.validarContrasena(this.formUser);
  }

  // funcion que valida que la contraseña este escrita en los dos campos de la misma manera
  confirmarContrasena(contrasena2: string){
    // llamado al servicio de validacion de la contraseña
    this.confirmCont = this.registroService.confirmarContrasena(this.formUser, contrasena2);
  }
}
