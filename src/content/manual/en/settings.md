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

![Theme selection](settings-theme.png)

Click a color swatch for instant preview.

## Avatar

### VRM Model
- Choose from 4 built-in models or **Choose File** to load a custom VRM
- Click for instant preview
- Leaving without saving reverts to the previous model

### Background Image
- Default gradient or built-in backgrounds
- **Choose File** to load a custom image (PNG, JPG, WebP)

![Avatar settings](settings-avatar.png)

## Persona

Customize Alpha's personality, speech style, and name in free text. Emotion tags are added automatically.

![Persona settings](settings-persona.png)

## Cafelua Lab Account

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

![AI settings](settings-ai.png)

- **Provider**: Gemini (default), OpenAI, Claude, Grok, zAI, Ollama
  - Currently only Gemini available; others coming soon
- **Model**: Model name (e.g., gemini-2.5-flash)
- **API Key**: Provider API key (not needed if using Lab)

## Voice (TTS/STT)

![Voice settings](settings-voice.png)

- **Voice Response (TTS)**: ON/OFF
- **Voice Input (STT)**: ON/OFF
- **Google API Key**: Dedicated TTS/STT key (leave empty to use chat key)
- **TTS Voice**: Choose from 11 Korean voices
  - Neural2: High quality ($16/1M chars)
  - WaveNet: Natural ($16/1M chars)
  - Standard: Basic ($4/1M chars)
- **Preview** button to test selected voice

## Tools

- **Enable Tools**: Master ON/OFF for tool features
- **Gateway URL / Gateway Token**: Automatically managed in normal user environments, so manual input is not required
  - Only advanced users running a self-hosted Gateway need to check/edit these values
- **Allowed Tools**: Tools marked as "Always Allow"
  - **Clear Allowed Tools**: Reset all approvals

## Channels

- **Channel Management**: Check the status of connected messenger channels and control integration with external services.
- (Detailed control is done in the Channels tab.)

![Channels Settings](settings-channels.png)

## Device

![Device Settings](settings-device.png)

- Manage external device integrations (e.g., paired OpenClaw nodes) and connections with smart home devices.
- Includes features for device approval and token resets.

## Memory (Facts)

Manage facts Alpha learned from conversations.
- Each fact shows a **key** and **value**
- **Delete** button to remove unnecessary facts
- Saved facts affect response personalization in later chats
- Deleting many facts can reduce personalization quality

## Save & Reset

- **Save**: Apply all changes
- **Reset All**: Restore all settings and camera to defaults (requires confirmation)
