import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-separator',
  imports: [],
  templateUrl: './separator.html',
  styleUrl: './separator.scss',
})
export class Separator {
  @Input() orientation: 'horizontal' | 'vertical' = 'horizontal';
}
