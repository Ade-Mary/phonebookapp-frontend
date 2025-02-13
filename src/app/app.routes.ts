import { Routes } from '@angular/router';
import { ContactListComponent } from './features/contact-list/contact-list.component'; 
import { FavoritesComponent } from './features/favorites/favorites.component';
import { ImportExportComponent } from './features/import-export/import-export.component';

export const routes: Routes = [
  { path: '', redirectTo: '/contacts', pathMatch: 'full' },
  { path: 'contacts', component: ContactListComponent }, 
  { path: 'favorites', component: FavoritesComponent },
  
  { path: 'import-export', component: ImportExportComponent },
  { path: '**', redirectTo: '/contacts' }, 
];
