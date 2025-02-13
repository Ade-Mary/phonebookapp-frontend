import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ContactService } from '../../core/services/contact.service';
import { Contact, ContactGroup } from '../../core/interfaces/contact';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss'],
})
export class ContactFormComponent implements OnInit {
  @Input() contact?: Contact;
  form!: FormGroup;
  groups = Object.values(ContactGroup);

  constructor(
    private fb: FormBuilder,
    public activeModal: NgbActiveModal,
    private contactService: ContactService
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      firstName: [this.contact?.firstName || '', Validators.required],
      lastName: [this.contact?.lastName || '', Validators.required],
      email: [this.contact?.email || '', [Validators.required, Validators.email]],
      phoneNumber: [this.contact?.phoneNumber || '', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      contactImage: [this.contact?.contactImage || ''],
      physicalAddress: [this.contact?.physicalAddress || ''],
      group: [this.contact?.group || ContactGroup.OTHER, Validators.required],
      favorite: [this.contact?.favorite ?? false]
    });
  }

  onSubmit() {
    if (this.form.invalid) return;

    const contactData: Contact = {
      id: this.contact?.id || crypto.randomUUID(),
      createdAt: this.contact?.createdAt || new Date(),
      ...this.form.value,
      group: this.form.value.group as ContactGroup,
    };

    if (this.contact) {
      this.contactService.updateContact(contactData);
    } else {
      this.contactService.addContact(contactData);
    }
    
    this.activeModal.close();
  }
}
