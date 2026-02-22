Configure todas as configurações do aplicativo. Clique em **Salvar** para aplicar as alterações.

![Settings overview](settings-overview.png)

## Idioma

- Alterne entre **Coreano** / **Inglês**
- Aplicado imediatamente

## Tema

8 temas de cores disponíveis:

| Tema | Humor |
|-------|------|
| Espresso | Marrom quente (padrão) |
| Midnight | Azul marinho escuro |
| Ocean | Azul profundo |
| Forest | Verde natural |
| Rose | Roxo rosado |
| Latte | Creme claro |
| Sakura | Rosa flor de cerejeira |
| Cloud | Cinza claro |

Clique em uma amostra de cor para visualização instantânea.

## Avatar

### Modelo VRM
- Escolha entre 4 modelos integrados ou **Escolher Arquivo** para carregar um VRM personalizado
- Clique para visualização instantânea
- Sair sem salvar reverte para o modelo anterior

### Imagem de Fundo
- Gradiente padrão ou fundos integrados
- **Escolher Arquivo** para carregar uma imagem personalizada (PNG, JPG, WebP)

## Persona

Personalize a personalidade, o estilo de fala e o nome de Naia em texto livre. As tags de emoção são adicionadas automaticamente.

![Persona settings](settings-persona.png)

## Conta Nextain

Gerencie a integração com o Nextain.

### Quando Conectado

- ID de Usuário exibido
- **Saldo de Crédito** mostrado (consulta em tempo real)
- Botão **Dashboard**: Abre o dashboard do Nextain no navegador
- Botão **Carregar Créditos**: Vai para a página de faturamento do Nextain
- Botão **Desconectar**: Desvincula a conta do Nextain
- As configurações são sincronizadas automaticamente com o Nextain ao salvar

### Quando Não Conectado
- Botão **Nextain Login**: Faça login via navegador, conecta-se automaticamente

## Manual do Usuário

Clique em "Manual do Usuário" para abrir esta página no navegador.

## Configurações de IA

- **Provedor**: Gemini (padrão), OpenAI, Claude, Grok, xAI, Ollama, Claude Code CLI
- **Modelo**: Nome do modelo (ex: gemini-2.5-flash)
- **API Key**: API key do provedor (não é necessária se estiver usando o Nextain)

## Voz (TTS/STT)

- **Resposta de Voz (TTS)**: LIGADO/DESLIGADO
- **Entrada de Voz (STT)**: LIGADO/DESLIGADO
- **Google API Key**: Chave dedicada de TTS/STT (deixe em branco para usar a chave de chat)
- **Voz TTS**: Escolha entre 11 vozes coreanas
  - Neural2: Alta qualidade (US$ 16/1M caracteres)
  - WaveNet: Natural (US$ 16/1M caracteres)
  - Standard: Básico (US$ 4/1M caracteres)
- Botão **Visualizar** para testar a voz selecionada

## Ferramentas

Gerencie as permissões de controle do sistema disponíveis para Naia.

- **Habilitar Ferramentas**: LIGADO/DESLIGADO mestre para recursos de ferramentas
- **Gateway URL / Gateway Token**: Gerenciados automaticamente em ambientes de usuário normais, portanto, a entrada manual não é necessária
  - Apenas usuários avançados que executam um Gateway auto-hospedado precisam verificar/editar esses valores
- **Ferramentas Permitidas**: Ferramentas marcadas como "Sempre Permitir"
  - **Limpar Ferramentas Permitidas**: Reinicia todas as aprovações

> **Guia de Níveis de Segurança (T0~T3)**
> Um sistema de segurança de 4 níveis se aplica com base no impacto no sistema quando a IA usa uma ferramenta.
> - **T0 (Somente leitura)**: Tarefas de consulta. Executadas automaticamente sem intervenção do usuário.
> - **T1 (Notificar)**: Busca/notificação externa simples. Exibe um alerta na tela após a execução.
> - **T2 (Cuidado)**: Alterações no sistema, como criação/edição de arquivos. Requer aprovação explícita do usuário.
> - **T3 (Perigoso)**: Tarefas perigosas, como execução de comandos de terminal. Requer aprovação toda vez.

## Canais

- **Gerenciamento de Canais**: Verifique o status dos canais de mensagens conectados e controle a integração com serviços externos.
- (O controle detalhado é feito na aba Canais.)

## Integrações

Gerencie integrações de mensageiros externos na página **Configurações > Integrações**.

- **Integração com Discord**: Vinculada automaticamente ao fazer login com o Discord. Envie uma mensagem direta ao bot para conversar com Naia.
- **Integração com Google Chat**: Planejada para uma futura atualização.
- O status da conexão (conectado/não conectado) é mostrado como selos.

## Dispositivo e Palavra de Ativação

![Device Settings](settings-device.png)

- **Lista de Palavras de Ativação**: Gerencie palavras para acordar a IA (ex: "Hey Naia", "Hello Naia")
- **Emparelhamento de Dispositivos**: Gerencie integrações de dispositivos externos (ex: nós OpenClaw emparelhados) e conexões com dispositivos de casa inteligente.
- Inclui recursos para aprovação de dispositivos e redefinições de token.

## Memória (Fatos)

Gerencie os fatos que Naia aprendeu nas conversas.
- Cada fato mostra uma **chave** e um **valor**
- Botão **Excluir** para remover fatos desnecessários
- Fatos salvos afetam a personalização da resposta em chats posteriores
- Excluir muitos fatos pode reduzir a qualidade da personalização

## Salvar e Redefinir

- **Salvar**: Aplicar todas as alterações
- **Redefinir Tudo**: Restaura todas as configurações e a câmera para os padrões (requer confirmação)