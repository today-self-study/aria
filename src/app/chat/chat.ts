import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface ChatMessage {
  role: 'user' | 'bot';
  text: string;
}

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.html',
  styleUrls: ['./chat.css']
})
export class ChatComponent {
  messages: ChatMessage[] = [];
  inputText: string = '';
  isListening: boolean = false;

  sendMessage() {
    if (!this.inputText.trim()) return;
    this.messages.push({ role: 'user', text: this.inputText });
    // TODO: API 호출 및 응답 처리
    this.inputText = '';
  }

  startVoiceInput() {
    // TODO: 음성 인식 기능 구현
    this.isListening = true;
  }
}
