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

## Official MCP Server

Starting from [`@ant-design/cli`](https://github.com/ant-design/ant-design-cli) v6.3.5, you can launch an official MCP server with the `antd mcp` command, providing 7 tools and 2 prompts for IDE integration.

### Tools

| Tool             | Description                                |
| ---------------- | ------------------------------------------ |
| `antd_list`      | Enumerate available components             |
| `antd_info`      | Retrieve component property specifications |
| `antd_doc`       | Fetch complete documentation               |
| `antd_demo`      | Access runnable code examples              |
| `antd_token`     | Query design token values                  |
| `antd_semantic`  | Inspect DOM structure and styling hooks    |
| `antd_changelog` | Analyze API changes across versions        |

### Prompts

| Prompt                | Description                                     |
| --------------------- | ----------------------------------------------- |
| `antd-expert`         | Positions the agent as an Ant Design specialist |
| `antd-page-generator` | Assists with component-based page creation      |

### Configuration

Install the CLI globally and add the MCP server to your IDE configuration:

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

You can pin a specific antd version with additional args:

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

## Usage with AI Tools

| Tool | Description | Configuration |
| --- | --- | --- |
| **Cursor** | Add to `.cursor/mcp.json` or Settings → Features → MCP. [Documentation](https://docs.cursor.com/context/@-symbols/@-docs) | `{ "mcpServers": { "antd": { "command": "antd", "args": ["mcp"] } } }` |
| **Windsurf** | Add to `~/.codeium/windsurf/mcp_config.json`. [Documentation](https://docs.windsurf.com/windsurf/cascade/memories) | `{ "mcpServers": { "antd": { "command": "antd", "args": ["mcp"] } } }` |
| **Claude Code** | Add to `mcpServers` in Claude settings. [Documentation](https://docs.anthropic.com/en/docs/claude-code) | `{ "mcpServers": { "antd": { "command": "antd", "args": ["mcp"] } } }` |
| **Codex** | Add to `.codex/mcp.json`. [Documentation](https://github.com/openai/codex) | `{ "mcpServers": { "antd": { "command": "antd", "args": ["mcp"] } } }` |
| **Gemini CLI** | Add to MCP configuration. [Documentation](https://ai.google.dev/gemini-api/docs?hl=en) | `{ "mcpServers": { "antd": { "command": "antd", "args": ["mcp"] } } }` |
| **Trae** | Add to MCP settings. [Documentation](https://www.trae.ai/docs) | `{ "mcpServers": { "antd": { "command": "antd", "args": ["mcp"] } } }` |
| **Qoder** | Add to MCP configuration. [Documentation](https://docs.qoder.com/) | `{ "mcpServers": { "antd": { "command": "antd", "args": ["mcp"] } } }` |
| **Neovate Code** | Configure MCP in settings or describe task with prompt. [Documentation](https://github.com/neovateai/neovate-code) | `{ "mcpServers": { "antd": { "command": "antd", "args": ["mcp"] } } }` |

## Community MCP Server

You can also use the community-maintained MCP server: [`@jzone-mcp/antd-components-mcp`](https://www.npmjs.com/package/@jzone-mcp/antd-components-mcp)

This MCP server provides the following capabilities:

- **list-components** - List all available Ant Design components
- **get-component-docs** - Get detailed documentation for a specific component
- **list-component-examples** - Get code examples for a component
- **get-component-changelog** - Get the changelog for a component

Configuration:

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

## Alternative: Using LLMs.txt

If your AI tool doesn't support MCP, you can use our [LLMs.txt](/docs/react/llms-en-US) support instead. We provide:

- [llms.txt](https://ant.design/llms.txt) - Structured overview of all components
- [llms-full.txt](https://ant.design/llms-full.txt) - Complete documentation with examples

## Learn More

- [Model Context Protocol Documentation](https://modelcontextprotocol.io/)
- [Ant Design CLI](/docs/react/cli-en-US)
- [Ant Design LLMs.txt Guide](/docs/react/llms-en-US)
- [@ant-design/cli on GitHub](https://github.com/ant-design/ant-design-cli)
- [@jzone-mcp/antd-components-mcp on npm](https://www.npmjs.com/package/@jzone-mcp/antd-components-mcp)
