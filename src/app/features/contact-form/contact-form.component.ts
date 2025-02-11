import { Component, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ContactService } from '../../core/services/contact.service';
import { Contact } from '../../core/interfaces/contact';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss'],
})
export class ContactFormComponent {
  @Input() contact?: Contact;
  form;

  constructor(
    private fb: FormBuilder, // fb is initialized here
    public activeModal: NgbActiveModal,
    private contactService: ContactService
  ) {
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      imageUrl: [''],
      address: [''],
      group: ['', Validators.required]
    });
  }

  ngOnInit() {
    if (this.contact) {
      this.form.patchValue(this.contact);
    }
  }

  onSubmit() {
    if (this.form.valid) {
      const contactData = {
        ...this.form.value,
        firstName: this.form.value.firstName || '',
        lastName: this.form.value.lastName || '',
        email: this.form.value.email || '',
        phone: this.form.value.phone || '',
        imageUrl: this.form.value.imageUrl || '',
        address: this.form.value.address || '',
        group: this.form.value.group || '',
        isFavorite: this.contact?.isFavorite ?? false, 
      };

      if (this.contact) {
        this.contactService.updateContact({ ...this.contact, ...contactData });
      } else {
        this.contactService.addContact(contactData);
      }
      this.activeModal.close();
    }
  }
}
