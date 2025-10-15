import { Component, effect, inject, input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Contact } from '../../services/contact';
import { Contact as IContact, NewContact } from '../../interface/Icontact';
import { Card } from '../../components/card/card';

@Component({
  selector: 'app-contact-new',
  imports: [Card, ReactiveFormsModule],
  templateUrl: './contact-new.html',
  styleUrl: './contact-new.scss',
})
export class ContactNew {
  id = input.required<string>();
  contactService = inject(Contact);
  contactDetail: IContact | null = null;
  contactForm: FormGroup;
  isEditMode = false;
  private fb = inject(FormBuilder);
  private router = inject(Router);

  constructor() {
    this.contactForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      number: ['', Validators.required],
      address: [''],
      company: [''],
      description: [''],
      image: [''],
    });

    effect(() => {
      const contactId = this.id();
      if (contactId && contactId !== 'new') {
        this.isEditMode = true;
        this.loadContact();
      } else {
        this.isEditMode = false;
      }
    });
  }

  async ngOnInit() {
    const contactId = this.id();
    if (contactId && contactId !== 'new') {
      await this.loadContact();
    }
  }

  private async loadContact() {
    this.contactDetail = await this.contactService.getContactById(this.id());
    if (this.contactDetail) {
      this.contactForm.patchValue({
        firstName: this.contactDetail.firstName,
        lastName: this.contactDetail.lastName,
        email: this.contactDetail.email,
        number: this.contactDetail.number,
        address: this.contactDetail.address,
        company: this.contactDetail.company,
        description: this.contactDetail.description,
        image: this.contactDetail.image,
      });
    }
  }

  async onSubmit() {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    const formData = this.contactForm.value;

    try {
      if (this.isEditMode) {
        await this.updateContact(formData);
      } else {
        await this.createContact(formData);
      }
    } catch (error) {
      console.error('Error al guardar contacto:', error);
    }
  }

  private async createContact(data: NewContact) {
    const res = await this.contactService.createContact(data);
    if (res) {
      alert('Contacto creado exitosamente');
      this.router.navigate(['/contacts']);
    } else {
      alert('Error al crear contacto');
    }
  }

  private async updateContact(data: IContact) {
    const res = await this.contactService.updateContact(data, this.id());
    if (res) {
      alert('Contacto actualizado exitosamente');
      this.router.navigate(['/contacts']);
    } else {
      alert('Error al actualizar contacto');
    }
  }

  private async deleteContact() {
    const res = await this.contactService.deleteContact(this.id());
    if (res) {
      alert('Contacto eliminado exitosamente');
      this.router.navigate(['/contacts']);
    } else {
      alert('Error al eliminar contacto');
    }
  }

  async onDelete() {
    await this.deleteContact();
  }

  onCancel() {
    this.router.navigate(['/contacts']);
  }
}
