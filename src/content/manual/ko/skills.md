사용 가능한 스킬(도구)을 탐색하고 관리하는 탭입니다.

![스킬 탭](skills-tab.png)

## 스킬 종류

### 기본 스킬 (Built-in)
앱에 내장된 스킬로, 비활성화할 수 없습니다:

| 스킬 | 기능 |
|------|------|
| `skill_time` | 현재 날짜/시간 확인 |
| `skill_memo` | 메모 저장/조회 |
| `skill_system_status` | 시스템 상태 확인 |
| `skill_weather` | 날씨 조회 |
| `skill_skill_manager` | 스킬 검색/활성화/비활성화 |

### 커스텀 스킬 (Custom)
Gateway를 통해 추가된 스킬로, 켜고 끌 수 있습니다:
- 파일 읽기/쓰기, 명령 실행, 웹 검색 등
- Gateway 또는 Command 타입

## 스킬 출처 (어디서 가져오나요?)

- **기본 스킬**: 앱에 내장되어 함께 제공됩니다
- **커스텀 스킬**: 로컬 스킬 폴더(예: `~/.cafelua/skills/.../skill.json`)에서 로드됩니다
- 스킬 카드를 펼치면 출처(`source`) 배지로 확인할 수 있습니다

## 커스텀 스킬 추가 방법

1. `~/.cafelua/skills/<스킬명>/skill.json` 경로에 스킬 매니페스트를 준비합니다
2. 필요하면 스킬이 호출할 스크립트/실행 파일도 같은 폴더에 배치합니다
3. 앱에서 스킬 탭을 열고 목록에 새 스킬이 보이는지 확인합니다
4. 스킬이 보이면 토글을 켜서 활성화합니다
5. 채팅에서 해당 스킬 사용 요청을 보내 동작을 확인합니다

추가 후 보이지 않으면 앱을 재시작한 뒤 다시 확인하세요.

## 고급 시나리오: OpenClaw + cron 자동화

팀/개인 자동화 환경에서는 OpenClaw 쪽에 스킬을 등록하고, cron으로 정기 실행을 구성할 수 있습니다.

예시 시나리오:
- 매일 오전 9시: 전날 작업 로그 요약 생성
- 매시간: 특정 폴더 상태 점검 후 이상 감지 알림
- 매일 자정: 리포트 파일 생성/업로드

권장 흐름:
1. 커스텀 스킬을 등록하고 로컬에서 수동 실행 검증
2. OpenClaw에서 메신저 채널(권장: Slack/Discord) 알림 대상을 1개 이상 설정
3. OpenClaw 작업 정의에 해당 스킬 호출 단계 추가
4. cron 스케줄로 정기 트리거 연결
5. 실패 시 재시도/알림 정책을 함께 설정

메신저 연동을 해두면 작업 성공/실패, 요약 결과를 팀 채널로 즉시 받을 수 있습니다.

> 아래 메신저 연동은 **향후 계획(로드맵)** 기준입니다. 현재는 수동 연동이며, 실제 연결에는 웹훅/봇 토큰 설정이 필요합니다.

### 메신저별 연동 예시

**Slack (권장)**

`skill.json` 설정:
```json
{
  "name": "notify_slack",
  "type": "command",
  "command": "curl -X POST -H 'Content-Type: application/json' -d '{\"text\":\"${MESSAGE}\"}' $SLACK_WEBHOOK_URL"
}
```

**Discord**

Discord 웹훅은 Slack과 유사한 구조입니다:
```json
{
  "name": "notify_discord",
  "type": "command",
  "command": "curl -X POST -H 'Content-Type: application/json' -d '{\"content\":\"${MESSAGE}\"}' $DISCORD_WEBHOOK_URL"
}
```

**E2E 테스트 예시 (Vitest)**

실제 알림이 전송되는지 자동화 테스트로 검증할 수 있습니다:

```typescript
import { describe, it, expect, vi } from "vitest";
import { skillRegistry } from "../skills/registry";

describe("메신저 알림 스킬 E2E", () => {
  it("Slack 웹훅으로 메시지를 전송한다", async () => {
    // mock fetch로 Slack API 호출 검증
    const fetchSpy = vi.spyOn(globalThis, "fetch")
      .mockResolvedValueOnce(new Response("ok", { status: 200 }));

    const result = await skillRegistry.execute(
      "notify_slack",
      { message: "빌드 성공: v1.2.0 배포 완료" },
    );

    expect(result.success).toBe(true);
    expect(fetchSpy).toHaveBeenCalledWith(
      expect.stringContaining("hooks.slack.com"),
      expect.objectContaining({
        method: "POST",
        body: expect.stringContaining("빌드 성공"),
      }),
    );

    fetchSpy.mockRestore();
  });

  it("웹훅 실패 시 에러를 반환한다", async () => {
    const fetchSpy = vi.spyOn(globalThis, "fetch")
      .mockResolvedValueOnce(new Response("error", { status: 500 }));

    const result = await skillRegistry.execute(
      "notify_slack",
      { message: "테스트 메시지" },
    );

    expect(result.success).toBe(false);
    expect(result.error).toContain("500");

    fetchSpy.mockRestore();
  });
});
```

**cron + 알림 통합 흐름 예시**

```bash
# crontab -e
# 매일 오전 9시: 작업 로그 요약 → Slack 알림
0 9 * * * openclaw run daily-summary --notify slack

# 매시간: 서버 상태 점검 → 이상 시만 알림
0 * * * * openclaw run health-check --notify discord --on-error-only
```

- Telegram은 봇 생성/토큰 발급 절차가 길어 **고급 옵션**으로 제공됩니다

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

채팅에서 Alpha에게 스킬 관리를 요청할 수도 있습니다:

- "사용할 수 있는 스킬 목록 보여줘"
- "날씨 관련 스킬이 있어?"
- "healthcheck 스킬을 꺼줘"
- "코딩 관련 스킬을 찾아줘"

Alpha가 `skill_skill_manager` 도구를 사용하여 자동으로 처리합니다.

## 보안 단계

| 단계 | 설명 | 승인 |
|------|------|------|
| T0 | 읽기 전용, 부작용 없음 | 자동 승인 |
| T1 | 알림만 | 알림 표시 |
| T2 | 주의 필요 | 사용자 승인 필요 |
| T3 | 위험한 작업 | 사용자 승인 필수 |
