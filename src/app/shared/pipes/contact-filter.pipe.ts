import { Pipe, PipeTransform } from '@angular/core';
import { Contact } from '../../core/interfaces/Contact'; // Ensure casing matches

@Pipe({ name: 'contactFilter' })
export class ContactFilterPipe implements PipeTransform {
  transform(contacts: Contact[], query: string, group: string): Contact[] {
    let filtered = contacts;
    
    if (query) {
      filtered = filtered.filter(c =>
        (c.firstName && c.firstName.toLowerCase().includes(query.toLowerCase())) ||
        (c.lastName && c.lastName.toLowerCase().includes(query.toLowerCase())) ||
        (c.email && c.email.toLowerCase().includes(query.toLowerCase())) ||
        (c.phone && c.phone.includes(query))
      );
    }

    if (group) {
      filtered = filtered.filter(c => c.group === group);
    }

    return filtered;
  }
}
