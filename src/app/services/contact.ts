import { Injectable } from '@angular/core';
import { Contact as IContact } from '../interface/Icontact';

@Injectable({
  providedIn: 'root',
})
export class Contact {
  readonly _baseUrl = 'https://agenda-api.somee.com/api/contacts';
  contacts: IContact[] = [];
  constructor() {
    this.getContact();
  }


  async getContact() {
    const res = await fetch(this._baseUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    });

    if (res.ok) {
      const response = await res.json();
      console.log(response);

      this.contacts = response;
      return true;
    }
    return false;
  }

  async getContactById(id: string) {
    try {
      const res = await fetch(this._baseUrl + '/' + id, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      });
      if (res.ok) {
        const response = await res.json();
        console.log(response);
        return response;
      }
    } catch (error) {
      console.error(error);
    }
  }
}
