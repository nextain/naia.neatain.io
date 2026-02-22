Explora y gestiona las habilidades (herramientas) disponibles.

![Skills tab](skills-tab.png)

## Tipos de Habilidad

### Habilidades Integradas (Built-in Skills)
Integradas en la aplicación — no pueden ser deshabilitadas:

| Habilidad | Función | Nivel de Seguridad |
|---|---|---|
| `skill_time` | Verificar fecha/hora actual | T0 |
| `skill_system_status` | Verificar estado del sistema | T0 |
| `skill_memo` | Guardar/recuperar notas | T0 |
| `skill_weather` | Verificar el clima | T0 |
| `skill_naia_discord` | Enviar/recibir mensajes directos de Discord | T1 |
| `skill_soul` | Gestionar la personalidad y memoria de la IA | T0 |
| `skill_exit` | Cerrar la aplicación de forma elegante | T2 |

### Habilidades Personalizadas (Custom Skills)
Añadidas vía Gateway — pueden activarse/desactivarse:
- Lectura/escritura de archivos, ejecución de comandos, búsqueda web, etc.
- Tipo Gateway o Command

## Fuentes de Habilidades (¿De dónde vienen?)

- **Built-in skills**: incluidas con la aplicación
- **Custom skills**: cargadas desde manifiestos de habilidades locales (por ejemplo, `~/.naia/skills/.../skill.json`)
- Expande una tarjeta de habilidad para verificar su distintivo `source`

## Cómo Añadir una Habilidad Personalizada

Naia OS es 100% compatible con el ecosistema OpenClaw. Hay tres formas de añadir habilidades:

### 1. Pedir a la IA que la Construya (Lo más fácil)
Explica lo que quieres en el chat, y Naia escribirá el código y creará la habilidad por ti.
> "Construye una habilidad que obtenga el tipo de cambio actual y lo guarde en `~/.naia/skills/exchange/skill.json`."

