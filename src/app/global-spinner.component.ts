import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-global-spinner',
  templateUrl: './global-spinner.component.html',
  styleUrls: ['./global-spinner.component.css']
})
export class GlobalSpinnerComponent {
  @Input() isListening: boolean = false;
} 