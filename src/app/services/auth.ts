import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class Auth implements OnInit {
  isloggedin: boolean = false;
  baseUrl: string = 'https://agenda-api.somee.com/api';
  token: null | string = localStorage.getItem('token');
  private tokenValidated: boolean = false;
  revisionTokenInterval: undefined | number;

  ngOnInit(): void {
    if (this.token) {
      this.revisionTokenInterval = this.revisionToken();
    }
  }

  constructor(private router: Router) {}
  async me() {
    if (this.token) {
      const res = await fetch(`${this.baseUrl}/Users/me`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.token}`,
        },
      });

      if (res.ok) {
        this.isloggedin = true;
        this.tokenValidated = true;
        return true;
      } else {
        this.isloggedin = false;
        this.token = null;
        this.tokenValidated = false;
        localStorage.removeItem('token');
        return false;
      }
    } else {
      return false;
    }
  }

  async ensureAuthenticated(): Promise<boolean> {
    if (this.tokenValidated && this.token) {
      return true;
    }
    return await this.me();
  }

  async getAuthHeaders(validate: boolean = false): Promise<HeadersInit> {
    if (validate) {
      const isValid = await this.ensureAuthenticated();
      if (!isValid) {
        throw new Error('Token inválido o expirado');
      }
    }

    return {
      'Content-Type': 'application/json',
      ...(this.token && { Authorization: `Bearer ${this.token}` }),
    };
  }

  async signIn(email: string, password: string) {
    const res = await fetch(`${this.baseUrl}/authentication/authenticate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      this.isloggedin = true;
      this.token = await res.text();
      this.tokenValidated = true;
      localStorage.setItem('token', this.token);
      return true;
    } else {
      this.isloggedin = false;
      this.tokenValidated = false;
      return false;
    }
  }

  async signUp(firstName: string, lastName: string, email: string, password: string) {
    const res = await fetch(`${this.baseUrl}/Users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ firstName, lastName, email, password }),
    });

    if (res.ok) {
      return { success: true, message: 'User created successfully' };
    } else {
      const errorText = await res.text();
      return { success: false, message: errorText || 'Registration failed' };
    }
  }

  signOut() {
    this.isloggedin = false;
    this.tokenValidated = false;
    localStorage.removeItem('token');
    this.token = null;
    this.router.navigate(['/login']);
  }

  revisionToken() {
    return setInterval(() => {
      if (this.token) {
        const base64Url = this.token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
          window
            .atob(base64)
            .split('')
            .map(function (c) {
              return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            })
            .join('')
        );

        const claims: { exp: number } = JSON.parse(jsonPayload);
        if (new Date(claims.exp * 1000) < new Date()) {
          this.signOut();
        }
      }
    }, 600);
  }
}
