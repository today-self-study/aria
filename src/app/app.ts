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
  isLoading = false;

  // 음성 입력 버튼 클릭 시 호출
  async startVoiceInput() {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('이 브라우저는 음성 인식을 지원하지 않습니다. 크롬 등 최신 브라우저를 사용해 주세요.');
      return;
    }
    const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = 'ko-KR';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    this.isListening = true;
    recognition.start();

    recognition.onresult = async (event: any) => {
      const transcript = event.results[0][0].transcript;
      this.messages.push({ role: 'user', text: transcript });
      this.isListening = false;
      await this.sendToApi(transcript);
    };
    recognition.onerror = (event: any) => {
      this.isListening = false;
      alert('음성 인식 중 오류가 발생했습니다: ' + event.error);
    };
    recognition.onend = () => {
      this.isListening = false;
    };
  }

  async sendToApi(text: string) {
    this.isLoading = true;
    this.messages.push({ role: 'bot', text: '응답을 기다리는 중...' });
    try {
      const res = await fetch('http://dev.sillasol.com:5678/webhook/aria', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text })
      });
      if (!res.ok) throw new Error('API 호출 실패');
      const data = await res.json();
      // 마지막 '응답을 기다리는 중...' 메시지 교체
      this.messages[this.messages.length - 1] = { role: 'bot', text: data.result || '(응답 없음)' };
    } catch (e: any) {
      this.messages[this.messages.length - 1] = { role: 'bot', text: 'API 호출 중 오류가 발생했습니다.' };
    } finally {
      this.isLoading = false;
    }
  }
}
