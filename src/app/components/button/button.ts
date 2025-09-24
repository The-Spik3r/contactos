import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { NgClass } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-button',
  imports: [NgClass],
  templateUrl: './button.html',
  styleUrl: './button.scss',
})
export class Button implements OnInit {
  @Input() text: string = 'QUESTS';
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
  @Input() isRouterLink: boolean = false;
  @Input() routerLink: string = '/';
  @Output() buttonClicked = new EventEmitter<string>();

  isPressed = false;

  constructor(private router: Router) {}

  ngOnInit() {
    // Verificar la ruta inicial si es un router link
    if (this.isRouterLink) {
      this.checkActiveRoute();
    }
  }

  private checkActiveRoute() {
    if (this.isRouterLink && this.routerLink) {
      const currentUrl = this.router.url;
      // Verificar si la URL actual coincide o empieza con la ruta del botón
      this.isPressed =
        currentUrl === this.routerLink || currentUrl.startsWith(this.routerLink + '/');
    }
  }

  // Método público para resetear el estado
  reset() {
    if (this.isRouterLink) {
      this.isPressed = false;
    }
  }

  // Método público para activar
  activate() {
    if (this.isRouterLink) {
      this.isPressed = true;
    }
  }

  onClick() {
    if (this.isRouterLink && this.routerLink) {
      // Emitir evento para que el padre maneje el estado
      this.buttonClicked.emit(this.routerLink);
      this.router.navigate([this.routerLink]);
    } else {
      // Para botones que no son router links
      this.isPressed = !this.isPressed;
    }
  }
  onKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.onClick();
    }
  }
}
