// import { user } from './../interfaces/user.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { useer } from "src/app/models/useer.model";
import { user } from '../interfaces/user.interface';


@Injectable({
  providedIn: 'root'
})
export class AdminUserService {

  constructor(private http: HttpClient) { }

  urlApi = `${environment.API_URI}usuarios`;
  allUsers: user[] = [];
  // allUsers: any = [];
  userToCreate: useer = new useer()

  getAllUsers() {
    return this.http.get(`${this.urlApi}`)
  }

  deleteUser(_id: string) {
    return this.http.delete(`${this.urlApi}/delete${_id}`)
  }

  createUser(data: user) {
    return this.http.post(`${this.urlApi}/`, data)
  }

  updateUser(data: user) {
    let dataToUpdate = {
      _id: data._id,
      dataToUpdate: data
    }
    return this.http.put(`${this.urlApi}/update`, dataToUpdate)
  }

}
