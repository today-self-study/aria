import { Component, NgZone, ChangeDetectorRef, ViewChild, ElementRef, Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

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

@Injectable({ providedIn: 'root' })
export class ChatStateService {
  private _isListening = new BehaviorSubject<boolean>(false);
  isListening$ = this._isListening.asObservable();
  setListening(val: boolean) { this._isListening.next(val); }
}

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.html',
  styleUrls: ['./chat.css'],
})
export class ChatComponent {
  @ViewChild('chatContainer') chatContainer!: ElementRef;
  messages: ChatMessage[] = [];
  inputText: string = '';
  isListening: boolean = false;
  isLoading: boolean = false;
  recognition: any = null;
  sessionId: string = '';

  constructor(
    private http: HttpClient,
    private ngZone: NgZone,
    private cdr: ChangeDetectorRef,
    private chatState: ChatStateService
  ) {
    // 브라우저 환경에서만 localStorage 사용
    if (typeof window !== 'undefined' && window.localStorage) {
      const storedId = localStorage.getItem('sessionId');
      if (storedId) {
        this.sessionId = storedId;
      } else {
        this.sessionId = this.generateSessionId();
        localStorage.setItem('sessionId', this.sessionId);
      }
    } else {
      // SSR 등 브라우저가 아닌 환경에서는 메모리에서만 관리
      this.sessionId = this.generateSessionId();
    }
    this.chatState.isListening$.subscribe(val => {
      this.isListening = val;
    });
  }

  // 간단한 UUID 생성 함수
  generateSessionId(): string {
    return 'xxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = (Math.random() * 16) | 0,
        v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  sendMessage() {
    if (!this.inputText.trim() || this.isLoading) return;
    const userText = this.inputText;
    this.messages.push({ role: 'user', text: userText });
    this.inputText = '';
    this.isLoading = true;
    this.scrollToBottom();

    this.http
      .post<{ text: string } | string>(
        'http://dev.sillasol.com:5678/webhook/aria',
        { text: userText, sessionId: this.sessionId }
      )
      .subscribe({
        next: (res: any) => {
          // 응답이 객체이거나 문자열일 수 있으므로 분기 처리
          let botText = '[응답 없음]';
          if (typeof res === 'string') {
            botText = res;
          } else if (res.result) {
            botText = res.result;
          } else if (res.text) {
            botText = res.text;
          }
          this.messages.push({ role: 'bot', text: botText });
          this.isLoading = false;
          this.cdr.detectChanges();
          this.scrollToBottom();
        },
        error: (err) => {
          this.messages.push({
            role: 'bot',
            text: '[에러] 답변을 받아오지 못했습니다.',
          });
          this.isLoading = false;
          this.cdr.detectChanges();
          this.scrollToBottom();
        },
      });
  }

  startVoiceInput() {
    if (this.isListening) return;
    this.chatState.setListening(true);
    console.log('[startVoiceInput] 음성 인식 시작');

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert(
        '이 브라우저는 음성 인식을 지원하지 않습니다. Chrome 최신 버전을 권장합니다.'
      );
      return;
    }
    this.recognition = new SpeechRecognition();
    this.recognition.lang = 'ko-KR';
    this.recognition.interimResults = false;
    this.recognition.maxAlternatives = 1;

    this.recognition.onresult = (event: any) => {
      this.ngZone.run(() => {
        const transcript = event.results[0][0].transcript;
        this.inputText = transcript;
        this.chatState.setListening(false);
        this.cdr.detectChanges();
        this.scrollToBottom();
        console.log('Request: ', transcript);
      });
    };
    this.recognition.onerror = (event: any) => {
      this.ngZone.run(() => {
        this.chatState.setListening(false);
        this.cdr.detectChanges();
        alert('음성 인식 중 오류가 발생했습니다: ' + event.error);
      });
    };
    this.recognition.onend = () => {
      this.ngZone.run(() => {
        this.chatState.setListening(false);
        if (this.inputText.trim()) {
          this.sendMessage();
        }
        this.cdr.detectChanges();
      });
    };
    this.recognition.start();
  }

  scrollToBottom() {
    if (typeof window !== 'undefined' && this.chatContainer && this.chatContainer.nativeElement) {
      setTimeout(() => {
        this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
      }, 0);
    }
  }
}
