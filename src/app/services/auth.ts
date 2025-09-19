import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  isloggedin: boolean = false;
  token: null | string = localStorage.getItem('token');

  async signIn(email: string, password: string) {
    const { ok, text } = await fetch('https://agenda-api.somee.com/api/authentication/authenticate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (ok) {
      this.isloggedin = true;
      this.token = await text();
      localStorage.setItem('token', this.token);
    } else {
      this.isloggedin = false;
    }
  }

  signOut() {
    this.isloggedin = false;
    localStorage.removeItem('token');
    this.token = null;
  }
}
