import { inject, Injectable } from '@angular/core';
import { Contact as IContact, NewContact } from '../interface/Icontact';
import { Auth } from './auth';

@Injectable({
  providedIn: 'root',
})
export class Contact {
  readonly _baseUrl = 'https://agenda-api.somee.com/api/contacts';
  contacts: IContact[] = [];
  userService = inject(Auth);
  constructor() {
    this.getContact();
  }

  async getContact() {
    const isAuthenticated = await this.userService.ensureAuthenticated();
    if (!isAuthenticated) {
      console.error('Usuario no autenticado');
      return false;
    }

    const res = await fetch(this._baseUrl, {
      method: 'GET',
      headers: await this.userService.getAuthHeaders(),
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
      const isAuthenticated = await this.userService.ensureAuthenticated();
      if (!isAuthenticated) {
        console.error('Usuario no autenticado');
        return null;
      }

      const res = await fetch(this._baseUrl + '/' + id, {
        method: 'GET',
        headers: await this.userService.getAuthHeaders(),
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

  async createContact(contact: NewContact) {
    try {
      const isAuthenticated = await this.userService.ensureAuthenticated();
      if (!isAuthenticated) {
        console.error('Usuario no autenticado');
        return false;
      }

      const res = await fetch(this._baseUrl, {
        method: 'POST',
        headers: await this.userService.getAuthHeaders(),
        body: JSON.stringify(contact),
      });

      const response = await res.json();
      console.log(response);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
  async updateContact(contact: IContact, id: string) {
    try {
      const isAuthenticated = await this.userService.ensureAuthenticated();
      if (!isAuthenticated) {
        console.error('Usuario no autenticado');
        return false;
      }

      const res = await fetch(this._baseUrl + '/' + id, {
        method: 'PUT',
        headers: await this.userService.getAuthHeaders(),
        body: JSON.stringify(contact),
      });

      const response = await res.json();
      console.log(response);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async deleteContact(id: string) {
    try {
      const headers = await this.userService.getAuthHeaders(true);

      const res = await fetch(this._baseUrl + '/' + id, {
        method: 'DELETE',
        headers,
      });

      if (res.ok) {
        this.contacts = this.contacts.filter((contact) => contact.id !== Number.parseInt(id));
        return true;
      }
      return false;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
  async setFavorite(id: string) {
    try {
      const res = await fetch(this._baseUrl + '/' + id + '/favorite', {
        method: 'POST',
        headers: await this.userService.getAuthHeaders(),
      });

      const response = await res.json();
      console.log(response);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}
