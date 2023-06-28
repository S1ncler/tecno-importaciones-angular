import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { RegistroService } from '../../services/login-registro.service';

@Component({
  selector: 'app-forg-pass',
  templateUrl: './forg-pass.component.html',
  styleUrls: ['./forg-pass.component.css'],
})
export class ForgPassComponent {
  get contrasena() {
    return this.formUser.get('contrasena') as FormControl;
  }
  // declaracion del formGroup
  formUser = new FormGroup({
    contrasena: new FormControl(``, Validators.required),
  });
  valCont  = true;
  confirmCont = true;

  constructor(
    private router: ActivatedRoute,
    private _router: Router,
    private registroService: RegistroService
  ) {}
  token: string = '';
  pass?: string;
  repass?: string;
  email: string = "";
  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.token = this.router.snapshot.params['token'];
    let decoded: any = jwt_decode(this.token);
    if (decoded.exp < (new Date().getTime() + 2) / 1000)
      this._router.navigate(['usuarios/login']);
    this.email = decoded.email;
  }

  update() {
    const pass = this.formUser.value.contrasena;
    let updateOk = true;
    pass ? updateOk = this.registroService.updatePass(this.email, pass) : updateOk;
    
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
