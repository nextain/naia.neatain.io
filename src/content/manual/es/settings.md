Configure todos los ajustes de la aplicación. Haz clic en **Guardar** para aplicar los cambios.

![Settings overview](settings-overview.png)

## Idioma

- Cambiar entre **coreano** / **inglés**
- Aplicado inmediatamente

## Tema

8 temas de color disponibles:

| Tema | Ambiente |
|-------|------|
| Espresso | Marrón cálido (predeterminado) |
| Midnight | Azul marino oscuro |
| Ocean | Azul profundo |
| Forest | Verde natural |
| Rose | Púrpura rosado |
| Latte | Crema claro |
| Sakura | Rosa flor de cerezo |
| Cloud | Gris claro |

Haz clic en una muestra de color para una vista previa instantánea.

## Avatar

### Modelo VRM
- Elige entre 4 modelos integrados o haz clic en **Elegir archivo** para cargar un VRM personalizado
- Haz clic para una vista previa instantánea
- Salir sin guardar revierte al modelo anterior

### Imagen de fondo
- Degradado predeterminado o fondos integrados
- **Elegir archivo** para cargar una imagen personalizada (PNG, JPG, WebP)

## Persona

Personaliza la personalidad, el estilo de habla y el nombre de Naia en texto libre. Las etiquetas de emoción se añaden automáticamente.

![Persona settings](settings-persona.png)

## Cuenta de Nextain

Gestionar la integración con Nextain.

### Cuando está conectado

- ID de usuario mostrado
- **Saldo de crédito** mostrado (consulta en tiempo real)
- Botón **Panel de control**: Abre el panel de control de Nextain en el navegador
- Botón **Cargar créditos**: Ir a la página de facturación de Nextain
- Botón **Desconectar**: Desvincular la cuenta de Nextain
- Los ajustes se sincronizan automáticamente con Nextain al guardar

### Cuando no está conectado
- Botón **Iniciar sesión en Nextain**: Inicia sesión a través del navegador, se conecta automáticamente

## Manual de usuario

Haz clic en "Manual de usuario" para abrir esta página en el navegador.

## Ajustes de IA

- **Proveedor**: Gemini (predeterminado), OpenAI, Claude, Grok, xAI, Ollama, Claude Code CLI
- **Modelo**: Nombre del modelo (ej., gemini-2.5-flash)
- **API Key**: Clave API del proveedor (no es necesaria si se usa Nextain)

## Voz (TTS/STT)

- **Respuesta de voz (TTS)**: ENCENDIDO/APAGADO
- **Entrada de voz (STT)**: ENCENDIDO/APAGADO
- **Google API Key**: Clave TTS/STT dedicada (dejar en blanco para usar la clave de chat)
- **Voz TTS**: Elige entre 11 voces coreanas
  - Neural2: Alta calidad ($16/1M caracteres)
  - WaveNet: Natural ($16/1M caracteres)
  - Estándar: Básico ($4/1M caracteres)
- Botón **Vista previa** para probar la voz seleccionada

## Herramientas

Gestiona los permisos de control del sistema disponibles para Naia.

- **Habilitar herramientas**: ENCENDIDO/APAGADO maestro para las funciones de herramientas
- **URL de Gateway / Token de Gateway**: Gestionado automáticamente en entornos de usuario normales, por lo que no se requiere entrada manual
  - Solo los usuarios avanzados que ejecuten un Gateway autoalojado necesitan verificar/editar estos valores
- **Herramientas permitidas**: Herramientas marcadas como "Permitir siempre"
  - **Borrar herramientas permitidas**: Restablecer todas las aprobaciones

> **Guía de niveles de seguridad (T0~T3)**
> Se aplica un sistema de seguridad de 4 niveles basado en el impacto en el sistema cuando la IA utiliza una herramienta.
> - **T0 (Solo lectura)**: Tareas de consulta. Ejecutadas automáticamente sin intervención del usuario.
> - **T1 (Notificar)**: Búsqueda/notificación externa simple. Muestra una alerta en pantalla al ejecutarse.
> - **T2 (Precaución)**: Cambios en el sistema como crear/editar archivos. Requiere aprobación explícita del usuario.
> - **T3 (Peligroso)**: Tareas peligrosas como ejecutar comandos de terminal. Requiere aprobación cada vez.

## Canales

- **Gestión de canales**: Verifica el estado de los canales de mensajería conectados y controla la integración con servicios externos.
- (El control detallado se realiza en la pestaña Canales).

## Integraciones

Gestiona las integraciones de mensajería externa en la página **Ajustes > Integraciones**.

- **Integración con Discord**: Vinculada automáticamente cuando inicias sesión con Discord. Envía un mensaje directo al bot para chatear con Naia.
- **Integración con Google Chat**: Planeada para una futura actualización.
- El estado de la conexión (conectado/no conectado) se muestra como insignias.

## Dispositivo y Palabra de Activación

![Device Settings](settings-device.png)

- **Lista de palabras de activación**: Gestiona las palabras para activar la IA (ej., "Hey Naia", "Hola Naia")
- **Emparejamiento de dispositivos**: Gestiona las integraciones de dispositivos externos (ej., nodos OpenClaw emparejados) y las conexiones con dispositivos de hogar inteligente.
- Incluye funciones para la aprobación de dispositivos y el restablecimiento de tokens.

## Memoria (Hechos)

Gestiona los hechos que Naia ha aprendido de las conversaciones.
- Cada hecho muestra una **clave** y un **valor**
- Botón **Eliminar** para remover hechos innecesarios
- Los hechos guardados afectan la personalización de la respuesta en chats posteriores
- Eliminar muchos hechos puede reducir la calidad de la personalización

## Guardar y Restablecer

- **Guardar**: Aplicar todos los cambios
- **Restablecer todo**: Restaura todos los ajustes y la cámara a los valores predeterminados (requiere confirmación)