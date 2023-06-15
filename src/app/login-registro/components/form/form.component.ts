import { Component } from '@angular/core';
import { AdminUserService } from "../../services/admin-user.service";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {

  constructor(public adminUserService: AdminUserService) {
  }


}
