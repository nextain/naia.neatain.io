Browse and manage available skills (tools).

![Skills tab](skills-tab.png)

## Skill Types

### Built-in Skills
Embedded in the app — cannot be disabled:

| Skill | Function | Security Tier |
|-------|----------|---------------|
| `skill_time` | Check current date/time | T0 |
| `skill_memo` | Save/retrieve memos | T0 |
| `skill_system_status` | Check system status | T0 |
| `skill_weather` | Check weather | T0 |
| `skill_notify_slack` | Send notifications via Slack webhook | T1 |
| `skill_notify_discord` | Send notifications via Discord webhook | T1 |
| `skill_skill_manager` | Manage skills: search, enable, disable | T0 |

### Custom Skills
Added via Gateway — can be toggled on/off:
- File read/write, command execution, web search, etc.
- Gateway or Command type

## Skill Sources (Where do they come from?)

- **Built-in skills**: bundled with the app
- **Custom skills**: loaded from local skill manifests (for example, `~/.cafelua/skills/.../skill.json`)
- Expand a skill card to check its `source` badge

## How to Add a Custom Skill

Cafelua OS is 100% compatible with the OpenClaw ecosystem. There are three ways to add skills:

### 1. Ask AI to Build It (Easiest)
Explain what you want in the chat, and AI 아바타 will write the code and create the skill for you.
> "Build a skill that fetches the current exchange rate and save it to `~/.cafelua/skills/exchange/skill.json`."

### 2. Install from Github / Online (OpenClaw Way)
You can use the Terminal (`execute_command`) tool to install OpenClaw plugins directly.
> "Run `openclaw plugins install @openclaw/plugin-github` in the terminal to install the Github plugin."

### 3. Manual Addition
1. Create a skill manifest at `~/.cafelua/skills/<skill-name>/skill.json`
2. Place any required script/executable for that skill in the same folder
3. Open the Skills tab and check if the new skill appears
4. Enable it using the toggle
5. Test it from chat with a request that should trigger the skill

If it does not appear, restart the app and check again.

## Botmadang Community Integration

Cafelua OS includes a built-in skill (`skill_botmadang`) dedicated to **Botmadang**, a Korean AI Agent community.

You can instruct AI 아바타 to start its activities on Botmadang via chat:
> "Register as a new agent on Botmadang. Set your name to 'Cafelua Agent'."

Once registered and given an API Key, AI 아바타 can autonomously post articles or comment on other agents' threads.

## Notification Skills (Slack / Discord / Google Chat)

`skill_notify_slack` and `skill_notify_discord` are built-in notification skills that send messages via webhooks.

### Webhook Setup

To use notification skills, you need to configure a webhook URL. There are two methods:

**Method 1: Environment Variables (Recommended)**

```bash
# Add to ~/.bashrc or ~/.zshrc
export SLACK_WEBHOOK_URL="https://hooks.slack.com/services/T.../B.../xxx"
export DISCORD_WEBHOOK_URL="https://discord.com/api/webhooks/123/abc"
```

**Method 2: config.json**

```json
// ~/.cafelua/config.json
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

> Environment variables take priority over config.json.

### Usage Examples

Just ask AI 아바타 in chat:

- "Send a 'deploy complete' notification to Slack"
- "Post the server status report to Discord"
- "Notify the #ops channel with build results"

AI 아바타 will automatically call `skill_notify_slack` or `skill_notify_discord`.

If no webhook is configured, a message explaining the setup steps will be shown.

### OpenClaw Gateway Integration (Advanced)

When an OpenClaw Gateway is connected, notification skills will first attempt to use the Gateway's `skills.invoke` RPC. If Gateway relay fails, the skill falls back to direct webhook delivery.

Gateway channel integration provides richer features (message formatting, threads, mentions, etc.).

## Advanced Scenario: OpenClaw + cron Automation

In team/personal automation setups, you can register skills in OpenClaw and trigger them on a schedule with cron.

Example scenarios:
- Daily 09:00: generate a summary of yesterday's work logs
- Hourly: scan a target folder and notify on anomalies
- Midnight: generate and upload a daily report

Recommended flow:
1. Register the custom skill and validate it locally first
2. Configure notification skill webhooks to connect alert channels
3. Add a skill invocation step in your OpenClaw task definition
4. Attach a cron schedule as the recurring trigger
5. Add retry/notification policies for failures

> **Roadmap**: cron scheduling UI, Telegram support, and multi-channel routing (sending one message to multiple channels simultaneously) will be available in future updates.

## Skill Cards

Each skill is displayed as a card:

![Skill card detail](skills-card.png)

- **Name**: Skill name (e.g., `skill_read_file`)
- **Description**: One-line summary (may be truncated)
- **Click**: Click the card to expand full description
- **Badges**: Type (built-in/gateway/command), security tier (T0~T3)
- **? button**: Ask AI to explain this skill
- **Toggle**: Enable/disable custom skills

## Search & Bulk Management

- **Search**: Filter by skill name or description
- **Enable All**: Activate all custom skills
- **Disable All**: Deactivate all custom skills
- Active/total count displayed (e.g., 45/50)

## Manage Skills via AI

You can also ask AI 아바타 to manage skills in chat:

- "Show me the list of available skills"
- "Is there a weather-related skill?"
- "Disable the healthcheck skill"
- "Find coding-related skills"

AI 아바타 will use the `skill_skill_manager` tool automatically.

## Security Tiers

| Tier | Description | Approval |
|------|------------|----------|
| T0 | Read-only, no side effects | Auto-approved |
| T1 | Notification only | Notice shown |
| T2 | Caution required | User approval needed |
| T3 | Dangerous operation | User approval required |
