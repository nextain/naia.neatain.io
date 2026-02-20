The main conversation screen with AI 아바타.

## Text Chat

![Chat screen](chat-text.png)

1. Type a message in the input field at the bottom
2. Press **Enter** or click the **Send button**
3. AI 아바타 generates a response (streams in real-time)
4. Use Shift+Enter for line breaks

## Voice Chat

1. Click the **microphone button** next to the input field
2. Speak when the microphone activates
3. Click again to stop recording — speech is converted to text (STT)
4. The converted text is automatically sent

## Voice Response (TTS)

- AI 아바타's responses are automatically played as audio
- Can be toggled off in Settings
- Avatar performs lip-sync during playback

## Cost Display

![Cost dashboard](chat-cost.png)

- **Total API cost** for the current session shown in the top right
- Click to open the detailed cost dashboard:
  - Messages per provider
  - Input/output token counts
  - Lab balance (when connected)
  - Credit charge link

## New Conversation

- Click the **+** button (top right) to start a new conversation
- Previous conversations are saved in the History tab

## Tool Execution Display

When AI 아바타 uses tools, the chat area shows:

![Tool execution display](chat-tool.png)

- Tool name (e.g., "Read File", "Execute Command")
- Execution status (running / success / error)
- Results (expandable)

## Approval Modal

For high-security tool executions:

| Button | Description |
|--------|-------------|
| **Allow Once** | Permit this single execution |
| **Always Allow** | Auto-approve this tool going forward |
| **Reject** | Deny execution |
