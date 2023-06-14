import { user } from './../interfaces/user.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';


@Injectable({
  providedIn: 'root'
})
export class AdminUserService {

  constructor(private http: HttpClient) { }

  urlApi = `${environment.API_URI}/usuarios`;
  allUsers: user[] = [];

  getAllUsers() {
    return this.http.get(`${this.urlApi}/`)
  }

}
