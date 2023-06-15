import { Component } from '@angular/core';
import { AdminUserService } from "../../services/admin-user.service";
import { NgForm } from "@angular/forms";
import { useer } from "src/app/models/useer.model";



@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {

  constructor(public adminUserService: AdminUserService) {
  }

  ngOnInit() {
    this.getAllUsers();
  }


  cleanForm() {
    this.adminUserService.userToCreate = new useer();
  }

  getAllUsers() {
    this.adminUserService.getAllUsers().subscribe((data: any) => {
      this.adminUserService.allUsers = data || [];
      console.log(data);
    });
  }

  deleteUser(_id: string) {
    this.adminUserService.deleteUser(_id).subscribe((data) => {
      alert('Usuario Eliminado');
      this.getAllUsers();
    });

  }

  createOrUpdateUser(form: NgForm) {
    // revisar los campos
    let data = form.value

    if (data._id) {
      // actualizar
      this.adminUserService.updateUser(data).subscribe((data) => {
        alert('Usuario actualizado');
        this.getAllUsers();
      });
      this.cleanForm();
      return;
    }

    //crear usuario
    delete data._id;

    this.adminUserService.createUser(data).subscribe((data: any) => {
      console.log({ data });
      this.getAllUsers();
      this.cleanForm();
    });
  }

}
