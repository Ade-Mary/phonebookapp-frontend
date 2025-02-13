import { Component } from '@angular/core';

@Component({
  selector: 'app-import-export',
  templateUrl: './import-export.component.html',
  styleUrls: ['./import-export.component.scss']
})
export class ImportExportComponent {
  selectedFile: File | null = null;
  contacts: any[] = []; // Mock data storage

  constructor() {}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  importContacts() {
    if (!this.selectedFile) {
      alert('Please select a CSV file first.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e: any) => {
      const csvData = e.target.result;
      this.parseCSV(csvData);
    };
    reader.readAsText(this.selectedFile);
  }

  parseCSV(csvData: string) {
    const lines = csvData.split('\n');
    const headers = lines[0].split(',');

    const importedContacts = lines.slice(1).map(line => {
      const values = line.split(',');
      return {
        firstName: values[0],
        lastName: values[1],
        email: values[2],
        phone: values[3]
      };
    });

    this.contacts = [...this.contacts, ...importedContacts];
    alert('Contacts imported successfully!');
  }

  exportContacts() {
    if (this.contacts.length === 0) {
      alert('No contacts available to export.');
      return;
    }

    const csvContent = [
      'First Name,Last Name,Email,Phone Number',
      ...this.contacts.map(c => `${c.firstName},${c.lastName},${c.email},${c.phone}`)
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'contacts.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
}
