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



}
