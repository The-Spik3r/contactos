import { Component, inject } from '@angular/core';
import { Button } from '../../components/button/button';
import { RouterOutlet } from '@angular/router';
import { Contact } from '../../services/contact';
@Component({
  selector: 'app-contact-update',
  imports: [Button, RouterOutlet],
  templateUrl: './contact-update.html',
  styleUrl: './contact-update.scss',
})
export class ContactUpdate {
  contactService = inject(Contact);
}
