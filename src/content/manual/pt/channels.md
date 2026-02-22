Esta aba gerencia vários canais de mensagens conectados ao aplicativo (Discord, Slack, Google Chat, Telegram, etc.).

![Channels Tab](channels-tab.png)

## Visualizando a Lista de Canais
Você pode ver todos os canais conectados e o status de cada conta rapidamente.

- **Emblema de Status**: Exibe estados como `connected`, `disconnected` ou `error`.
- **Atualizar**: Clique no botão de atualização no canto superior direito para obter o status mais recente.

## Login do Canal (QR Code)
Você pode iniciar um login via web para conectar um canal específico.
Ao dizer a Naia no chat, "Start Discord web login", ela exibirá um código QR ou entrará em um estado de espera de autenticação, se necessário.

## Integração do Bot do Discord

Faça login com sua conta do Discord em [naia.nextain.io](https://naia.nextain.io) para vincular sua conta automaticamente. Uma vez vinculada, você pode conversar com Naia via mensagem direta no Discord.

### Como Usar
1. **Faça login com o Discord** em naia.nextain.io
2. Sua conta é automaticamente vinculada ao bot da Naia
3. **Envie uma mensagem direta** ao bot para começar a conversar
4. Os créditos são deduzidos automaticamente da sua conta naia.nextain.io

### Recursos
- **Apenas mensagens diretas**: Naia responde a mensagens diretas de usuários vinculados
- **Integração de créditos**: Os créditos da sua conta naia.nextain.io são usados automaticamente
- **Orientação para usuários não registrados**: Usuários sem uma conta vinculada recebem instruções de configuração
- **Limite de taxa**: Limite de 10 mensagens por minuto para proteger seus créditos

## Integração do Google Chat (Em Breve)

A integração com o Google Chat está planejada para uma futura atualização. Fique atento aos anúncios.

## Notificações do Messenger (Webhooks)
Naia OS herda o poderoso sistema de canais do OpenClaw.
Ao inserir seu URL de Webhook do Slack, Discord ou Google Chat no menu **Configurações > Ferramentas > Webhooks** ou durante a tela de integração inicial, Naia pode enviar-lhe mensagens com os resultados de tarefas importantes.

> **Dica:** "Avise-me no Discord quando este backup de arquivo estiver completamente concluído!"

## Avançado: Crie um Bot Autônomo 24 horas por dia, 7 dias por semana
Ao utilizar a ferramenta de comando de terminal (`execute_command`), você pode transformar Naia em um agente autônomo 24 horas por dia, 7 dias por semana, que reside no Telegram ou Discord, indo além do seu desktop.

Comande Naia no chat assim:
> "Meu token de bot do Telegram é `1234:ABC...`. Execute `openclaw channels add --channel telegram --token 1234:ABC...` para iniciar meu bot do Telegram."

Agora, mesmo que você feche o aplicativo de desktop, você pode conversar com Naia e atribuir tarefas a qualquer momento através do Telegram em seu telefone via o OpenClaw Gateway em segundo plano.