import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-view-toggle',
  templateUrl: './view-toggle.component.html',
})
export class ViewToggleComponent {
  @Input() viewMode: 'grid' | 'list' = 'grid';
  @Output() viewModeChange = new EventEmitter<'grid' | 'list'>();
}