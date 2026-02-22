当工具启用时，AI助手可以直接执行各种任务。

## 可用工具

| 工具 | 功能 | 安全级别 |
|------|----------|----------|
| execute_command | 运行终端命令 | T3 |
| read_file | 读取文件内容 | T0 |
| write_file | 创建/修改文件 | T2 |
| search_files | 搜索文件系统 | T0 |
| web_search | 互联网搜索 | T1 |
| apply_diff | 编辑文件（应用差异） | T2 |
| browser | 打开网页 | T1 |
| sessions_spawn | 创建子代理 | T2 |

## 使用示例

您可以通过自然语言使用工具：

| 请求 | 使用的工具 |
|---------|-----------|
| “显示此文件夹中的文件” | search_files |
| “读取 README.md” | read_file |
| “运行 git status” | execute_command |
| “搜索 TypeScript” | web_search |
| “审查此代码” | sessions_spawn |

## 安全审批

每个工具都需要根据其安全级别进行审批：

- **T0 (只读)**: 自动批准 — 无副作用
- **T1 (通知)**: 显示通知 — 外部访问但无更改
- **T2 (警告)**: 需要用户批准 — 文件修改、代理生成
- **T3 (危险)**: 需要用户批准 — 命令执行

首次批准时，选择“始终允许”将自动批准该工具的后续使用。您可以在 Settings > Tools 中重置已允许的工具。

## 网关连接

工具需要网关连接：

1. 在 Settings > Tools 中启用 **Enable Tools**
2. 在普通用户环境中，网关连接详情会自动处理
3. 如果工具没有响应，请重启应用并重试
4. 检查 Skills tab 中是否启用了所需技能
5. 只有自托管/高级设置才需要手动检查 Gateway URL/token