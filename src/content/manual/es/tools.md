Cuando las herramientas están habilitadas, Naia puede realizar varias tareas directamente.

## Herramientas Disponibles

| Herramienta | Función | Seguridad |
|------|----------|----------|
| execute_command | Ejecutar comandos de terminal | T3 |
| read_file | Leer contenido de archivos | T0 |
| write_file | Crear/modificar archivos | T2 |
| search_files | Buscar en el sistema de archivos | T0 |
| web_search | Búsqueda en internet | T1 |
| apply_diff | Editar archivos (aplicar diff) | T2 |
| browser | Abrir páginas web | T1 |
| sessions_spawn | Crear sub-agentes | T2 |

## Ejemplos de Uso

Puedes usar herramientas a través del lenguaje natural:

| Solicitud | Herramienta Usada |
|---------|-----------|
| "Mostrar archivos en esta carpeta" | search_files |
| "Leer README.md" | read_file |
| "Ejecutar git status" | execute_command |
| "Buscar TypeScript" | web_search |
| "Revisar este código" | sessions_spawn |

## Aprobación de Seguridad

Cada herramienta requiere aprobación basada en su nivel de seguridad:

- **T0 (Solo lectura)**: Aprobación automática — sin efectos secundarios
- **T1 (Notificación)**: Se muestra un aviso — acceso externo pero sin cambios
- **T2 (Precaución)**: Se necesita la aprobación del usuario — modificaciones de archivos, creación de agentes
- **T3 (Peligroso)**: Se requiere la aprobación del usuario — ejecución de comandos

Al aprobar por primera vez, seleccionar "Always Allow" aprueba automáticamente esa herramienta en el futuro. Puedes restablecer las herramientas permitidas en Configuración > Herramientas.

## Conexión Gateway

Las herramientas requieren una conexión Gateway:

1. Habilitar **Habilitar Herramientas** en Configuración > Herramientas
2. En entornos de usuario normales, los detalles de conexión de Gateway se manejan automáticamente
3. Si las herramientas no responden, reinicia la aplicación e inténtalo de nuevo
4. Verifica que las habilidades requeridas estén habilitadas en la pestaña Habilidades
5. Solo las configuraciones autoalojadas/avanzadas necesitan comprobaciones manuales de URL/token de Gateway