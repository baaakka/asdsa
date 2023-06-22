import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private apiService: ApiService) {}

  canActivate(): boolean {
    if (this.auth.getToken() === '') {
      this.auth.signOut();
      return false;
    }

    this.apiService.getUserProfileInfo().subscribe()

    return true;
  }
}
