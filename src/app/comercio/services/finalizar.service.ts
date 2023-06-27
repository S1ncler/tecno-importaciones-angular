import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import jwtDecode from 'jwt-decode';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FinalizarService {
  direccion = '';
  email: string = '';
  constructor(public http: HttpClient) {}

  getUser() {
    const url = `${environment.API_URI}usuarios/`;
    const token = localStorage.getItem('token');
    const decode: any = jwtDecode(token ? token : 'Error en el token');
    this.email = decode.email;
    this.http.get(`${url + this.email}`).subscribe((res) => {
      const res2 = JSON.parse(JSON.stringify(res));
      this.direccion = res2.direccion;
    });
  }

  finishBuy(factura: string, pedido: any[], email: string): Observable<any> {
    factura = JSON.parse(factura);
    const pedidoFinal = { productos: pedido, estado: 'Alistando' };
    const data = { factura: factura, pedido: pedidoFinal, email: email };
    const url = `${environment.API_URI}usuarios/compra`;
    return this.http.post(url, data)
  }
}
