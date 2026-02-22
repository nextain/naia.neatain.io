此选项卡管理连接到应用的各种消息通道（Discord、Slack、Google Chat、Telegram 等）。

![Channels Tab](channels-tab.png)

## 查看通道列表
您可以一目了然地查看所有已连接的通道和每个账户的状态。

- **状态徽章**：显示 `connected`、`disconnected` 或 `error` 等状态。
- **刷新**：点击右上角的刷新按钮以获取最新状态。

## 通道登录（二维码）
您可以启动网页登录以连接特定通道。
在聊天中告诉 AI 形象“Start Discord web login”，它将显示一个二维码，或者在需要时进入身份验证等待状态。

## Discord 机器人集成

在 [naia.nextain.io](https://naia.nextain.io) 使用您的 Discord 账户登录，即可自动关联您的账户。关联后，您可以通过 Discord 私信与 Naia 聊天。

### 如何使用
1. 在 naia.nextain.io **使用 Discord 登录**
2. 您的账户将自动与 Naia 机器人关联
3. 向机器人**发送私信**开始聊天
4. 积分将自动从您的 naia.nextain.io 账户中扣除

### 功能
- **仅限私信**：Naia 响应来自已关联用户的私信
- **积分集成**：您的 naia.nextain.io 账户中的积分将自动使用
- **未注册用户引导**：未关联账户的用户将收到设置说明
- **速率限制**：每分钟 10 条消息的限制以保护您的积分

## Google Chat 集成（即将推出）

Google Chat 集成计划在未来更新中推出。敬请关注最新公告。

## 消息通知（Webhooks）
Naia OS 继承了 OpenClaw 强大的通道系统。
通过在**设置 > 工具 > Webhooks**菜单或初始引导屏幕中输入您的 Slack、Discord 或 Google Chat Webhook URL，AI 形象可以向您发送重要任务结果的消息。

> **提示**：“当此文件备份完全完成时，请在 Discord 上通知我！”

## 高级：构建 24/7 全天候自主机器人
通过利用终端命令工具（`execute_command`），您可以将 AI 形象转变为一个 24/7 全天候自主代理，它不仅存在于您的桌面，还可以驻留在 Telegram 或 Discord 中。

在聊天中这样命令 AI 形象：
> “我的 Telegram 机器人令牌是 `1234:ABC...`。运行 `openclaw channels add --channel telegram --token 1234:ABC...` 来启动我的 Telegram 机器人。”

现在，即使您关闭桌面应用，您也可以随时通过手机上的 Telegram 经由后台 OpenClaw Gateway 与 AI 形象聊天并分配任务。