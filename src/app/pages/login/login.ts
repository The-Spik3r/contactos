import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  loged: boolean = false;
  isError: boolean = false;
  constructor(private authService: Auth, private router: Router) {
    if (this.authService.isloggedin) {
      this.router.navigate(['/contacts']);
    }
  }
  loginSubmit(email: string, password: string) {
    this.authService.signIn(email, password);
    if (this.authService.isloggedin) {
      this.router.navigate(['/contacts']);
    } else {
      this.isError = true;
    }
  }
}
