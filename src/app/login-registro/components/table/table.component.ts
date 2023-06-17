import { Component } from '@angular/core';
import { AdminUserService } from "../../services/admin-user.service";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {
  constructor(public adminUserService: AdminUserService) {
  }

  ngOnInit() {
    this.getAllUsers();
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

  // createOrUpdateUser(form: NgForm) {
  //   // revisar los campos
  //   let data = form.value

  //   if (data._id) {
  //     // actualizar
  //     this.adminUserService.updateUser(data).subscribe((data) => {
  //       alert('Usuario actualizado');
  //       this.getAllUsers();
  //     });
  //     this.cleanForm();
  //     return;
  //   }

  //   //crear usuario
  //   delete data._id;

  //   this.adminUserService.createUser(data).subscribe((data: any) => {
  //     console.log({ data });
  //     this.getAllUsers();
  //     this.cleanForm();
  //   });
  // }

}
