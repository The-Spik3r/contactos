import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HelpMenu {
  messages: { [key: string]: string } = {
    contacts: 'Manage your contacts easily and efficiently.',
    create: ' Create new contacts to keep your address book up to date.',
    groups: 'Organize your contacts into groups for better management.',
    system: 'Configure application settings and preferences.',
  };

  getMessage(section: string): string {
    return this.messages[section] || 'Welcome to the Contact Management App!';
  }
}
