import { Component } from '@angular/core';
import { RegistroService } from '../../services/login-registro.service';
import { User } from 'src/app/models/user.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-admin-usuario-propio',
  templateUrl: './admin-usuario-propio.component.html',
  styleUrls: ['./admin-usuario-propio.component.css'],
})
export class AdminUsuarioPropioComponent {
  editOpt: boolean = false
  constructor(public RegisterService: RegistroService) {}
ngOnInit() {
    this.getUser()
  }

UpdateUser(form: NgForm){

}
getUser(){
  let username = 'nickExistente';
    this.RegisterService.usuarioPropio(username).subscribe((res: any) => {
      this.RegisterService.user = JSON.parse(JSON.stringify(res)) || []
      console.log(res)
    });
  }

edit(){
  if(this.editOpt=== false)this.editOpt = true
  else this.editOpt = false
}

}
