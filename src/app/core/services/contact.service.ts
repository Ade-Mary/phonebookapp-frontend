import { Injectable } from '@angular/core';

// Define Contact Group Enum
export enum ContactGroup {
  FAMILY = 'FAMILY',
  FRIENDS = 'FRIENDS',
  WORK = 'WORK',
  OTHER = 'OTHER'
}

// Define Contact Interface
export interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  contactImage?: string;
  physicalAddress?: string;
  group: ContactGroup;
  favorite: boolean;
  createdAt: Date;
}

@Injectable({ providedIn: 'root' })
export class ContactService {
  private readonly STORAGE_KEY = 'contacts';
  private contacts: Contact[] = [];

  constructor() {
    this.loadContacts();
    if (this.contacts.length === 0) {
      this.initializeMockData();
    }
  }

  // Load contacts from Local Storage
  private loadContacts(): void {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    // // if (stored) {
    // //   this.contacts = JSON.parse(stored).map((contact: Contact) => ({
    // //     ...contact,
    // //     createdAt: new Date(contact.createdAt), // Ensure Date format is correct
    // //   }));
    // } else {
    //   this.contacts = [];
    // }
  }

  // Save contacts to Local Storage
  private saveContacts(): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.contacts));
  }

  // Reset contacts to default mock data
  resetContacts(): void {
    localStorage.removeItem(this.STORAGE_KEY);
    this.initializeMockData();
  }

  // Initialize with 8 mock contacts
  private initializeMockData(): void {
    this.contacts = [
      {
        id: crypto.randomUUID(),
        firstName: 'Emily',
        lastName: 'Clark',
        email: 'emily.clark@example.com',
        phoneNumber: '1234567890',
        contactImage: 'https://via.placeholder.com/150',
        physicalAddress: '45 Maple St, New York, USA',
        group: ContactGroup.FRIENDS,
        favorite: true,
        createdAt: new Date(),
      },
      {
        id: crypto.randomUUID(),
        firstName: 'Michael',
        lastName: 'Roberts',
        email: 'michael.roberts@example.com',
        phoneNumber: '9876543210',
        contactImage: 'https://via.placeholder.com/150',
        physicalAddress: '88 Oak Lane, Los Angeles, USA',
        group: ContactGroup.WORK,
        favorite: false,
        createdAt: new Date(),
      },
      {
        id: crypto.randomUUID(),
        firstName: 'Sophia',
        lastName: 'Martinez',
        email: 'sophia.martinez@example.com',
        phoneNumber: '5551234567',
        contactImage: 'https://via.placeholder.com/150',
        physicalAddress: '12 Cherry Rd, Chicago, USA',
        group: ContactGroup.FAMILY,
        favorite: true,
        createdAt: new Date(),
      },
      {
        id: crypto.randomUUID(),
        firstName: 'Daniel',
        lastName: 'Harris',
        email: 'daniel.harris@example.com',
        phoneNumber: '4449876543',
        contactImage: 'https://via.placeholder.com/150',
        physicalAddress: '99 Birch Ave, Houston, USA',
        group: ContactGroup.OTHER,
        favorite: false,
        createdAt: new Date(),
      },
      {
        id: crypto.randomUUID(),
        firstName: 'Olivia',
        lastName: 'Taylor',
        email: 'olivia.taylor@example.com',
        phoneNumber: '6665551234',
        contactImage: 'https://via.placeholder.com/150',
        physicalAddress: '33 Pine St, Miami, USA',
        group: ContactGroup.FRIENDS,
        favorite: true,
        createdAt: new Date(),
      },
      {
        id: crypto.randomUUID(),
        firstName: 'Ethan',
        lastName: 'Wilson',
        email: 'ethan.wilson@example.com',
        phoneNumber: '7778889999',
        contactImage: 'https://via.placeholder.com/150',
        physicalAddress: '20 Cedar Ln, Dallas, USA',
        group: ContactGroup.WORK,
        favorite: false,
        createdAt: new Date(),
      },
      {
        id: crypto.randomUUID(),
        firstName: 'Ava',
        lastName: 'Anderson',
        email: 'ava.anderson@example.com',
        phoneNumber: '2223334444',
        contactImage: 'https://via.placeholder.com/150',
        physicalAddress: '55 Willow Dr, Boston, USA',
        group: ContactGroup.FAMILY,
        favorite: false,
        createdAt: new Date(),
      },
      {
        id: crypto.randomUUID(),
        firstName: 'Liam',
        lastName: 'Miller',
        email: 'liam.miller@example.com',
        phoneNumber: '9991112222',
        contactImage: 'https://via.placeholder.com/150',
        physicalAddress: '89 Redwood Rd, Seattle, USA',
        group: ContactGroup.OTHER,
        favorite: true,
        createdAt: new Date(),
      }
    ];
    
    this.saveContacts();
  }

  // Get all contacts, sorted by first name
  getAllContacts(): Contact[] {
    return [...this.contacts].sort((a, b) => (a.firstName ?? '').localeCompare(b.firstName ?? ''));
  }

  // Get a single contact by ID
  getContactById(id: string): Contact | undefined {
    return this.contacts.find((c) => c.id === id);
  }

  // Add a new contact (Prevents duplicate emails)
  addContact(contact: Omit<Contact, 'id' | 'createdAt'>): void {
    const exists = this.contacts.some((c) => c.email === contact.email);
    if (exists) {
      console.warn('Contact with this email already exists.');
      return;
    }

    const newContact: Contact = {
      ...contact,
      id: crypto.randomUUID(),
      createdAt: new Date(),
    };

    this.contacts.push(newContact);
    this.saveContacts();
  }

  // Update an existing contact
  updateContact(contact: Contact): void {
    const index = this.contacts.findIndex((c) => c.id === contact.id);
    if (index !== -1) {
      this.contacts[index] = contact;
      this.saveContacts();
    }
  }

  // Delete a single contact
  deleteContact(id: string): void {
    this.contacts = this.contacts.filter((c) => c.id !== id);
    this.saveContacts();
  }

  // Delete multiple contacts
  deleteContacts(ids: string[]): void {
    this.contacts = this.contacts.filter((c) => !ids.includes(c.id));
    this.saveContacts();
  }
}
