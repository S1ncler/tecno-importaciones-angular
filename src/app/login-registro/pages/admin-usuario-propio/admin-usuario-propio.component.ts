import { Component } from '@angular/core';
import { RegistroService } from '../../services/login-registro.service';
import { User } from 'src/app/models/user.model';
import { NgForm } from '@angular/forms';
import {
  FormControl,
  FormGroup,
  Validators,
  FormsModule,
  NgModel,
} from '@angular/forms';

@Component({
  selector: 'app-admin-usuario-propio',
  templateUrl: './admin-usuario-propio.component.html',
  styleUrls: ['./admin-usuario-propio.component.css'],
})
export class AdminUsuarioPropioComponent {
  error: string = '';
  ready: boolean = true;
  vNombre: boolean = false;
  vNick: boolean = false;
  vEmail: boolean = false;
  vTel: boolean = false;
  vContra: boolean = false;
  vDepartamento: boolean = false;
  vCiudad: boolean = false;
  vDireccion: boolean = false;
  vComplemento: boolean = false;
  vCodigoPostal: boolean = false;
  fecha: any = new Date('1999-01-01');
  editOpt: boolean = false;
  token: any = {
    exp: '',
    iat: '',
    username: '',
  };

  constructor(public RegisterService: RegistroService) {}
  ngOnInit() {
    this.getUser();
    this.obtFecha(this.RegisterService.user.cumpleanos)
  }

  obtFecha(dato:any): string{
    this.fecha = new Date(dato)
      .toISOString()
      .substring(0, 10);
      return this.fecha
  }

  UpdateUser(form: NgForm) {
    let data = form.value;
    data.cumpleanos = new Date(`${this.fecha}`)
    if (data._id) {
    }
    this.RegisterService.updateUser(data).subscribe((data) => {
      this.editOpt = false;
      return;
    });
  }

  getUser() {
    this.token = this.RegisterService.decodeToken();
    this.RegisterService.usuarioPropio(this.token.email).subscribe(
      (res: any) => {
        this.RegisterService.user = JSON.parse(JSON.stringify(res)) || [];
      }
    );
  }

  valUser(email: string) {
    if (this.token.email === email) {
      this.vEmail = false;
      this.ready = true;
    } else {
      this.RegisterService.usuarioPropio(email).subscribe((res: any) => {
        if (!res.msg) {
          this.vEmail = true;
          this.ready = false;
          this.error = 'El correo ya existe, intente con otro';
        } else {
          this.vEmail = false;
          this.ready = true;
        }
      });
    }
  }

  edit(usuario?: User) {
    if (this.editOpt === false) {
      if (usuario) {
        this.RegisterService.userToUpdate = usuario;
      }
      this.editOpt = true;
    } else this.editOpt = false;
  }
  valNombre(dato: string) {
    if (dato === '') {
      this.vNombre = true;
      this.ready = false;
    } else {
      this.vNombre = false;
      this.ready = true;
    }
  }
  valNick(dato: string) {
    if (dato === '') {
      this.vNick = true;
      this.ready = false;
    } else {
      this.vNick = false;
      this.ready = true;
    }
  }
  valmail(dato?: string) {
    if (dato === '') {
      this.vEmail = true;
      this.error = 'Este campo es obligatorio';
      this.ready = false;
    } else {
      if (this.RegisterService.userToUpdate.email) {
        this.valUser(this.RegisterService.userToUpdate.email);
      }
    }
  }

  valTel(dato: string) {
    if (dato === '') {
      this.vTel = true;
      this.ready = false;
    } else {
      this.vTel = false;
      this.ready = true;
    }
  }
  valDepartamento(dato: string) {
    if (dato === '') {
      this.vDepartamento = true;
      this.ready = false;
    } else {
      this.vDepartamento = false;
      this.ready = true;
    }
  }
  valCiudad(dato: string) {
    if (dato === '') {
      this.vCiudad = true;
      this.ready = false;
    } else {
      this.vCiudad = false;
      this.ready = true;
    }
  }
  valDireccion(dato: string) {
    if (dato === '') {
      this.vDireccion = true;
      this.ready = false;
    } else {
      this.vDireccion = false;
      this.ready = true;
    }
  }
  valComplemento(dato: string) {
    if (dato === '') {
      this.vComplemento = true;
      this.ready = false;
    } else {
      this.vComplemento = false;
      this.ready = true;
    }
  }
  valCodigoPostal(dato: string) {
    if (dato === '') {
      this.vCodigoPostal = true;
      this.ready = false;
    } else {
      this.vCodigoPostal = false;
      this.ready = true;
    }
  }
  valContra(dato: string) {
    if (dato === '') {
      this.vContra = true;
      this.ready = false;
    } else {
      this.vContra = false;
      this.ready = true;
    }
  }
}
