import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../shared/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    /* if (localStorage.getItem('currentUser')) {
         // logged in so return true
         return true;
     }

     // not logged in so redirect to login page with the return url
     this.router.navigate(['/index/login'], { queryParams: { returnUrl: state.url }});
     return false; */
   // console.log(this.authService.getUserLoggedIn(), localStorage.getItem('token'));
    if (Boolean(localStorage.getItem('isLogin')) === true && localStorage.getItem('token')) {
      return true;
    }
    this.router.navigate(['/index/login']);
    return false;

  }
}
