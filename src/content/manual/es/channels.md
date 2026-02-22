Esta pestaña gestiona varios canales de mensajería conectados a la aplicación (Discord, Slack, Google Chat, Telegram, etc.).

![Channels Tab](channels-tab.png)

## Visualización de la lista de canales
Puedes ver todos los canales conectados y el estado de cada cuenta de un vistazo.

- **Distintivo de estado**: Muestra estados como `connected`, `disconnected` o `error`.
- **Actualizar**: Haz clic en el botón de actualizar en la parte superior derecha para obtener el estado más reciente.

## Inicio de sesión en el canal (código QR)
Puedes iniciar un inicio de sesión web para conectar un canal específico.
Al indicarle a Naia en el chat: "Start Discord web login", mostrará un código QR o entrará en un estado de espera de autenticación si es necesario.

## Integración del bot de Discord

Inicia sesión con tu cuenta de Discord en [naia.nextain.io](https://naia.nextain.io) para vincular automáticamente tu cuenta. Una vez vinculada, podrás chatear con Naia por mensaje directo en Discord.

### Cómo usarlo
1. **Inicia sesión con Discord** en naia.nextain.io
2. Tu cuenta se vincula automáticamente al bot de Naia
3. **Envía un mensaje directo** al bot para empezar a chatear
4. Los créditos se deducen automáticamente de tu cuenta de naia.nextain.io

### Características
- **Solo mensajes directos**: Naia responde a mensajes directos de usuarios vinculados
- **Integración de créditos**: Los créditos de tu cuenta de naia.nextain.io se usan automáticamente
- **Orientación para usuarios no registrados**: Los usuarios sin una cuenta vinculada reciben instrucciones de configuración
- **Límite de velocidad**: Límite de 10 mensajes por minuto para proteger tus créditos

## Integración de Google Chat (Próximamente)

La integración con Google Chat está planeada para una futura actualización. Mantente atento a los anuncios.

## Notificaciones de mensajería (Webhooks)
Naia OS hereda el potente sistema de canales de OpenClaw.
Al introducir tu URL de Webhook de Slack, Discord o Google Chat en el menú **Ajustes > Herramientas > Webhooks** o durante la pantalla de incorporación inicial, Naia puede enviarte mensajes con los resultados de tareas importantes.

> **Consejo:** "Let me know on Discord when this file backup is completely finished!"

## Avanzado: Construye un bot autónomo 24/7
Al utilizar la herramienta de comandos de terminal (`execute_command`), puedes convertir a Naia en un agente autónomo 24/7 que reside en Telegram o Discord, más allá de tu escritorio.

Manda a Naia en el chat de esta manera:
> "My Telegram bot token is `1234:ABC...`. Run `openclaw channels add --channel telegram --token 1234:ABC...` to start my Telegram bot."

Ahora, incluso si cierras la aplicación de escritorio, puedes chatear con Naia y asignar tareas en cualquier momento a través de Telegram en tu teléfono mediante el OpenClaw Gateway en segundo plano.