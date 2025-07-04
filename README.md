# Aria

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.0.5.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

## 변경 사항 (2024-06-09)
- chat 컴포넌트에서 음성 인식(마이크) 종료 시, 인식된 텍스트가 있으면 자동으로 메시지가 전송됩니다.
  - 사용자는 음성 입력 후 별도의 전송 버튼을 누르지 않아도 됩니다.
- 이제 모든 API 호출에 sessionId가 자동으로 포함됩니다. sessionId는 최초 1회 생성되어 localStorage에 저장되며, 새로고침해도 유지됩니다.

## [2024-06-09] 채팅 UI/UX 리디자인

- chat.html 구조를 현대적이고 심플하게 개선
  - 메시지: 말풍선 형태, 사용자/봇 구분, 이모지 아이콘 추가
  - 입력창: 텍스트 입력 + 음성 입력 버튼 병렬 배치
  - 전체 컨테이너: 카드형, 그라데이션 배경, 그림자, 반응형
- chat.css 스타일을 세련되고 현대적으로 리디자인
  - 컬러, 여백, 그림자, 애니메이션, 반응형 등 적용
- 기존 주석/불필요 코드 정리

## 변경 사항 (2024-06-10)
- 채팅 메시지가 추가될 때마다 채팅창이 자동으로 맨 아래로 스크롤됩니다.
- 채팅 메시지 영역의 스크롤바를 심플하고 세련되게 커스텀함.
- 채팅 메시지 영역 스크롤바가 컨테이너 모서리와 자연스럽게 어울리도록 개선.

## 2024-06-09 모바일 모드 UI 수정
- 모바일 환경에서 오른쪽에 세로 흰줄이 보이는 문제를 해결하기 위해 CSS(`src/app/chat/chat.css`)를 수정하였습니다.
  - .chat-card의 width: 100vw → width: 100%로 변경
  - .chat-card, .messages, .input-row에 box-sizing: border-box 명확히 지정
  - html, body에 box-sizing: border-box, overflow-x: hidden 추가
