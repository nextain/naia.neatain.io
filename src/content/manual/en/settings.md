Configure all app settings. Click **Save** to apply changes.

![Settings overview](settings-overview.png)

## Language

- Switch between **Korean** / **English**
- Applied immediately

## Theme

8 color themes available:

| Theme | Mood |
|-------|------|
| Espresso | Warm brown (default) |
| Midnight | Dark navy |
| Ocean | Deep blue |
| Forest | Natural green |
| Rose | Rose purple |
| Latte | Light cream |
| Sakura | Cherry blossom pink |
| Cloud | Light gray |

Click a color swatch for instant preview.

## Avatar

### VRM Model
- Choose from 4 built-in models or **Choose File** to load a custom VRM
- Click for instant preview
- Leaving without saving reverts to the previous model

### Background Image
- Default gradient or built-in backgrounds
- **Choose File** to load a custom image (PNG, JPG, WebP)

## Persona

Customize AI 아바타's personality, speech style, and name in free text. Emotion tags are added automatically.

![Persona settings](settings-persona.png)

## NaN OS Account

Manage Lab integration.

### When Connected

- User ID displayed
- **Credit balance** shown (real-time query)
- **Dashboard** button: Open Lab dashboard in browser
- **Charge Credits** button: Go to Lab billing page
- **Disconnect** button: Unlink Lab account
- Settings auto-sync to Lab on save

### When Not Connected
- **Lab Login** button: Sign in via browser, auto-connects

## User Manual

Click "User Manual" to open this page in the browser.

## AI Settings

- **Provider**: Gemini (default), OpenAI, Claude, Grok, zAI, Ollama
  - Currently only Gemini available; others coming soon
- **Model**: Model name (e.g., gemini-2.5-flash)
- **API Key**: Provider API key (not needed if using Lab)

## Voice (TTS/STT)

- **Voice Response (TTS)**: ON/OFF
- **Voice Input (STT)**: ON/OFF
- **Google API Key**: Dedicated TTS/STT key (leave empty to use chat key)
- **TTS Voice**: Choose from 11 Korean voices
  - Neural2: High quality ($16/1M chars)
  - WaveNet: Natural ($16/1M chars)
  - Standard: Basic ($4/1M chars)
- **Preview** button to test selected voice

## Tools

Manage the system control permissions available to the AI avatar.

- **Enable Tools**: Master ON/OFF for tool features
- **Gateway URL / Gateway Token**: Automatically managed in normal user environments, so manual input is not required
  - Only advanced users running a self-hosted Gateway need to check/edit these values
- **Allowed Tools**: Tools marked as "Always Allow"
  - **Clear Allowed Tools**: Reset all approvals

> **Security Tiers (T0~T3) Guide**
> A 4-tier security system applies based on the system impact when the AI uses a tool.
> - **T0 (Read-only)**: Query tasks. Automatically executed without user intervention.
> - **T1 (Notify)**: Simple external search/notification. Shows an alert on screen upon execution.
> - **T2 (Caution)**: System changes like creating/editing files. Requires explicit user approval.
> - **T3 (Dangerous)**: Dangerous tasks like executing terminal commands. Requires approval every time.

## Channels

- **Channel Management**: Check the status of connected messenger channels and control integration with external services.
- (Detailed control is done in the Channels tab.)

## Integrations

Manage external messenger integrations on the **Settings > Integrations** page.

- **Discord Integration**: Automatically linked when you sign in with Discord. Add the bot to your server via the invite link to chat with the AI through mentions or DMs.
- **Google Chat Integration**: Chat with the AI through Google Chat when signed in with Google.
- Connection status (connected/not connected) is shown as badges.

## Device & Wake Word

![Device Settings](settings-device.png)

- **Wake Word List**: Manage words to wake up the AI (e.g., "Hey Nan", "Hello Nan")
- **Device Pairing**: Manage external device integrations (e.g., paired OpenClaw nodes) and connections with smart home devices.
- Includes features for device approval and token resets.

## Memory (Facts)

Manage facts AI 아바타 learned from conversations.
- Each fact shows a **key** and **value**
- **Delete** button to remove unnecessary facts
- Saved facts affect response personalization in later chats
- Deleting many facts can reduce personalization quality

## Save & Reset

- **Save**: Apply all changes
- **Reset All**: Restore all settings and camera to defaults (requires confirmation)
