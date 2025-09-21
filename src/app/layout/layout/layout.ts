import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Button } from "../../components/button/button";

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, Button],
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
})
export class Layout {
  items = ['', '', '', '', '', '', '', '', '', ''];
}
