import { Component } from '@angular/core';
import { ThemeService } from './core/services/theme.service';
import { RouterOutlet } from '@angular/router'; 
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { ViewToggleComponent } from './shared/components/view-toggle/view-toggle.component'; // ✅ Import ViewToggleComponent


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgbCollapseModule, CommonModule, FormsModule,ViewToggleComponent], 
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'phonebookapp3-frontend'; 
  isNavCollapsed = true;
  viewMode: 'grid' | 'list' = 'grid';

  constructor(public themeService: ThemeService) {}
}
