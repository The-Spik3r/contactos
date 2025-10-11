import { Component, effect, inject, input, OnInit } from '@angular/core';
import { Card } from '../../components/card/card';
import { Separator } from '../../components/separator/separator';
import { Contact } from '../../services/contact';
import { Contact as IContact } from '../../interface/Icontact';

@Component({
  selector: 'app-contacts-detail',
  imports: [Card, Separator],
  templateUrl: './contacts-detail.html',
  styleUrl: './contacts-detail.scss',
})
export class ContactsDetail implements OnInit {
  id = input.required<string>();
  contactService = inject(Contact);
  contactDetail: IContact | null = null;

  constructor() {
    effect(() => {
      this.loadContact();
    });
  }
  async ngOnInit() {
    await this.loadContact();
  }

  private async loadContact() {
    this.contactDetail = await this.contactService.getContactById(this.id());
  }
}
