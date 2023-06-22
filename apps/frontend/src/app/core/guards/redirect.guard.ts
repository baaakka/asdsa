import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class RedirectGuard implements CanActivate {

  constructor(private router: Router ){}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    localStorage.setItem('authToken', route.queryParams['token']);

    this.router.navigate([route.queryParams['path']])
    
   return false;
  }
}
