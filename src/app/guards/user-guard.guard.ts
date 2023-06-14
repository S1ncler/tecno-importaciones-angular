import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import * as jwt from 'jsonwebtoken'
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class UserGuardGuard implements CanActivate {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
      const router = new Router()
  let token = localStorage.getItem('token')

  if(token){
    let decoded = jwt.verify(token, environment.SECRET_KEY)
    if(decoded) return true
  }

  router.navigate(['/login'])
  return false
  }
}
