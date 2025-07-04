import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Web Speech API 타입 선언 (window에 SpeechRecognition 추가)
declare global {
  interface Window {
    webkitSpeechRecognition?: any;
    SpeechRecognition?: any;
  }
}

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
  recognition: any = null;

  sendMessage() {
    if (!this.inputText.trim()) return;
    this.messages.push({ role: 'user', text: this.inputText });
    // TODO: API 호출 및 응답 처리
    this.inputText = '';
  }

  startVoiceInput() {
    if (this.isListening) return;
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('이 브라우저는 음성 인식을 지원하지 않습니다. Chrome 최신 버전을 권장합니다.');
      return;
    }
    this.recognition = new SpeechRecognition();
    this.recognition.lang = 'ko-KR';
    this.recognition.interimResults = false;
    this.recognition.maxAlternatives = 1;

    this.isListening = true;

    this.recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      this.inputText = transcript;
      this.isListening = false;
    };
    this.recognition.onerror = (event: any) => {
      this.isListening = false;
      alert('음성 인식 중 오류가 발생했습니다: ' + event.error);
    };
    this.recognition.onend = () => {
      this.isListening = false;
    };
    this.recognition.start();
  }
}
