import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GlobalSpinnerComponent } from './global-spinner.component';
import { ChatStateService } from './chat/chat';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, GlobalSpinnerComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'aria';
  isListening = false;
  constructor(private chatState: ChatStateService) {
    this.chatState.isListening$.subscribe(val => {
      this.isListening = val;
    });
  }
}
