import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import jwtDecode from 'jwt-decode';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class PayguardGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded: any = jwtDecode(token);
      if (decoded.exp > (new Date().getTime() + 2) / 1000) {
        return true;
      }
    }
    Swal.fire({
      icon: 'info',
      title: 'Inicia sesión',
      text: 'Por favor inicia sesión para realizar tu compra o registrate',
    });
    this.router.navigate(['usuarios/registro']);
    return false;
  }
}
