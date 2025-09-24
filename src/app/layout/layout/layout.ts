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
  message: string = this.helpMenuService.getMessage('default');
  items = ['', '', '', '', '', '', '', '', '', ''];

  @ViewChildren(Button) buttons!: QueryList<Button>;

  constructor(private location: Location) {}

  ngOnInit() {
    console.log(this.location.path().replace('/', ''));
    this.message = this.helpMenuService.getMessage(
      this.location.path().replace('/', '') || 'default'
    );
  }

  onButtonClick(clickedRoute: string) {
    // Resetear todos los botones
    this.buttons.forEach((button) => {
      if (button.isRouterLink) {
        button.reset();
      }
    });

    // Activar solo el botón clickeado
    setTimeout(() => {
      this.buttons.forEach((button) => {
        if (button.isRouterLink && button.routerLink === clickedRoute) {
          button.activate();
        }
      });
    }, 0);
  }
}
