// src/app/role.guard.ts
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
    const expectedRole = route.data['expectedRole'];

    const isLoggedIn: boolean = this.authService.isLoggedIn();
    const userRole: string | undefined = this.authService.getUserRole();


    if (isLoggedIn && userRole === expectedRole) {
      return true;
    }

    if (isLoggedIn && userRole !== expectedRole) {
      return this.router.parseUrl(`/${userRole}`)
    }

    return this.router.parseUrl('/login');
  }
}
