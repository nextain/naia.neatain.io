Quando as ferramentas estão ativadas, Naia pode realizar várias tarefas diretamente.

## Ferramentas Disponíveis

| Ferramenta | Função | Segurança |
|------|----------|----------|
| execute_command | Executar comandos do terminal | T3 |
| read_file | Ler conteúdo de arquivos | T0 |
| write_file | Criar/modificar arquivos | T2 |
| search_files | Pesquisar sistema de arquivos | T0 |
| web_search | Pesquisa na Internet | T1 |
| apply_diff | Editar arquivos (aplicar diff) | T2 |
| browser | Abrir páginas web | T1 |
| sessions_spawn | Criar sub-agentes | T2 |

## Exemplos de Uso

Você pode usar as ferramentas através de linguagem natural:

| Requisição | Ferramenta Usada |
|---------|-----------|
| "Mostrar arquivos nesta pasta" | search_files |
| "Ler README.md" | read_file |
| "Executar git status" | execute_command |
| "Pesquisar por TypeScript" | web_search |
| "Revisar este código" | sessions_spawn |

## Aprovação de Segurança

Cada ferramenta requer aprovação com base no seu nível de segurança:

- **T0 (Somente leitura)**: Aprovação automática — sem efeitos colaterais
- **T1 (Notificação)**: Aviso exibido — acesso externo, mas sem alterações
- **T2 (Cuidado)**: Aprovação do usuário necessária — modificações de arquivos, criação de agentes
- **T3 (Perigoso)**: Aprovação do usuário necessária — execução de comandos

Ao aprovar pela primeira vez, selecionar "Sempre Permitir" aprova automaticamente essa ferramenta para o futuro. Você pode redefinir as ferramentas permitidas em Configurações > Ferramentas.

## Conexão com o Gateway

As ferramentas requerem uma conexão com o Gateway:

1. Ative **Ativar Ferramentas** em Configurações > Ferramentas
2. Em ambientes de usuário normais, os detalhes da conexão com o Gateway são tratados automaticamente
3. Se as ferramentas não responderem, reinicie o aplicativo e tente novamente
4. Verifique se as habilidades necessárias estão ativadas na aba Habilidades
5. Apenas configurações auto-hospedadas/avançadas precisam de verificações manuais de URL/token do Gateway