import { Injectable, NgZone } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AccessGuard implements CanActivate {
  isPlugin = environment.plugin;

  constructor(private router: Router, private zone: NgZone ){}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    if (this.isPlugin) {
      if (!route.data['pluginAllowed']) {
        this.zone.run(() => {
          this.router.navigateByUrl('home');
          return false;
        })
      }
      return true
    }

    if (!route.data['webAllowed']) {
      this.zone.run(() => {
        this.router.navigateByUrl('grab-a-slice');
        return false;
      })
    }
    return true
  }
}
