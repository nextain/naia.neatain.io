사용 가능한 스킬(도구)을 탐색하고 관리하는 탭입니다.

![스킬 탭](skills-tab.png)

## 스킬 종류

### 기본 스킬 (Built-in)
앱에 하드코딩된 7개 스킬로, 비활성화할 수 없습니다:

| 스킬 | 기능 | 보안 단계 |
|------|------|-----------|
| `skill_time` | 현재 날짜/시간 확인 | T0 |
| `skill_system_status` | 시스템 상태 확인 | T0 |
| `skill_memo` | 메모 저장/조회 | T0 |
| `skill_weather` | 날씨 조회 | T0 |
| `skill_naia_discord` | Discord DM 전송/상태/히스토리 | T1 |
| `skill_soul` | AI 페르소나 설정 관리 | T0 |
| `skill_exit` | AI 에이전트 종료 | T0 |

### 커스텀 스킬 (63개 기본 제공)
`~/.naia/skills/`에서 로드되는 스킬로, 개별적으로 켜고 끌 수 있습니다. Naia 전용 스킬과 OpenClaw 커뮤니티 스킬이 포함됩니다.

**Naia 전용**: Gateway 설정, 승인 규칙, 기기 페어링, 채널 관리, Discord/Google Chat 연동, 세션 관리, 에이전트 관리, 진단, TTS, cron, 호출어, 봇마당 등

**OpenClaw 커뮤니티**: 날씨, GitHub, Slack, Notion, Obsidian, Trello, Spotify, 1Password, 이미지 생성(OpenAI), 음성 인식(Whisper), PDF, 코딩 에이전트, 스마트홈(OpenHue) 등

스킬 탭에서 전체 목록을 확인하고 필요한 것만 활성화할 수 있습니다.

### 커스텀 스킬 (Custom)
Gateway를 통해 추가된 스킬로, 켜고 끌 수 있습니다:
- 파일 읽기/쓰기, 명령 실행, 웹 검색 등
- Gateway 또는 Command 타입

## 스킬 출처 (어디서 가져오나요?)

- **기본 스킬**: 앱에 내장되어 함께 제공됩니다
- **커스텀 스킬**: 로컬 스킬 폴더(예: `~/.naia/skills/.../skill.json`)에서 로드됩니다
- 스킬 카드를 펼치면 출처(`source`) 배지로 확인할 수 있습니다

## 커스텀 스킬 추가 방법

Naia OS는 OpenClaw 생태계와 100% 호환됩니다. 스킬을 추가하는 세 가지 방법이 있습니다:

### 1. AI에게 직접 만들어달라고 하기 (가장 쉬운 방법)
채팅창에서 AI 아바타에게 원하는 기능을 설명하면, 즉석에서 스킬을 코딩하여 추가해 줍니다.
> "특정 웹사이트의 환율을 가져오는 스킬을 만들어줘. 파일은 `~/.naia/skills/exchange/skill.json`에 저장해."

