This tab manages various messaging channels connected to the app (Discord, Slack, Google Chat, Telegram, etc.).

![Channels Tab](channels-tab.png)

## Viewing Channel List
You can see all connected channels and the status of each account at a glance.

- **Status Badge**: Displays states like `connected`, `disconnected`, or `error`.
- **Refresh**: Click the refresh button in the top right to get the latest status.

## Channel Login (QR Code)
You can initiate a web login to connect a specific channel.
By telling Naia in the chat, "Start Discord web login," it will display a QR code or enter an authentication wait state if required.

## Discord Bot Integration

Sign in with your Discord account at [naia.nextain.io](https://naia.nextain.io) to automatically link your account. Once linked, you can chat with Naia via Discord DM.

### How to Use
1. **Sign in with Discord** at naia.nextain.io
2. Your account is automatically linked to the Naia bot
3. **Send a DM** to the bot to start chatting
4. Credits are automatically deducted from your naia.nextain.io account

### Features
- **DM-only**: Naia responds to direct messages from linked users
- **Credit integration**: Credits from your naia.nextain.io account are used automatically
- **Unregistered user guidance**: Users without a linked account receive setup instructions
- **Rate limiting**: 10 messages per minute limit to protect your credits

## Google Chat Integration (Coming Soon)

Google Chat integration is planned for a future update. Stay tuned for announcements.

## Messenger Notifications (Webhooks)
Naia OS inherits OpenClaw's powerful channel system.
By entering your Slack or Discord Webhook URL in the **Settings > Tools > Webhooks** menu or during the initial onboarding screen, Naia can send you messages with the results of important tasks.

> **Tip:** "Let me know on Discord when this file backup is completely finished!"

## Advanced: Build a 24/7 Autonomous Bot
By utilizing the terminal command tool (`execute_command`), you can turn Naia into a 24/7 autonomous agent that resides in Telegram or Discord, beyond just your desktop.

Command Naia in the chat like this:
> "My Telegram bot token is `1234:ABC...`. Run `openclaw channels add --channel telegram --token 1234:ABC...` to start my Telegram bot."

Now, even if you close the desktop app, you can chat with Naia and assign tasks anytime through Telegram on your phone via the background OpenClaw Gateway.
