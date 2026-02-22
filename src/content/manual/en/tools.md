When tools are enabled, Naia can perform various tasks directly.

## Available Tools

| Tool | Function | Security |
|------|----------|----------|
| execute_command | Run terminal commands | T3 |
| read_file | Read file contents | T0 |
| write_file | Create/modify files | T2 |
| search_files | Search file system | T0 |
| web_search | Internet search | T1 |
| apply_diff | Edit files (apply diff) | T2 |
| browser | Open web pages | T1 |
| sessions_spawn | Create sub-agents | T2 |

## Usage Examples

You can use tools through natural language:

| Request | Tool Used |
|---------|-----------|
| "Show files in this folder" | search_files |
| "Read README.md" | read_file |
| "Run git status" | execute_command |
| "Search for TypeScript" | web_search |
| "Review this code" | sessions_spawn |

## Security Approval

Each tool requires approval based on its security tier:

- **T0 (Read-only)**: Auto-approved — no side effects
- **T1 (Notification)**: Notice shown — external access but no changes
- **T2 (Caution)**: User approval needed — file modifications, agent spawning
- **T3 (Dangerous)**: User approval required — command execution

When first approving, selecting "Always Allow" auto-approves that tool going forward. You can reset allowed tools in Settings > Tools.

## Gateway Connection

Tools require a Gateway connection:

1. Enable **Enable Tools** in Settings > Tools
2. In normal user environments, Gateway connection details are handled automatically
3. If tools do not respond, restart the app and try again
4. Check that required skills are enabled in the Skills tab
5. Only self-hosted/advanced setups need manual Gateway URL/token checks
