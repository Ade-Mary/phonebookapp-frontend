import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Contact } from '../../core/interfaces/contact';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html'
})
export class ContactDetailsComponent {
  contact!: Contact;

  constructor(public activeModal: NgbActiveModal) {}
}