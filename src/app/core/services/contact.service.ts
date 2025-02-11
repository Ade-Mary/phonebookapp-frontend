import { Injectable } from '@angular/core';
import { Contact } from '../interfaces/contact';

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

  private loadContacts(): void {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    this.contacts = stored ? JSON.parse(stored) : [];
  }

  private saveContacts(): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.contacts));
  }

  private initializeMockData(): void {
    this.contacts = [
      {
        id: '1',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phone: '1234567890',
        imageUrl: 'https://via.placeholder.com/150',
        address: '123 Main St, City, Country',
        group: 'Work',
        isFavorite: false,
        createdAt: new Date(),
      },
      // Add more mock data here
    ];
    this.saveContacts();
  }

 getAllContacts(): Contact[] {
  return [...this.contacts].sort((a, b) => {
    const firstNameA = a.firstName ?? '';  // Use empty string if null or undefined
    const firstNameB = b.firstName ?? '';  // Use empty string if null or undefined
    return firstNameA.localeCompare(firstNameB);
  });
}

  getContactById(id: string): Contact | undefined {
    return this.contacts.find((c) => c.id === id);
  }

  addContact(contact: Omit<Contact, 'id' | 'createdAt'>): void {
    const newContact: Contact = {
      ...contact,
      id: Math.random().toString(36).substring(2),
      createdAt: new Date(),
    };
    this.contacts.push(newContact);
    this.saveContacts();
  }

  updateContact(contact: Contact): void {
    const index = this.contacts.findIndex((c) => c.id === contact.id);
    if (index !== -1) {
      this.contacts[index] = contact;
      this.saveContacts();
    }
  }

  deleteContact(id: string): void {
    this.contacts = this.contacts.filter((c) => c.id !== id);
    this.saveContacts();
  }

  deleteContacts(ids: string[]): void {
    this.contacts = this.contacts.filter((c) => !ids.includes(c.id));
    this.saveContacts();
  }
}