import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  isloggedin: boolean = false;
  token: null | string = localStorage.getItem('token');

  async signIn(email: string, password: string) {
    const res = await fetch('https://agenda-api.somee.com/api/authentication/authenticate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      this.isloggedin = true;
      this.token = await res.text();
      localStorage.setItem('token', this.token);
      return true;
    } else {
      this.isloggedin = false;
      return false;
    }
  }

  signOut() {
    this.isloggedin = false;
    localStorage.removeItem('token');
    this.token = null;
  }
}
