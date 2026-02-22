浏览和管理可用技能（工具）。

![Skills tab](skills-tab.png)

## 技能类型

### 内置技能
嵌入在应用程序中 — 无法禁用：

| 技能 | 功能 | 安全等级 |
|-------|----------|---------------|
| `skill_time` | 检查当前日期/时间 | T0 |
| `skill_system_status` | 检查系统状态 | T0 |
| `skill_memo` | 保存/检索备忘录 | T0 |
| `skill_weather` | 检查天气 | T0 |
| `skill_naia_discord` | 发送/接收Discord私信 | T1 |
| `skill_soul` | 管理AI个性和记忆 | T0 |
| `skill_exit` | 安全退出应用 | T2 |

### 自定义技能
通过Gateway添加 — 可以开启/关闭：
- 文件读/写、命令执行、网页搜索等。
- Gateway或Command类型

## 技能来源（它们从何而来？）

- **内置技能**：随应用程序捆绑
- **自定义技能**：从本地技能清单加载（例如，`~/.naia/skills/.../skill.json`）
- 展开技能卡片以查看其`source`徽章

## 如何添加自定义技能

Naia OS 与 OpenClaw 生态系统100%兼容。有三种添加技能的方式：

### 1. 让AI构建它（最简单）
在聊天中解释你的需求，Naia将为你编写代码并创建技能。
> "Build a skill that fetches the current exchange rate and save it to `~/.naia/skills/exchange/skill.json`."

### 2. 从Clawhub安装（OpenClaw方式）
你可以使用Terminal（`execute_command`）工具直接从**[Clawhub.ai](https://clawhub.ai)**安装插件，Clawhub.ai是官方的OpenClaw技能注册中心，包含超过5,700种技能。

> "Run `openclaw plugins install @openclaw/plugin-github` in the terminal to install the Github plugin."

⚠️ **安全警告：** 从Clawhub或其他在线来源下载的技能由第三方编写。在安装之前，务必请AI **"Review this skill's code for any security risks (like deleting files or stealing personal info) before proceeding."**

### 3. 手动添加
1. 在`~/.naia/skills/<skill-name>/skill.json`创建技能清单
2. 将该技能所需的任何脚本/可执行文件放置在同一文件夹中
3. 打开“技能”选项卡，检查新技能是否出现
4. 使用开关启用它
5. 通过应触发该技能的请求从聊天中测试它

如果它没有出现，请重新启动应用程序并再次检查。

## Botmadang社区集成

Naia OS 包含一个内置技能（`skill_botmadang`），专门用于韩国AI Agent社区**Botmadang**。

你可以通过聊天指示Naia在Botmadang上开始活动：
> "Register as a new agent on Botmadang. Set your name to 'naia Agent'."

注册并获得API Key后，Naia可以自主发布文章或评论其他agent的帖子。

## 通知技能（Slack / Discord / Google Chat）

`skill_notify_slack`和`skill_notify_discord`是内置的通知技能，通过webhook发送消息。

### Webhook设置

要使用通知技能，你需要配置一个webhook URL。有两种方法：

**方法1：环境变量（推荐）**

```bash
# Add to ~/.bashrc or ~/.zshrc
export SLACK_WEBHOOK_URL="https://hooks.slack.com/services/T.../B.../xxx"
export DISCORD_WEBHOOK_URL="https://discord.com/api/webhooks/123/abc"
```

**方法2：config.json**

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

> 环境变量优先于config.json。

### 使用示例

只需在聊天中询问Naia：

- "Send a 'deploy complete' notification to Slack"
- "Post the server status report to Discord"
- "Notify the #ops channel with build results"

Naia将自动调用`skill_notify_slack`或`skill_notify_discord`。

如果未配置webhook，将显示一条解释设置步骤的消息。

### OpenClaw Gateway集成（高级）

当OpenClaw Gateway连接时，通知技能将首先尝试使用Gateway的`skills.invoke` RPC。如果Gateway中继失败，技能将回退到直接webhook交付。

Gateway通道集成提供更丰富的功能（消息格式、线程、提及等）。

## 高级场景：OpenClaw + cron自动化

在团队/个人自动化设置中，你可以在OpenClaw中注册技能，并使用cron按计划触发它们。

示例场景：
- 每日09:00：生成昨天工作日志摘要
- 每小时：扫描目标文件夹并通知异常
- 午夜：生成并上传每日报告

推荐流程：
1. 注册自定义技能并首先在本地验证它
2. 配置通知技能webhook以连接警报通道
3. 在你的OpenClaw任务定义中添加技能调用步骤
4. 附加cron计划作为定期触发器
5. 为失败添加重试/通知策略

> **路线图**：cron调度UI、Telegram支持和多通道路由（同时将一条消息发送到多个通道）将在未来的更新中提供。

## 技能卡片

每个技能都显示为一张卡片：

![Skill card detail](skills-card.png)

- **名称**：技能名称（例如，`skill_read_file`）
- **描述**：一行摘要（可能被截断）
- **点击**：点击卡片以展开完整描述
- **徽章**：类型（内置/gateway/command）、安全等级（T0~T3）
- **?按钮**：请AI解释此技能
- **开关**：启用/禁用自定义技能

## 搜索和批量管理

- **搜索**：按技能名称或描述筛选
- **启用全部**：激活所有自定义技能
- **禁用全部**：停用所有自定义技能
- 显示活动/总数（例如，45/50）

## 通过AI管理技能

你也可以在聊天中请Naia管理技能：

- "Show me the list of available skills"
- "Is there a weather-related skill?"
- "Disable the healthcheck skill"
- "Find coding-related skills"

Naia将自动使用`skill_skill_manager`工具。

## 安全等级

| 等级 | 描述 | 审批 |
|------|------------|----------|
| T0 | 只读，无副作用 | 自动批准 |
| T1 | 仅通知 | 显示通知 |
| T2 | 需要谨慎 | 需要用户批准 |
| T3 | 危险操作 | 需要用户批准 |