import { Component } from '@angular/core';

interface ChatMessage {
  role: 'user' | 'bot';
  text: string;
}

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  messages: ChatMessage[] = [];
  isListening = false;

  // 음성 입력 버튼 클릭 시 호출
  startVoiceInput() {
    // 실제 음성 인식 로직은 추후 구현
    this.isListening = true;
    // 예시: 2초 후 임시 메시지 추가 및 상태 해제
    setTimeout(() => {
      this.messages.push({ role: 'user', text: '안녕하세요(음성 인식 예시)' });
      this.isListening = false;
    }, 2000);
  }
}
