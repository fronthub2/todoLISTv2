import { Component } from '@angular/core';
import { ButtonHoverDirective } from '../../directives/button-hover.directive';

@Component({
  selector: 'app-modal-dialog',
  imports: [ButtonHoverDirective],
  templateUrl: './modal-dialog.component.html',
  styleUrl: './modal-dialog.component.scss',
})
export class ModalDialogComponent   {
  
}
