import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Auth } from '../../services/auth';
import { Layout } from '../../layout/layout/layout';

@Component({
  selector: 'app-home',
  imports: [RouterOutlet, Layout],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit {
  authService = inject(Auth);
  constructor(private router: Router) {}
  ngOnInit() {
    this.authService.ensureAuthenticated().then(() => {
      this.router.navigate(['/contacts']);
    });
  }
}
