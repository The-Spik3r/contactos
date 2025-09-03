import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  isloggedin: boolean = false;

  signIn(email: string, password: string) {
    if (email.includes('@') && password.length > 6) {
      this.isloggedin = true;
    } else {
      this.isloggedin = false;
    }
  }

  signOut() {
    this.isloggedin = false;
    
  }
}
