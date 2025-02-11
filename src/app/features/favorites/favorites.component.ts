import { Component } from '@angular/core';
import { ContactService } from '../../core/services/contact.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html'
})
export class FavoritesComponent {
  constructor(public contactService: ContactService) {}

  get favorites() {
    return this.contactService.getAllContacts().filter(c => c.isFavorite);
  }
}