This tab manages various messaging channels connected to the app (Discord, Slack, Google Chat, Telegram, etc.).

![Channels Tab](channels-tab.png)

## Viewing Channel List
You can see all connected channels and the status of each account at a glance.

- **Status Badge**: Displays states like `connected`, `disconnected`, or `error`.
- **Refresh**: Click the refresh button in the top right to get the latest status.

## Channel Login (QR Code)
You can initiate a web login to connect a specific channel.
By telling AI 아바타 in the chat, "Start Discord web login," it will display a QR code or enter an authentication wait state if required.

## Messenger Notifications (Webhooks)
Cafelua OS inherits OpenClaw's powerful channel system.
By entering your Discord or Google Chat Webhook URL in the **Settings > Tools > Webhooks** menu or during the initial onboarding screen, AI 아바타 can send you messages with the results of important tasks.

> **Tip:** "Let me know on Discord when this file backup is completely finished!"

## Advanced: Build a 24/7 Autonomous Bot
By utilizing the terminal command tool (`execute_command`), you can turn AI 아바타 into a 24/7 autonomous agent that resides in Telegram or Discord, beyond just your desktop.

Command AI 아바타 in the chat like this:
> "My Telegram bot token is `1234:ABC...`. Run `openclaw channels add --channel telegram --token 1234:ABC...` to start my Telegram bot."

Now, even if you close the desktop app, you can chat with AI 아바타 and assign tasks anytime through Telegram on your phone via the background OpenClaw Gateway.
