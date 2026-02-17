# lab.cafelua.com 프로젝트 규칙

> 이 문서는 `.agents/context/agents-rules.json`의 한국어 미러입니다.

## 프로젝트 정체성

- **이름**: lab.cafelua.com
- **성격**: Cafelua 서비스 포털 — OAuth 로그인, 크레딧 대시보드, 게이트웨이 클라이언트
- **철학**: any-llm gateway의 얇은 웹 클라이언트. 인증 + 대시보드만.
- **도메인**: lab.cafelua.com

## 아키텍처

- **프레임워크**: Next.js 16 (App Router)
- **언어**: TypeScript
- **스타일링**: Tailwind CSS 4
- **배포**: Vercel
- **백엔드**: Next.js API Routes (BFF 패턴)

### Gateway 연동
- URL: `https://api.cafelua.com`
- 인증: Master Key → 사용자별 Virtual Key
- 프로토콜: OpenAI-compatible REST (any-llm gateway)

### 인증 (Auth)
- 프로바이더: Google OAuth, Discord OAuth
- 라이브러리: NextAuth.js v5
- 토큰 플로우: OAuth → NextAuth 세션 → gateway virtual key → 데스크톱 앱용 JWT

## 페이지 구조

| 경로 | 설명 |
|------|------|
| `/` | 랜딩 — 로그인 CTA |
| `/login` | OAuth 프로바이더 선택 (Google, Discord) |
| `/dashboard` | 크레딧 잔액, 사용 내역, 계정 정보 |
| `/settings` | 프로필, API 키 관리 |
| `/callback` | 데스크톱 앱 딥링크 리다이렉트 (`cafelua://auth?code=<token>`) |

## 코딩 컨벤션

- **패키지 매니저**: npm
- **포매터**: ESLint + Prettier (Next.js 기본)
- **파일명**: kebab-case
- **컴포넌트명**: PascalCase
- **함수명**: camelCase
- **상수명**: UPPER_SNAKE_CASE
- **코드 주석**: 영어, 문서: 한국어
- **임포트 별칭**: `@/*`

## 테스팅

- **프레임워크**: Vitest + React Testing Library
- **접근법**: Integration-first TDD
- RED → GREEN → REFACTOR

## 개발 프로세스

### 사이클
```
PLAN → CHECK → BUILD → VERIFY → CLEAN → COMMIT
```

### 브랜치 전략
- `main`: 프로덕션 (Vercel 자동 배포)
- `dev`: 통합 브랜치
- `feature/<name>`: 기능 브랜치

### 커밋 컨벤션
- 형식: `<type>(<scope>): <description>`
- 타입: feat, fix, refactor, test, docs, chore
- 스코프: auth, dashboard, api, ui, config
- 언어: 영어

## 컨텍스트 관리

- `.agents/`: AI용 (영어, JSON/YAML, 토큰 최적화)
- `.users/`: 사람용 (한국어, Markdown, 상세)
- **SoT**: `.agents/context/agents-rules.json`
- **미러링**: 한쪽 변경 시 반드시 다른 쪽도 업데이트

## AI 작업 규칙

- **응답 언어**: 한국어
- **코딩 전 필수 읽기**: agents-rules.json, development-cycle.yaml
- **TDD 필수** (integration first)

## 작업 로그

- **위치**: `work-logs/` (프로젝트 내부)
- **형식**: `YYYYMMDD-{번호}-{주제}.md`
- **언어**: 한국어 선호

## 관련 프로젝트 (참조용, 수정 금지)

| 프로젝트 | 관계 | 비고 |
|---------|------|------|
| `project-any-llm` | 백엔드 게이트웨이 | 참조만 |
| `cafelua-os` | 데스크톱 클라이언트 | lab.cafelua.com 인증 플로우 소비자 |
