import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html'
})
export class ConfirmationModalComponent {
  title = 'Confirm Action';
  message = 'Are you sure you want to perform this action?';

  constructor(public activeModal: NgbActiveModal) {}
}