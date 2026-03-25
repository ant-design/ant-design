---
group:
  title: AI
  order: 0.9
order: 2
title: MCP Server
tag: New
---

本指南介绍如何通过 Model Context Protocol (MCP) 在 AI 工具中使用 Ant Design。

## 什么是 MCP？ {#what-is-mcp}

[Model Context Protocol (MCP)](https://modelcontextprotocol.io/) 是一个开放协议，使 AI 模型能够与外部工具和数据源进行交互。通过 MCP，AI 助手可以访问实时文档、代码示例和 API 参考资料。

## 官方 MCP Server {#official-mcp-server}

从 [`@ant-design/cli`](https://github.com/ant-design/ant-design-cli) v6.3.5 起，你可以通过 `antd mcp` 命令启动官方 MCP 服务器，提供 7 个工具和 2 个提示词，支持 IDE 集成。

### 工具 {#tools}

| 工具             | 说明                    |
| ---------------- | ----------------------- |
| `antd_list`      | 列出可用组件            |
| `antd_info`      | 获取组件属性规格        |
| `antd_doc`       | 获取完整文档            |
| `antd_demo`      | 获取可运行的代码示例    |
| `antd_token`     | 查询 Design Token 值    |
| `antd_semantic`  | 查看 DOM 结构和样式钩子 |
| `antd_changelog` | 分析跨版本 API 变更     |

### 提示词 {#prompts}

| 提示词                | 说明                            |
| --------------------- | ------------------------------- |
| `antd-expert`         | 将 Agent 定位为 Ant Design 专家 |
| `antd-page-generator` | 辅助基于组件的页面创建          |

### 配置 {#configuration}

全局安装 CLI 并将 MCP 服务器添加到 IDE 配置：

```bash
npm install -g @ant-design/cli
```

```json
{
  "mcpServers": {
    "antd": {
      "command": "antd",
      "args": ["mcp"]
    }
  }
}
```

你可以通过额外参数指定 antd 版本：

```json
{
  "mcpServers": {
    "antd": {
      "command": "antd",
      "args": ["mcp", "--version", "5.20.0"]
    }
  }
}
```

## 在 AI 工具中的使用 {#usage-with-ai-tools}

| 工具 | 说明 | 配置 |
| --- | --- | --- |
| **Cursor** | 添加到 `.cursor/mcp.json` 或设置 → 功能 → MCP。[文档](https://docs.cursor.com/zh/context/@-symbols/@-docs) | `{ "mcpServers": { "antd": { "command": "antd", "args": ["mcp"] } } }` |
| **Windsurf** | 添加到 `~/.codeium/windsurf/mcp_config.json`。[文档](https://docs.windsurf.com/windsurf/cascade/memories) | `{ "mcpServers": { "antd": { "command": "antd", "args": ["mcp"] } } }` |
| **Claude Code** | 添加到 Claude 设置的 `mcpServers`。[文档](https://docs.anthropic.com/en/docs/claude-code) | `{ "mcpServers": { "antd": { "command": "antd", "args": ["mcp"] } } }` |
| **Codex** | 添加到 `.codex/mcp.json`。[文档](https://github.com/openai/codex) | `{ "mcpServers": { "antd": { "command": "antd", "args": ["mcp"] } } }` |
| **Gemini CLI** | 添加到 MCP 配置。[文档](https://ai.google.dev/gemini-api/docs?hl=zh-cn) | `{ "mcpServers": { "antd": { "command": "antd", "args": ["mcp"] } } }` |
| **Trae** | 添加到 MCP 设置。[文档](https://www.trae.ai/docs) | `{ "mcpServers": { "antd": { "command": "antd", "args": ["mcp"] } } }` |
| **Qoder** | 添加到 MCP 配置。[文档](https://docs.qoder.com/) | `{ "mcpServers": { "antd": { "command": "antd", "args": ["mcp"] } } }` |
| **Neovate Code** | 在设置中配置 MCP 或使用提示词描述任务。[文档](https://github.com/neovateai/neovate-code) | `{ "mcpServers": { "antd": { "command": "antd", "args": ["mcp"] } } }` |

## 社区 MCP Server {#community-mcp-server}

你也可以使用社区维护的 MCP server：[`@jzone-mcp/antd-components-mcp`](https://www.npmjs.com/package/@jzone-mcp/antd-components-mcp)

该 MCP server 提供以下功能：

- **list-components** - 列出所有可用的 Ant Design 组件
- **get-component-docs** - 获取指定组件的详细文档
- **list-component-examples** - 获取组件的代码示例
- **get-component-changelog** - 获取组件的更新日志

配置：

```json
{
  "mcpServers": {
    "antd-components": {
      "command": "npx",
      "args": ["-y", "@jzone-mcp/antd-components-mcp"]
    }
  }
}
```

## 备选方案：使用 LLMs.txt {#alternative-llms-txt}

如果您的 AI 工具不支持 MCP，可以使用我们的 [LLMs.txt](/docs/react/llms-zh-CN) 支持。我们提供：

- [llms.txt](https://ant.design/llms.txt) - 所有组件的结构化概览
- [llms-full.txt](https://ant.design/llms-full.txt) - 包含示例的完整文档

## 了解更多 {#learn-more}

- [Model Context Protocol 文档](https://modelcontextprotocol.io/)
- [Ant Design CLI](/docs/react/cli-zh-CN)
- [Ant Design LLMs.txt 指南](/docs/react/llms-zh-CN)
- [@ant-design/cli GitHub 仓库](https://github.com/ant-design/ant-design-cli)
- [@jzone-mcp/antd-components-mcp npm 地址](https://www.npmjs.com/package/@jzone-mcp/antd-components-mcp)
