import { Component, ViewChildren, QueryList, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Button } from '../../components/button/button';
import { HelpMenu } from '../../services/help-menu';
import { Location } from '@angular/common';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, Button],
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
})
export class Layout {
  helpMenuService = inject(HelpMenu);
  items = ['', '', '', '', '', '', '', '', '', ''];

  @ViewChildren(Button) buttons!: QueryList<Button>;

  constructor(private location: Location) {}

  ngOnInit() {
    this.helpMenuService.messages = 'Configure application settings and preferences.';
  }

  onButtonClick(clickedRoute: string) {
    // Resetear todos los botones
    this.buttons.forEach((button) => {
      if (button.isRouterLink) {
        button;
      }
    });

    // Activar solo el botón clickeado
    setTimeout(() => {
      this.buttons.forEach((button) => {
        if (button.isRouterLink && button.routerLink === clickedRoute) {
          button;
        }
      });
    }, 0);
  }
}
