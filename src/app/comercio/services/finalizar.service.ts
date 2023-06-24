import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import jwtDecode  from 'jwt-decode';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FinalizarService {
 direccion="";
  constructor(
    public http:HttpClient) { }

getUser(){ const url=`${environment.API_URI}usuarios/`;
const token = localStorage.getItem('token');
const decode: any = jwtDecode(token? token : "Error en el token");
 
const email= decode.email

this.http.get(`${url+email}`).subscribe(res => {
  const res2=JSON.parse(JSON.stringify(res))
  this.direccion=res2.direccion;
  console.log(this.direccion)
})
}


}

