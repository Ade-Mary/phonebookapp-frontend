import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { ContactService, Contact } from '../../core/services/contact.service';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent {
  favorites$: Observable<Contact[]>;

  constructor(private contactService: ContactService) {
    this.favorites$ = this.contactService.getFavorites();
  }

  toggleFavorite(contact: Contact): void {
    this.contactService.toggleFavorite(contact.id);
  }
}