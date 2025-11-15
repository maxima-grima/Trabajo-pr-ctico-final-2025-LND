import { inject, Injectable } from '@angular/core';
import { LoginData } from '../interfaces/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  router = inject(Router);
  revisionTokenInterval: number | undefined;
  
  get token(): string | null {
    return localStorage.getItem("token");
  }

  constructor() {
    if (this.token) {
      this.revisionTokenInterval = this.revisionToken()
    }
  }

  async login(loginData: LoginData) {
    const res = await fetch("https://w370351.ferozo.com/api/Authentication/login", {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(loginData)
    });
    
    if (res.ok) {
      const tokenText = await res.text();
      localStorage.setItem("token", tokenText);
      return true;
    }
    return false;
  }

  logout() {
    localStorage.removeItem("token");
    this.router.navigate(["/"]);
  }

  revisionToken() {
    return setInterval(() => {
      if (this.token) {
        const claims = this.parseJwt();
        if (new Date(claims.exp * 1000) < new Date()) {
          this.logout()
        }
      }
    }, 600)
  }

  getUserId() {
    const claims = this.parseJwt();
    return parseInt(claims.sub);
  }
  
  parseJwt() {
    if (!this.token) return null;
    const base64Url = this.token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  }
}