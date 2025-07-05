# Aria

AI 챗봇 및 음성 인식 기능을 제공하는 Angular 기반의 현대적 웹 애플리케이션입니다.

## 주요 특징
- **AI 챗봇**: 사용자와 자연스러운 대화가 가능한 챗봇 UI
- **음성 입력 지원**: 마이크 버튼을 통한 음성 인식 및 자동 메시지 전송
- **반응형 UI**: 데스크탑/모바일 모두 최적화된 카드형 디자인
- **자동 스크롤**: 새 메시지 도착 시 채팅창 자동 스크롤
- **세션 관리**: sessionId를 통한 사용자 세션 유지
- **/docs 폴더 빌드**: 정적 배포(GitHub Pages 등) 최적화

## 폴더 구조 (주요 파일)
```
aria/
  ├─ src/
  │   ├─ app/
  │   │   ├─ chat/         # 챗봇 UI/로직
  │   │   └─ ...
  │   ├─ index.html
  │   └─ ...
  ├─ public/               # 정적 자원(favicon 등)
  ├─ docs/                 # 빌드 결과물(정적 배포용)
  ├─ angular.json          # Angular 프로젝트 설정
  ├─ package.json          # 의존성 및 빌드/배포 스크립트
  └─ README.md
```

## 개발 환경
- Node.js 20.x 이상 권장
- Angular 20.x

## 설치 및 개발 서버 실행
```bash
npm install
npm start
```
- 브라우저에서 http://localhost:4200 접속

## 빌드 및 정적 배포
```bash
npm run build
```
- `/docs` 폴더에 정적 파일(index.html, js, css 등) 생성
- **Angular 17+ 구조상 빌드 결과가 `/docs/browser`에 생성되며, 자동으로 `/docs`로 이동(postbuild 스크립트) 후 `/docs/browser`는 삭제됩니다.**
- GitHub Pages 등에서 `/docs` 폴더를 루트로 지정해 배포 가능

## 주요 커스텀 방법
- **챗봇 UI/로직**: `src/app/chat/` 내 파일 수정
- **스타일**: `src/app/chat/chat.css` 및 `src/styles.css`에서 커스텀
- **정적 자원**: `public/` 폴더에 favicon 등 추가
- **환경 변수/API 연동**: Angular 환경 파일 또는 서비스에서 관리

## 주의사항
- Angular 17+ 이상에서만 정상 동작합니다.
- 빌드/배포 구조(특히 /docs, postbuild 스크립트 등) 변경 시 README도 즉시 최신화해야 합니다.

## 라이선스
MIT (또는 프로젝트 정책에 맞게 수정)
