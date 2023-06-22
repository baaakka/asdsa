import { Injectable, NgZone } from '@angular/core';
import { LoginResponseBody, TokenData, UserProfile } from '@cake/lib-api-interface';
import { BehaviorSubject } from 'rxjs';
import jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated$ = new BehaviorSubject<boolean>(false);

  private tokenExpiredTimeout: any;

  userProfile = new BehaviorSubject<UserProfile| null>(null);

  user!: UserProfile;

  randomAvatar = 'https://xsgames.co/randomusers/avatar.php?g=pixel';

  constructor(private router: Router, private zone: NgZone) {
    // if (this.isTokenExpired()) {
    //   localStorage.removeItem('accessToken');
    // } else {
    //   this.isAuthenticated$.next(true);
    //   this.setExpiredTokenTimer();
    // }
    this.isAuthenticated$.next(true);
      this.setExpiredTokenTimer();
  }

  signIn(response: LoginResponseBody) {
    this.setToken(
      response.data?.authToken || '',
      response.data?.refreshToken || ''
    );
    this.isAuthenticated$.next(true);
  }

  setToken(authToken: string, refreshToken: string) {
    localStorage.setItem('authToken', authToken);
    localStorage.setItem('refreshToken', refreshToken);
    if(environment.plugin) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
        chrome.storage.sync.set({ authToken });
    }
  }

  getExpiresIn(): number {
    return this.getDecodedToken()?.exp || 0;
  }

  private isTokenExpired(): boolean {
    if (this.getExpiresIn()) {
      const expires = new Date(this.getExpiresIn() * 1000);
      return expires.getTime() <= Date.now();
    }

    return true;
  }

  getDecodedToken(): TokenData | null {
    const token = this.getToken();
    return token ? jwt_decode(token) : null;
  }
  

  getToken(): string {
    return localStorage?.getItem('authToken') || '';
  }

  private setExpiredTokenTimer() {
    if (this.getExpiresIn()) {
      const expires = new Date(this.getExpiresIn() * 1000);
      const timeout = expires.getTime() - Date.now();

      this.tokenExpiredTimeout = setTimeout(() => {
        this.stopSession();
      }, timeout);
    }
  }

  private stopTokenExpiredTimeout() {
    clearTimeout(this.tokenExpiredTimeout);
  }

  stopSession() {
    this.stopTokenExpiredTimeout();
    this.isAuthenticated$.next(false);
    localStorage.clear();
  }

  signOut() {
    this.stopSession();
    this.zone.run(() => {
      this.router.navigateByUrl('/auth/sign-in');
    })
  }
}
