import { Component } from '@angular/core';
import { ContactService } from '../../core/services/contact.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ContactFormComponent } from '../contact-form/contact-form.component';
import { Contact } from '../../core/interfaces/contact';
import { ViewToggleComponent } from '../../shared/components/view-toggle/view-toggle.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [FormsModule, ViewToggleComponent], // Add FormsModule
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss'],
})
export class ContactListComponent {
  viewMode: 'grid' | 'list' = 'grid';
  searchQuery = '';
  selectedGroup = '';
  selectedContacts = new Set<string>();

  constructor(
    public contactService: ContactService,
    private modalService: NgbModal
  ) {}

  openContactForm(contact?: Contact): void {
    const modalRef = this.modalService.open(ContactFormComponent);
    modalRef.componentInstance.contact = contact;
  }

  toggleFavorite(contact: Contact): void {
    contact.isFavorite = !contact.isFavorite;
    this.contactService.updateContact(contact);
  }

  deleteContact(id: string): void {
    this.contactService.deleteContact(id);
  }

  bulkDelete(): void {
    this.contactService.deleteContacts([...this.selectedContacts]);
    this.selectedContacts.clear();
  }
}