import { user } from './../interfaces/user.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';


@Injectable({
  providedIn: 'root'
})
export class AdminUserService {

  constructor(private http: HttpClient) { }

  urlApi = `${environment.API_URI}usuarios`;
  allUsers: user[] = [];
  // allUsers: any = [];

  getAllUsers() {
    return this.http.get(`${this.urlApi}`)
  }

  deleteUser(_id: string) {
    return this.http.delete(`${this.urlApi}/delete${_id}`)
  }

}
