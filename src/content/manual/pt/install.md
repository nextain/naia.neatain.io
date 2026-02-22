Naia OS é projetado principalmente para ambientes Linux, focando em Immutable OSs como Bazzite ou ambientes de sandbox seguros como Flatpak.

## Requisitos do Sistema

- **OS**: Linux (Bazzite, Ubuntu, Fedora, etc.)
- **Servidor Gráfico**: Wayland (recomendado) ou X11
- **Runtime**: Node.js 22+ (se compilando a partir do código-fonte)
- **Daemon**: Requer suporte a Systemd User Service

---

## Opções de Implantação

Uma vez que o Naia OS possui uma IA que "controla o OS diretamente", o método de implantação é uma consideração importante.

### 1. Distribuição Flatpak (Recomendado)
Esta é a forma mais comum e segura de distribuir aplicativos de desktop Linux. Você pode instalá-lo facilmente via lojas de aplicativos como Discover ou GNOME Software.

- **Isolamento Seguro**: A UI do aplicativo (Tauri) e o agente principal (Node.js) rodam inteiramente dentro do sandbox.
- **Execução no Host**: Quando a IA precisa executar comandos de terminal (por exemplo, instalar um pacote ou gerenciar o sistema de arquivos do host), ela escapa com segurança do sandbox usando `flatpak-spawn --host`.
- **Como Instalar**:
  Baixe o pacote `.flatpak` fornecido e instale-o via terminal:
  ```bash
  flatpak install --user ./Naia-OS.flatpak
  ```

### 2. Imagem Integrada Bazzite / BlueBuild (Avançado)
Para usuários avançados, o Naia OS fornece uma receita BlueBuild para integrar o aplicativo diretamente em uma imagem Bazzite. Isso integra profundamente a IA ao OS, permitindo que Naia o cumprimente imediatamente na inicialização.

---

## 🛠️ (Para Desenvolvedores) Guia de Compilação Local do Flatpak

Para construir o aplicativo sandbox Flatpak a partir do código-fonte, siga estes passos:

1. **Instalar o Flatpak Builder**
   ```bash
   # Fedora / Bazzite
   sudo dnf install flatpak-builder
   
   # Ubuntu
   sudo apt install flatpak-builder
   ```

2. **Adicionar Dependências de Compilação (SDK)**
   ```bash
   flatpak remote-add --user --if-not-exists flathub https://flathub.org/repo/flathub.flatpakrepo
   flatpak install --user flathub org.freedesktop.Platform//24.08 org.freedesktop.Sdk//24.08
   ```

3. **Executar a Compilação do Pacote**
   Execute isso no diretório raiz do projeto (Naia-OS).
   ```bash
   # Compiles and builds into the build-dir
   flatpak-builder --user --install --force-clean build-dir flatpak/com.naia.shell.yml
   ```

4. **Executar o Aplicativo**
   ```bash
   flatpak run com.naia.shell
   ```

> **💡 Nota do Desenvolvedor:**
> Para manipular o ambiente host do usuário de dentro do sandbox Flatpak, o agente da IA envolve internamente todas as requisições da ferramenta `execute_command` com `flatpak-spawn --host bash -c ...` em `agent/src/gateway/tool-bridge.ts`.