### 2. Instalar desde Clawhub (Método OpenClaw)
Puedes usar la herramienta Terminal (`execute_command`) para instalar plugins directamente desde **[Clawhub.ai](https://clawhub.ai)**, el registro oficial de habilidades de OpenClaw que contiene más de 5,700 habilidades.

> "Ejecuta `openclaw plugins install @openclaw/plugin-github` en la terminal para instalar el plugin de Github."

⚠️ **Advertencia de Seguridad:** Las habilidades descargadas de Clawhub u otras fuentes en línea son escritas por terceros. Antes de instalar, siempre pide a la IA que **"Revise el código de esta habilidad en busca de riesgos de seguridad (como eliminar archivos o robar información personal) antes de continuar."**

### 3. Adición Manual
1. Crea un manifiesto de habilidad en `~/.naia/skills/<skill-name>/skill.json`
2. Coloca cualquier script/ejecutable requerido para esa habilidad en la misma carpeta
3. Abre la pestaña Skills y verifica si aparece la nueva habilidad
4. Habilítala usando el interruptor
5. Pruébala desde el chat con una solicitud que debería activar la habilidad

Si no aparece, reinicia la aplicación y verifica de nuevo.

## Integración con la Comunidad Botmadang

Naia OS incluye una habilidad integrada (`skill_botmadang`) dedicada a **Botmadang**, una comunidad coreana de Agentes de IA.

Puedes instruir a Naia para que inicie sus actividades en Botmadang a través del chat:
> "Regístrate como un nuevo agente en Botmadang. Establece tu nombre como 'naia Agent'."

Una vez registrado y con una API Key, Naia puede publicar artículos de forma autónoma o comentar en los hilos de otros agentes.

## Habilidades de Notificación (Slack / Discord / Google Chat)

`skill_notify_slack` y `skill_notify_discord` son habilidades de notificación personalizadas que envían mensajes vía webhooks.

### Configuración del Webhook

Para usar las habilidades de notificación, necesitas configurar una URL de webhook. Hay dos métodos:

**Método 1: Variables de Entorno (Recomendado)**

```bash
# Añadir a ~/.bashrc o ~/.zshrc
export SLACK_WEBHOOK_URL="https://hooks.slack.com/services/T.../B.../xxx"
export DISCORD_WEBHOOK_URL="https://discord.com/api/webhooks/123/abc"
```

**Método 2: config.json**

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

> Las variables de entorno tienen prioridad sobre config.json.

### Ejemplos de Uso

Simplemente pregunta a Naia en el chat:

- "Envía una notificación de 'despliegue completado' a Slack"
- "Publica el informe de estado del servidor en Discord"
- "Notifica al canal #ops los resultados de la compilación"

Naia llamará automáticamente a `skill_notify_slack` o `skill_notify_discord`.

Si no se configura ningún webhook, se mostrará un mensaje explicando los pasos de configuración.

### Integración con OpenClaw Gateway (Avanzado)

Cuando un OpenClaw Gateway está conectado, las habilidades de notificación intentarán primero usar la RPC `skills.invoke` del Gateway. Si la retransmisión del Gateway falla, la habilidad recurrirá a la entrega directa por webhook.

La integración del canal Gateway proporciona características más ricas (formato de mensajes, hilos, menciones, etc.).

## Escenario Avanzado: Automatización con OpenClaw + cron

En configuraciones de automatización en equipo/personal, puedes registrar habilidades en OpenClaw y activarlas en un horario con cron.

Escenarios de ejemplo:
- Diario 09:00: generar un resumen de los registros de trabajo de ayer
- Cada hora: escanear una carpeta objetivo y notificar sobre anomalías
- Medianoche: generar y subir un informe diario

Flujo recomendado:
1. Registra la habilidad personalizada y valídala primero localmente
2. Configura los webhooks de las habilidades de notificación para conectar los canales de alerta
3. Añade un paso de invocación de habilidad en la definición de tu tarea de OpenClaw
4. Adjunta un horario de cron como el disparador recurrente
5. Añade políticas de reintento/notificación para fallos

> **Hoja de Ruta**: la interfaz de usuario de programación de cron, el soporte para Telegram y el enrutamiento multicanal (envío de un mensaje a varios canales simultáneamente) estarán disponibles en futuras actualizaciones.

## Tarjetas de Habilidad

Cada habilidad se muestra como una tarjeta:

![Skill card detail](skills-card.png)

- **Name**: Nombre de la habilidad (ej., `skill_read_file`)
- **Description**: Resumen de una línea (puede ser truncado)
- **Click**: Haz clic en la tarjeta para expandir la descripción completa
- **Badges**: Tipo (built-in/gateway/command), nivel de seguridad (T0~T3)
- **? button**: Pide a la IA que explique esta habilidad
- **Toggle**: Habilitar/deshabilitar habilidades personalizadas

## Búsqueda y Gestión Masiva

- **Search**: Filtrar por nombre o descripción de la habilidad
- **Enable All**: Activar todas las habilidades personalizadas
- **Disable All**: Desactivar todas las habilidades personalizadas
- Se muestra el recuento activo/total (ej., 45/50)

## Gestionar Habilidades vía IA

También puedes pedir a Naia que gestione habilidades en el chat:

- "Muéstrame la lista de habilidades disponibles"
- "¿Hay alguna habilidad relacionada con el clima?"
- "Deshabilita la habilidad healthcheck"
- "Encuentra habilidades relacionadas con la codificación"

Naia utilizará la herramienta `skill_skill_manager` automáticamente.

## Niveles de Seguridad

| Nivel | Descripción | Aprobación |
|---|---|---|
| T0 | Solo lectura, sin efectos secundarios | Aprobación automática |
| T1 | Solo notificación | Aviso mostrado |
| T2 | Se requiere precaución | Se necesita aprobación del usuario |
| T3 | Operación peligrosa | Se requiere aprobación del usuario |