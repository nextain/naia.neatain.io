# 프로젝트 초기 셋팅

- **날짜**: 2026-02-17
- **상태**: doing

## 작업 내용

### 완료
- [x] GitHub 레포 생성 (`luke-n-alpha/lab.cafelua.com`, private)
- [x] 루트 워크스페이스에 서브모듈 추가 (`project-lab.cafelua.com`)
- [x] Next.js 16 프로젝트 초기화 (TypeScript + Tailwind CSS 4 + App Router)
- [x] 듀얼 컨텍스트 구조 생성 (`.agents/` + `.users/`)
- [x] 루트 컨텍스트 연동 (CLAUDE.md, agents-rules.json, project-index.yaml)
- [x] AGENTS.md + CLAUDE.md 진입점 생성
- [x] work-logs 디렉토리 생성

### 예정
- [ ] NextAuth.js v5 설정 (Google + Discord OAuth)
- [ ] Gateway 클라이언트 라이브러리 (`src/lib/gateway-client.ts`)
- [ ] 페이지 구현: Landing, Login, Dashboard, Settings, Callback
- [ ] Vercel 배포 설정

## 아키텍처 결정

- **BFF 패턴**: API Routes로 gateway 프록시 (클라이언트에 키 노출 방지)
- **인증 플로우**: OAuth → NextAuth → gateway virtual key → 데스크톱 JWT
- **패키지 매니저**: npm (Next.js 기본)
