import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-confirmation-component',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})

export class ConfirmationComponent {

  @Input() public confirmationMessage: string;
  @Output() public userChoice: EventEmitter<boolean> = new EventEmitter();

  public onConfirmation(choice: boolean) {
    this.userChoice.emit(choice);
  }
}
