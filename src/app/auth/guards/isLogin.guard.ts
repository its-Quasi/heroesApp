import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanMatch, Route, UrlSegment, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, map, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({providedIn: 'root'})
export class IsLoginGuard implements CanMatch, CanActivate {
  
  constructor(private authService : AuthService, private router : Router) { }

  checkIsLogin() : boolean | Observable<boolean> {
    return this.authService.checkAuthentication().pipe(
      tap(isAuth => {
        if (isAuth) this.router.navigate(['/heroes/list'])
      }),
      map(isAuth => !isAuth)
    )
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> {
    return this.checkIsLogin()
  }
  canMatch(route: Route, segments: UrlSegment[]): boolean | Observable<boolean> {
    return this.checkIsLogin() 
  }
  
}