### 2. Clawhub (공식 스토어)에서 설치하기 (OpenClaw 방식)
명령어 실행(Terminal) 도구를 통해 OpenClaw의 공식 스킬 레지스트리인 **[Clawhub.ai](https://clawhub.ai)**(5,700+개 스킬 보유)에서 플러그인을 그대로 설치할 수 있습니다.

> "터미널에서 `openclaw plugins install @openclaw/plugin-github` 명령어를 실행해서 깃허브 플러그인을 설치해줘."

⚠️ **보안 주의:** Clawhub 등 온라인에서 가져온 스킬은 제3자가 작성한 코드입니다. 설치 전 반드시 AI에게 **"이 스킬 코드를 먼저 읽고 보안상 위험한 동작(파일 삭제, 개인정보 탈취 등)을 하는지 검토해줘"**라고 지시하여 안전을 확인하세요.

### 3. 수동 추가
1. `~/.naia/skills/<스킬명>/skill.json` 경로에 스킬 매니페스트를 직접 작성합니다.
2. 필요하면 스킬이 호출할 스크립트/실행 파일도 같은 폴더에 배치합니다.
3. 앱에서 스킬 탭을 열고 새 스킬을 활성화합니다.

## 봇마당(Botmadang) 커뮤니티 연동

Naia OS에는 AI 에이전트 커뮤니티인 **봇마당(Botmadang)** 전용 내장 스킬(`skill_botmadang`)이 포함되어 있습니다.

채팅창에서 다음과 같이 지시하면 AI 아바타가 봇마당에서 활동을 시작합니다:
> "봇마당에 새로운 에이전트로 등록해줘. 이름은 'naia Agent'로 해줘."

가입 후 발급받은 API Key를 통해 자동으로 게시글을 쓰거나 다른 에이전트의 글에 댓글을 달며 자율적으로 활동할 수 있습니다.

## 알림 스킬 (Slack / Discord / Google Chat)

`skill_notify_slack`과 `skill_notify_discord`는 웹훅을 통해 메시지를 전송하는 커스텀 알림 스킬입니다.

### 웹훅 설정

알림 스킬을 사용하려면 웹훅 URL을 설정해야 합니다. 두 가지 방법이 있습니다:

**방법 1: 환경변수 (권장)**

```bash
# ~/.bashrc 또는 ~/.zshrc에 추가
export SLACK_WEBHOOK_URL="https://hooks.slack.com/services/T.../B.../xxx"
export DISCORD_WEBHOOK_URL="https://discord.com/api/webhooks/123/abc"
```

**방법 2: config.json**

```json
// ~/.naia/config.json
{
  "notifications": {
    "slack": {
      "webhookUrl": "https://hooks.slack.com/services/T.../B.../xxx"
    },
    "discord": {
      "webhookUrl": "https://discord.com/api/webhooks/123/abc"
    }
  }
}
```

> 환경변수가 config.json보다 우선합니다.

### 사용 예시

채팅에서 AI 아바타에게 요청하면 됩니다:

- "Slack으로 '배포 완료' 알림 보내줘"
- "Discord에 서버 상태 리포트 보내줘"
- "#ops 채널에 빌드 결과 알려줘"

AI 아바타가 자동으로 `skill_notify_slack` 또는 `skill_notify_discord`를 호출합니다.

웹훅이 설정되지 않은 경우, 설정 방법을 안내하는 메시지가 표시됩니다.

### OpenClaw Gateway 연동 (고급)

OpenClaw Gateway가 연결되어 있으면, 알림 스킬은 Gateway의 `skills.invoke` RPC를 먼저 시도합니다. Gateway를 통한 전송이 실패하면 직접 웹훅으로 폴백합니다.

Gateway 채널 통합은 더 풍부한 기능(메시지 포맷팅, 스레드, 멘션 등)을 제공합니다.

## 고급 시나리오: OpenClaw + cron 자동화

팀/개인 자동화 환경에서는 OpenClaw 쪽에 스킬을 등록하고, cron으로 정기 실행을 구성할 수 있습니다.

예시 시나리오:
- 매일 오전 9시: 전날 작업 로그 요약 생성
- 매시간: 특정 폴더 상태 점검 후 이상 감지 알림
- 매일 자정: 리포트 파일 생성/업로드

권장 흐름:
1. 커스텀 스킬을 등록하고 로컬에서 수동 실행 검증
2. 알림 스킬 웹훅을 설정하여 알림 채널 연결
3. OpenClaw 작업 정의에 해당 스킬 호출 단계 추가
4. cron 스케줄로 정기 트리거 연결
5. 실패 시 재시도/알림 정책을 함께 설정

> **로드맵**: cron 스케줄링 UI, Telegram 지원, 다채널 라우팅(하나의 메시지를 여러 채널에 동시 전송)은 향후 업데이트에서 제공될 예정입니다.

## 스킬 카드

각 스킬은 카드로 표시됩니다:

![스킬 카드 상세](skills-card.png)

- **이름**: 스킬 이름 (예: `skill_read_file`)
- **설명**: 한 줄 요약 (잘릴 수 있음)
- **클릭**: 카드를 클릭하면 전체 설명이 펼쳐집니다
- **배지**: 타입 (기본/게이트웨이/커맨드), 보안 단계 (T0~T3)
- **? 버튼**: AI에게 이 스킬에 대해 설명을 요청합니다
- **토글**: 커스텀 스킬의 활성/비활성 전환

## 검색 및 일괄 관리

- **검색**: 스킬 이름이나 설명으로 필터링
- **모두 활성화**: 모든 커스텀 스킬을 켭니다
- **모두 비활성화**: 모든 커스텀 스킬을 끕니다
- 활성/전체 수가 표시됩니다 (예: 45/50)

## AI로 스킬 관리하기

채팅에서 AI 아바타에게 스킬 관리를 요청할 수도 있습니다:

- "사용할 수 있는 스킬 목록 보여줘"
- "날씨 관련 스킬이 있어?"
- "healthcheck 스킬을 꺼줘"
- "코딩 관련 스킬을 찾아줘"

AI 아바타가 `skill_skill_manager` 도구를 사용하여 자동으로 처리합니다.

## 보안 단계

| 단계 | 설명 | 승인 |
|------|------|------|
| T0 | 읽기 전용, 부작용 없음 | 자동 승인 |
| T1 | 알림만 | 알림 표시 |
| T2 | 주의 필요 | 사용자 승인 필요 |
| T3 | 위험한 작업 | 사용자 승인 필수 |
