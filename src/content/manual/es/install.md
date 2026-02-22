Naia OS está diseñado principalmente para entornos Linux, centrándose en sistemas operativos inmutables (Immutable OSs) como Bazzite o entornos de espacio aislado (sandbox) seguros como Flatpak.

## Requisitos del Sistema

- **SO**: Linux (Bazzite, Ubuntu, Fedora, etc.)
- **Servidor de Pantalla**: Wayland (recomendado) o X11
- **Entorno de Ejecución**: Node.js 22+ (si se compila desde el código fuente)
- **Daemon**: Requiere soporte para Systemd User Service

---

## Opciones de Despliegue

Dado que Naia OS cuenta con una IA que "controla el SO directamente", el método de despliegue es una consideración importante.

### 1. Distribución Flatpak (Recomendado)
Esta es la forma más común y segura de distribuir aplicaciones de escritorio Linux. Puede instalarlo fácilmente a través de tiendas de aplicaciones como Discover o GNOME Software.

- **Aislamiento Seguro**: La interfaz de usuario de la aplicación (Tauri) y el agente central (Node.js) se ejecutan completamente dentro del espacio aislado (sandbox).
- **Ejecución en el Host**: Cuando la IA necesita ejecutar comandos de terminal (por ejemplo, instalar un paquete o gestionar el sistema de archivos del host), escapa de forma segura del espacio aislado (sandbox) utilizando `flatpak-spawn --host`.
- **Cómo Instalar**:
  Descargue el paquete `.flatpak` proporcionado e instálelo a través de la terminal:
  ```bash
  flatpak install --user ./Naia-OS.flatpak
  ```

### 2. Imagen Integrada Bazzite / BlueBuild (Avanzado)
Para usuarios avanzados, Naia OS proporciona una receta BlueBuild para integrar la aplicación directamente en una imagen de Bazzite. Esto integra profundamente la IA en el SO, permitiendo que Naia le salude inmediatamente al iniciar.

---

## 🛠️ (Para Desarrolladores) Guía de Compilación Local de Flatpak

Para compilar la aplicación Flatpak sandbox desde el código fuente, siga estos pasos:

1. **Instalar Flatpak Builder**
   ```bash
   # Fedora / Bazzite
   sudo dnf install flatpak-builder
   
   # Ubuntu
   sudo apt install flatpak-builder
   ```

2. **Añadir Dependencias de Compilación (SDK)**
   ```bash
   flatpak remote-add --user --if-not-exists flathub https://flathub.org/repo/flathub.flatpakrepo
   flatpak install --user flathub org.freedesktop.Platform//24.08 org.freedesktop.Sdk//24.08
   ```

3. **Ejecutar la Compilación del Paquete**
   Ejecute esto en el directorio raíz del proyecto (Naia-OS).
   ```bash
   # Compiles and builds into the build-dir
   flatpak-builder --user --install --force-clean build-dir flatpak/com.naia.shell.yml
   ```

4. **Ejecutar la Aplicación**
   ```bash
   flatpak run com.naia.shell
   ```

> **💡 Nota para Desarrolladores:**
> Para manipular el entorno del host del usuario desde dentro del espacio aislado (sandbox) de Flatpak, el agente de IA envuelve internamente todas las solicitudes de la herramienta `execute_command` con `flatpak-spawn --host bash -c ...` en `agent/src/gateway/tool-bridge.ts`.