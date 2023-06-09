import { Component } from '@angular/core';

import { AdminUserService } from "../../services/admin-user.service";


@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent {

  constructor(public adminUserService: AdminUserService) {
    window.scrollTo(0, 0);
  }

}
