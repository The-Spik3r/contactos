import { Component, Inject, OnInit } from '@angular/core';
import { Button } from "../../components/button/button";
import { HelpMenu } from '../../services/help-menu';

@Component({
  selector: 'app-system',
  imports: [Button],
  templateUrl: './system.html',
  styleUrl: './system.scss'
})
export class System  implements OnInit {
  helpMenuService = Inject(HelpMenu);

  ngOnInit() {
    this.helpMenuService.messages = "Configure application settings and preferences.";
  }
}
