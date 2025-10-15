import { Component, inject, OnInit } from '@angular/core';
import { Button } from '../../components/button/button';
import { HelpMenu } from '../../services/help-menu';
import { Auth } from '../../services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-system',
  imports: [Button],
  templateUrl: './system.html',
  styleUrl: './system.scss',
})
export class System implements OnInit {
  helpMenuService = inject(HelpMenu);
  authService = inject(Auth);

  ngOnInit() {
    this.helpMenuService.messages = 'Configure application settings and preferences.';
  }

  onLogout() {
    console.log('pepe');

    this.authService.signOut();
  }
}
