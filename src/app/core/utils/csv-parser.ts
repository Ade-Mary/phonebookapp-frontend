import { Injectable } from '@angular/core';
import { Contact } from '../interfaces/contact';

@Injectable({ providedIn: 'root' })
export class CsvParser {
  parseCsv(csvText: string): Contact[] {
    const lines = csvText.split('\n');
    const headers = lines[0].split(',');

    return lines.slice(1).map(line => {
      const data = line.split(',');
      return {
        id: Math.random().toString(36).substring(2),
        firstName: data[0].trim(),
        lastName: data[1].trim(),
        email: data[2].trim(),
        phone: data[3].trim(),
        imageUrl: data[4].trim(),
        address: data[5].trim(),
        group: data[6].trim(),
        isFavorite: data[7].trim().toLowerCase() === 'true',
        createdAt: new Date()
      };
    });
  }
}