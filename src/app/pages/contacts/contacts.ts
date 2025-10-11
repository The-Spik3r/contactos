import { Component, inject, OnInit } from '@angular/core';
import { Button } from '../../components/button/button';
import { Contact } from '../../services/contact';
import { HelpMenu } from '../../services/help-menu';
import { RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-contacts',
  imports: [Button, RouterOutlet],
  templateUrl: './contacts.html',
  styleUrl: './contacts.scss',
})
export class Contacts  implements OnInit {
  contactService = inject(Contact);
  helpmenu = inject(HelpMenu);

  ngOnInit() {
    this.helpmenu.messages = "Manage your contacts easily and efficiently.";
  }

}
