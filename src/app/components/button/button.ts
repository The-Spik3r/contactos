import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnChanges,
  SimpleChanges,
  inject,
  effect,
} from '@angular/core';
import { NgClass } from '@angular/common';
import { RouterLink, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-button',
  imports: [NgClass, RouterLink],
  templateUrl: './button.html',
  styleUrl: './button.scss',
})
export class Button implements OnInit, OnChanges {
  @Input() text: string = 'QUESTS';
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
  @Input() isRouterLink: boolean = false;
  @Input() routerLink: string = '/';
  @Input() exact: boolean = false;
  @Input() disableActiveState: boolean = false;
  @Output() buttonClicked = new EventEmitter<string>();

  isPressed = false;
  isRouteActive = false;
  private router = inject(Router);

  constructor() {
    effect(() => {
      this.checkRouteActive();
    });
  }

  ngOnInit() {
    if (this.isRouterLink) {
      this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
        this.checkRouteActive();
      });

      // Verificar ruta inicial
      this.checkRouteActive();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['routerLink'] || changes['exact']) {
      this.checkRouteActive();
    }
  }

  private checkRouteActive() {
    if (this.isRouterLink && this.routerLink && !this.disableActiveState) {
      const currentUrl = this.router.url;

      if (this.exact) {
        this.isRouteActive = currentUrl === this.routerLink;
      } else {
        this.isRouteActive = currentUrl.startsWith(this.routerLink);
      }
    } else {
      this.isRouteActive = false;
    }
  }

  onClick() {
    if (!this.isRouterLink) {
      this.isPressed = !this.isPressed;
      this.buttonClicked.emit(this.text);
    }
  }

  onKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.onClick();
    }
  }
}
