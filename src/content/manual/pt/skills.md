Navegue e gerencie as habilidades (ferramentas) disponíveis.

![Skills tab](skills-tab.png)

## Tipos de Habilidade

### Habilidades Integradas
Incorporadas no aplicativo — não podem ser desativadas:

| Habilidade | Função | Nível de Segurança |
|------------|----------|-------------------|
| `skill_time` | Verificar data/hora atual | T0 |
| `skill_system_status` | Verificar status do sistema | T0 |
| `skill_memo` | Salvar/recuperar memorandos | T0 |
| `skill_weather` | Verificar clima | T0 |
| `skill_naia_discord` | Enviar/receber mensagens diretas do Discord | T1 |
| `skill_soul` | Gerenciar personalidade e memória da IA | T0 |
| `skill_exit` | Encerrar o aplicativo de forma elegante | T2 |

### Habilidades Personalizadas
Adicionadas via Gateway — podem ser ativadas/desativadas:
- Leitura/gravação de arquivos, execução de comandos, pesquisa na web, etc.
- Tipo Gateway ou Comando

## Fontes de Habilidade (De onde elas vêm?)

- **Habilidades integradas**: incluídas com o aplicativo
- **Habilidades personalizadas**: carregadas de manifestos de habilidade locais (por exemplo, `~/.naia/skills/.../skill.json`)
- Expanda um cartão de habilidade para verificar seu selo de `source`

## Como Adicionar uma Habilidade Personalizada

Naia OS é 100% compatível com o ecossistema OpenClaw. Existem três maneiras de adicionar habilidades:

### 1. Peça à IA para Criar (Mais Fácil)
Explique o que você quer no chat, e o Naia escreverá o código e criará a habilidade para você.
> "Crie uma habilidade que busque a taxa de câmbio atual e a salve em `~/.naia/skills/exchange/skill.json`."

### 2. Instalar do Clawhub (Método OpenClaw)
Você pode usar a ferramenta Terminal (`execute_command`) para instalar plugins diretamente de **[Clawhub.ai](https://clawhub.ai)**, o registro oficial de habilidades OpenClaw contendo mais de 5.700 habilidades.

> "Execute `openclaw plugins install @openclaw/plugin-github` no terminal para instalar o plugin do Github."

⚠️ **Aviso de Segurança:** Habilidades baixadas do Clawhub ou de outras fontes online são escritas por terceiros. Antes de instalar, sempre peça à IA para **"Revisar o código desta habilidade em busca de riscos de segurança (como exclusão de arquivos ou roubo de informações pessoais) antes de prosseguir)."**

### 3. Adição Manual
1. Crie um manifesto de habilidade em `~/.naia/skills/<skill-name>/skill.json`
2. Coloque qualquer script/executável necessário para essa habilidade na mesma pasta
3. Abra a aba Habilidades e verifique se a nova habilidade aparece
4. Habilite-a usando o botão de alternância
5. Teste-a no chat com uma solicitação que deve acionar a habilidade

Se não aparecer, reinicie o aplicativo e verifique novamente.

## Integração com a Comunidade Botmadang

Naia OS inclui uma habilidade integrada (`skill_botmadang`) dedicada ao **Botmadang**, uma comunidade coreana de Agentes de IA.

Você pode instruir o Naia a iniciar suas atividades no Botmadang via chat:
> "Registre-se como um novo agente no Botmadang. Defina seu nome para 'naia Agent'."

Uma vez registrado e com uma API Key, Naia pode postar artigos ou comentar em tópicos de outros agentes de forma autônoma.

## Habilidades de Notificação (Slack / Discord / Google Chat)

`skill_notify_slack` e `skill_notify_discord` são habilidades de notificação integradas que enviam mensagens via webhooks.

### Configuração de Webhook

Para usar habilidades de notificação, você precisa configurar uma URL de webhook. Existem dois métodos:

**Método 1: Variáveis de Ambiente (Recomendado)**

```bash
# Add to ~/.bashrc or ~/.zshrc
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

> Variáveis de ambiente têm prioridade sobre config.json.

### Exemplos de Uso

Basta perguntar ao Naia no chat:

- "Envie uma notificação de 'deploy completo' para o Slack"
- "Publique o relatório de status do servidor no Discord"
- "Notifique o canal #ops com os resultados da compilação"

O Naia chamará automaticamente `skill_notify_slack` ou `skill_notify_discord`.

Se nenhum webhook for configurado, uma mensagem explicando as etapas de configuração será exibida.

### Integração com OpenClaw Gateway (Avançado)

Quando um OpenClaw Gateway está conectado, as habilidades de notificação tentarão primeiro usar o RPC `skills.invoke` do Gateway. Se o retransmissão do Gateway falhar, a habilidade recorrerá à entrega direta por webhook.

A integração do canal Gateway oferece recursos mais ricos (formatação de mensagens, threads, menções, etc.).

## Cenário Avançado: Automação OpenClaw + cron

Em configurações de automação em equipe/pessoal, você pode registrar habilidades no OpenClaw e acioná-las em um cronograma com cron.

Cenários de exemplo:
- Diário 09:00: gerar um resumo dos registros de trabalho de ontem
- De hora em hora: escanear uma pasta alvo e notificar sobre anomalias
- Meia-noite: gerar e carregar um relatório diário

Fluxo recomendado:
1. Registre a habilidade personalizada e valide-a localmente primeiro
2. Configure os webhooks de habilidade de notificação para conectar canais de alerta
3. Adicione uma etapa de invocação de habilidade na sua definição de tarefa OpenClaw
4. Anexe um agendamento cron como o gatilho recorrente
5. Adicione políticas de repetição/notificação para falhas

> **Roteiro**: UI de agendamento cron, suporte a Telegram e roteamento multi-canal (enviar uma mensagem para vários canais simultaneamente) estarão disponíveis em futuras atualizações.

## Cartões de Habilidade

Cada habilidade é exibida como um cartão:

![Skill card detail](skills-card.png)

- **Nome**: Nome da habilidade (por exemplo, `skill_read_file`)
- **Descrição**: Resumo de uma linha (pode ser truncado)
- **Clique**: Clique no cartão para expandir a descrição completa
- **Selos**: Tipo (integrada/gateway/comando), nível de segurança (T0~T3)
- **Botão ?**: Peça à IA para explicar esta habilidade
- **Alternar**: Ativar/desativar habilidades personalizadas

## Pesquisa e Gerenciamento em Massa

- **Pesquisar**: Filtrar por nome ou descrição da habilidade
- **Habilitar Tudo**: Ativar todas as habilidades personalizadas
- **Desabilitar Tudo**: Desativar todas as habilidades personalizadas
- Contagem ativa/total exibida (por exemplo, 45/50)

## Gerenciar Habilidades via IA

Você também pode pedir ao Naia para gerenciar habilidades no chat:

- "Mostre-me a lista de habilidades disponíveis"
- "Existe uma habilidade relacionada ao clima?"
- "Desabilite a habilidade de verificação de saúde"
- "Encontre habilidades relacionadas à codificação"

O Naia usará a ferramenta `skill_skill_manager` automaticamente.

## Níveis de Segurança

| Nível | Descrição | Aprovação |
|-------|-------------|------------|
| T0 | Somente leitura, sem efeitos colaterais | Aprovação automática |
| T1 | Apenas notificação | Aviso exibido |
| T2 | Cuidado necessário | Aprovação do usuário necessária |
| T3 | Operação perigosa | Aprovação do usuário necessária |