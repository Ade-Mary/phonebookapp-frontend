import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export enum ContactGroup {
  FAMILY = 'FAMILY',
  FRIENDS = 'FRIENDS',
  WORK = 'WORK',
  OTHER = 'OTHER'
}

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
  private favoritesSubject = new BehaviorSubject<Contact[]>([]);

  constructor() {
    this.loadContacts();
    if (this.contacts.length === 0) {
      this.initializeMockData();
    }
    this.updateFavorites();
  }

  private loadContacts(): void {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (stored) {
      this.contacts = JSON.parse(stored).map((contact: Contact) => ({
        ...contact,
        createdAt: new Date(contact.createdAt),
      }));
    }
  }

  private saveContacts(): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.contacts));
    this.updateFavorites();
  }

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
      }
    ];
    this.saveContacts();
  }

  getAllContacts(): Contact[] {
    return [...this.contacts].sort((a, b) => a.firstName.localeCompare(b.firstName));
  }

  getFavorites(): Observable<Contact[]> {
    return this.favoritesSubject.asObservable();
  }

  private updateFavorites(): void {
    const favorites = this.contacts.filter(c => c.favorite);
    this.favoritesSubject.next(favorites);
  }

  toggleFavorite(id: string): void {
    const contact = this.contacts.find(c => c.id === id);
    if (contact) {
      contact.favorite = !contact.favorite;
      this.saveContacts();
    }
  }

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

  deleteContact(id: string): void {
    this.contacts = this.contacts.filter((c) => c.id !== id);
    this.saveContacts();
  }

  updateContact(updatedContact: Contact): void {
    const index = this.contacts.findIndex((c) => c.id === updatedContact.id);
    if (index !== -1) {
      this.contacts[index] = { ...updatedContact };
      this.saveContacts();
    } else {
      console.warn('Contact not found.');
    }
  }

  
  
}
