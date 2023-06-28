import { Component } from '@angular/core';
import { AdminUserService } from "../../services/admin-user.service";
import { NgForm } from "@angular/forms";
import { useer } from "src/app/models/useer.model";
import Swal from 'sweetalert2';



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
        Swal.fire({
          icon: "success",
          text: 'Usuario actualizado'
        })
        this.getAllUsers();
      });
      this.cleanForm();
      return;
    }

    //crear usuario
    delete data._id;

    this.adminUserService.createUser(data).subscribe((data: any) => {
      Swal.fire({
        icon: "success",
        text: 'Usuario creado'
      })
      this.getAllUsers();
      this.cleanForm();
    });
  }

  updateUser(user: useer) {
    this.adminUserService.userToCreate = user;
    Swal.fire({
      icon: "success",
      text: 'Usuario cargado en el formulario'
    })
    console.log(user);

  }

}
