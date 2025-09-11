---
group:
  title: AI
order: 10
title: MCP
tag: New
---

本指南介绍如何通过 [Model Context Protocol (MCP)](https://modelcontextprotocol.io/docs/getting-started/intro) 使用 Ant Design 的 `LLMs.txt` 文档，帮助 AI 工具（如 Cursor、Claude、ChatGPT MCP 插件、Gemini CLI 等）更好地理解 Ant Design 的组件库、API 与使用模式。

## 什么是 MCP？

Model Context Protocol (MCP)是一个标准协议，用于让大语言模型（LLMs）访问外部资源（文档、API、数据库等）。通过 MCP，Ant Design 的 `llms.txt` 可以作为统一的上下文知识源，为多种 AI 工具提供一致的支持。

## 可用资源

我们提供多个 LLMs.txt 路由来帮助 AI 工具访问文档：

- [llms.txt](https://ant.design/llms.txt) - 包含所有组件及其文档链接的结构化概览
- [llms-full.txt](https://ant.design/llms-full.txt) - 提供包含实现细节和示例的完整文档

## MCP 配置示例

不同工具对 MCP 的支持方式不同，你可以在 MCP 配置文件中添加 `llms.txt` 作为上下文来源。

### ChatGPT MCP 插件

在 `~/.config/mcp/config.json` 中添加：

```json
{
  "servers": {
    "ant-design": {
      "resources": ["https://ant.design/llms.txt", "https://ant.design/llms-full.txt"]
    }
  }
}
```

### Cursor

在 `.cursorrules` 或项目配置中添加：

```json
{
  "mcpServers": [
    {
      "name": "ant-design",
      "resources": ["https://ant.design/llms.txt", "https://ant.design/llms-full.txt"]
    }
  ]
}
```

### Claude Code

在 Claude 的 Docs / Context Files中配置：

```json
{
  "mcpServers": ["https://ant.design/llms.txt", "https://ant.design/llms-full.txt"]
}
```

### Gemini CLI

通过命令行参数传入：

```bash
gemini --context https://ant.design/llms.txt
```

或在 `.gemini/config.json` 中添加：

```json
{
  "contexts": ["https://ant.design/llms.txt", "https://ant.design/llms-full.txt"]
}
```
