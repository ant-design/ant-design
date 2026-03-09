---
group:
  title: AI
  order: 0.9
order: 2
title: MCP Server
tag: New
---

本指南介绍如何通过 Model Context Protocol (MCP) 在 AI 工具中使用 Ant Design。

## 什么是 MCP？

[Model Context Protocol (MCP)](https://modelcontextprotocol.io/) 是一个开放协议，使 AI 模型能够与外部工具和数据源进行交互。通过 MCP，AI 助手可以访问实时文档、代码示例和 API 参考资料。

## 社区 MCP Server

Ant Design 推荐使用社区维护的 MCP server：[`@jzone-mcp/antd-components-mcp`](https://www.npmjs.com/package/@jzone-mcp/antd-components-mcp)

该 MCP server 提供以下功能：

- **list-components** - 列出所有可用的 Ant Design 组件
- **get-component-docs** - 获取指定组件的详细文档
- **list-component-examples** - 获取组件的代码示例
- **get-component-changelog** - 获取组件的更新日志

## 在 AI 工具中的使用

| 工具 | 说明 | 提示词 |
| --- | --- | --- |
| **Cursor** | 添加到 `.cursor/mcp.json` 或设置 → 功能 → MCP。[文档](https://docs.cursor.com/zh/context/@-symbols/@-docs) | `添加 Ant Design MCP 服务器。配置: { "mcpServers": { "antd-components": { "command": "npx", "args": ["-y", "@jzone-mcp/antd-components-mcp"] } } }` |
| **Windsurf** | 添加到 `~/.codeium/windsurf/mcp_config.json`。[文档](https://docs.windsurf.com/windsurf/cascade/memories) | `添加 Ant Design MCP 服务器。配置: { "mcpServers": { "antd-components": { "command": "npx", "args": ["-y", "@jzone-mcp/antd-components-mcp"] } } }` |
| **Claude Code** | 添加到 Claude 设置的 `mcpServers`。[文档](https://docs.anthropic.com/en/docs/claude-code) | `添加 Ant Design MCP 服务器。配置: { "mcpServers": { "antd-components": { "command": "npx", "args": ["-y", "@jzone-mcp/antd-components-mcp"] } } }` |
| **Codex** | 添加到 `.codex/mcp.json`。[文档](https://github.com/openai/codex) | `添加 Ant Design MCP 服务器。配置: { "mcpServers": { "antd-components": { "command": "npx", "args": ["-y", "@jzone-mcp/antd-components-mcp"] } } }` |
| **Gemini CLI** | 添加到 MCP 配置。[文档](https://ai.google.dev/gemini-api/docs?hl=zh-cn) | `添加 Ant Design MCP 服务器。配置: { "mcpServers": { "antd-components": { "command": "npx", "args": ["-y", "@jzone-mcp/antd-components-mcp"] } } }` |
| **Trae** | 添加到 MCP 设置。[文档](https://www.trae.ai/docs) | `添加 Ant Design MCP 服务器。配置: { "mcpServers": { "antd-components": { "command": "npx", "args": ["-y", "@jzone-mcp/antd-components-mcp"] } } }` |
| **Qoder** | 添加到 MCP 配置。[文档](https://docs.qoder.com/) | `添加 Ant Design MCP 服务器。配置: { "mcpServers": { "antd-components": { "command": "npx", "args": ["-y", "@jzone-mcp/antd-components-mcp"] } } }` |
| **Neovate Code** | 在设置中配置 MCP 或使用提示词描述任务。[文档](https://github.com/neovateai/neovate-code) | `添加 Ant Design MCP 服务器。配置: { "mcpServers": { "antd-components": { "command": "npx", "args": ["-y", "@jzone-mcp/antd-components-mcp"] } } }` |

## 备选方案：使用 LLMs.txt

如果您的 AI 工具不支持 MCP，可以使用我们的 [LLMs.txt](/docs/react/llms-zh-CN) 支持。我们提供：

- [llms.txt](https://ant.design/llms.txt) - 所有组件的结构化概览
- [llms-full.txt](https://ant.design/llms-full.txt) - 包含示例的完整文档

## 了解更多

- [Model Context Protocol 文档](https://modelcontextprotocol.io/)
- [Ant Design LLMs.txt 指南](/docs/react/llms-zh-CN)
- [@jzone-mcp/antd-components-mcp npm 地址](https://www.npmjs.com/package/@jzone-mcp/antd-components-mcp)
