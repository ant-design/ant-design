---
group:
  title: AI
  order: 0.9
order: 2
title: MCP Server
tag: New
---

This guide explains how to use Ant Design with AI tools through Model Context Protocol (MCP).

## What is MCP?

[Model Context Protocol (MCP)](https://modelcontextprotocol.io/) is an open protocol that enables AI models to interact with external tools and data sources. Through MCP, AI assistants can access real-time documentation, code examples, and API references.

## Community MCP Server

Ant Design recommends the community-maintained MCP server: [`@jzone-mcp/antd-components-mcp`](https://www.npmjs.com/package/@jzone-mcp/antd-components-mcp)

This MCP server provides the following capabilities:

- **list-components** - List all available Ant Design components
- **get-component-docs** - Get detailed documentation for a specific component
- **list-component-examples** - Get code examples for a component
- **get-component-changelog** - Get the changelog for a component

## Usage with AI Tools

| Tool | Description | Prompt |
| --- | --- | --- |
| **Cursor** | Add to `.cursor/mcp.json` or Settings → Features → MCP. [Documentation](https://docs.cursor.com/context/@-symbols/@-docs) | `Add Ant Design MCP server. Configuration: { "mcpServers": { "antd-components": { "command": "npx", "args": ["-y", "@jzone-mcp/antd-components-mcp"] } } }` |
| **Windsurf** | Add to `~/.codeium/windsurf/mcp_config.json`. [Documentation](https://docs.windsurf.com/windsurf/cascade/memories) | `Add Ant Design MCP server. Configuration: { "mcpServers": { "antd-components": { "command": "npx", "args": ["-y", "@jzone-mcp/antd-components-mcp"] } } }` |
| **Claude Code** | Add to `mcpServers` in Claude settings. [Documentation](https://docs.anthropic.com/en/docs/claude-code) | `Add Ant Design MCP server. Configuration: { "mcpServers": { "antd-components": { "command": "npx", "args": ["-y", "@jzone-mcp/antd-components-mcp"] } } }` |
| **Codex** | Add to `.codex/mcp.json`. [Documentation](https://github.com/openai/codex) | `Add Ant Design MCP server. Configuration: { "mcpServers": { "antd-components": { "command": "npx", "args": ["-y", "@jzone-mcp/antd-components-mcp"] } } }` |
| **Gemini CLI** | Add to MCP configuration. [Documentation](https://ai.google.dev/gemini-api/docs?hl=en) | `Add Ant Design MCP server. Configuration: { "mcpServers": { "antd-components": { "command": "npx", "args": ["-y", "@jzone-mcp/antd-components-mcp"] } } }` |
| **Trae** | Add to MCP settings. [Documentation](https://www.trae.ai/docs) | `Add Ant Design MCP server. Configuration: { "mcpServers": { "antd-components": { "command": "npx", "args": ["-y", "@jzone-mcp/antd-components-mcp"] } } }` |
| **Qoder** | Add to MCP configuration. [Documentation](https://docs.qoder.com/) | `Add Ant Design MCP server. Configuration: { "mcpServers": { "antd-components": { "command": "npx", "args": ["-y", "@jzone-mcp/antd-components-mcp"] } } }` |
| **Neovate Code** | Configure MCP in settings or describe task with prompt. [Documentation](https://github.com/neovateai/neovate-code) | `Add Ant Design MCP server. Configuration: { "mcpServers": { "antd-components": { "command": "npx", "args": ["-y", "@jzone-mcp/antd-components-mcp"] } } }` |

## Alternative: Using LLMs.txt

If your AI tool doesn't support MCP, you can use our [LLMs.txt](/docs/react/llms-en-US) support instead. We provide:

- [llms.txt](https://ant.design/llms.txt) - Structured overview of all components
- [llms-full.txt](https://ant.design/llms-full.txt) - Complete documentation with examples

## Learn More

- [Model Context Protocol Documentation](https://modelcontextprotocol.io/)
- [Ant Design LLMs.txt Guide](/docs/react/llms-en-US)
- [@jzone-mcp/antd-components-mcp on npm](https://www.npmjs.com/package/@jzone-mcp/antd-components-mcp)
