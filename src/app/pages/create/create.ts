import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Contact } from '../../services/contact';

interface ContactForm {
  name: string;
  lastName: string;
  email: string;
  address: string;
  phone: string;
  company: string;
  description: string;
  urlImage: string;
}

@Component({
  selector: 'app-create',
  imports: [FormsModule],

  templateUrl: './create.html',
  styleUrl: './create.scss',
})
export class Create {
  ContactService = inject(Contact)
  createSubmit(contact: ContactForm) {
    console.log(contact);
    this.ContactService.createContact(contact);
  }
}
