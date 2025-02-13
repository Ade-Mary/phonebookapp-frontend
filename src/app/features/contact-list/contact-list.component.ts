import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ContactService } from '../../core/services/contact.service';
import { Contact } from '../../core/interfaces/contact'; 
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss'],
})
export class ContactListComponent implements OnInit {
  contacts: Contact[] = [];

  constructor(private contactService: ContactService, private modalService: NgbModal) {}

  ngOnInit() {
    this.contacts = this.contactService.getAllContacts();
  }

  async openContactForm(contact?: Contact) {
    const { ContactFormComponent } = await import('../contact-form/contact-form.component');
    const modalRef = this.modalService.open(ContactFormComponent);
    modalRef.componentInstance.contact = contact;

    modalRef.closed.subscribe(() => {
      this.contacts = this.contactService.getAllContacts();
    });
  }

  deleteContact(id: string) {
    this.contactService.deleteContact(id);
    this.contacts = this.contactService.getAllContacts();
  }
}
