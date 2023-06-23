import { Component } from '@angular/core';
import { RegistroService } from '../../services/login-registro.service';
import { User } from '../../../models/user.model';
import { NgForm } from '@angular/forms';
import { FormControl, FormGroup, Validators, FormsModule, NgModel } from '@angular/forms';


@Component({
  selector: 'app-admin-usuario-propio',
  templateUrl: './admin-usuario-propio.component.html',
  styleUrls: ['./admin-usuario-propio.component.css'],
})
export class AdminUsuarioPropioComponent {
  editOpt: boolean = false;
  token:any= {
    exp: "",
    iat:"",
    username:""
  }
  
  constructor(public RegisterService: RegistroService) {
  }
  ngOnInit() {
    this.getUser();
  }

  UpdateUser(form: NgForm) {
    let data = form.value;
    if(data._id){
    }
    this.RegisterService.updateUser(data).subscribe((data) => {
      this.editOpt = false
      return
    });
  }

  getUser() {
    this.token = this.RegisterService.decodeToken()
    this.RegisterService.usuarioPropio(this.token.email).subscribe((res: any) => {
      this.RegisterService.user = JSON.parse(JSON.stringify(res)) || [];
    })
  }

  edit(usuario?: User) {
    if (this.editOpt === false) {
      if (usuario) {
        this.RegisterService.userToUpdate = usuario;
      }
      this.editOpt = true;
    } else this.editOpt = false;
  }
}
