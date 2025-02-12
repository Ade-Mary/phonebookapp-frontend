import { Injectable } from '@angular/core';
import { Contact, ContactGroup } from '../interfaces/contact'; // ✅ Ensure correct casing

@Injectable({ providedIn: 'root' })
export class CsvParser {
  parseCsv(csvText: string): Contact[] {
    const lines = csvText.trim().split('\n');
    const headers = lines[0].split(',').map(header => header.trim());

    return lines.slice(1).map(line => {
      const data = line.split(',').map(field => field.trim());

      return {
        id: crypto.randomUUID(),
        firstName: data[0] || '',
        lastName: data[1] || '',
        email: data[2] || '',
        phoneNumber: data[3] || '',
        contactImage: data[4] || '',
        physicalAddress: data[5] || '',
        group: Object.values(ContactGroup).includes(data[6] as ContactGroup)
          ? (data[6] as ContactGroup)
          : ContactGroup.OTHER,
        favorite: data[7]?.toLowerCase() === 'true',
        createdAt: new Date(),
      };
    });
  }
}
