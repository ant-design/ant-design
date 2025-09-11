---
group:
  title: AI
order: 10
title: MCP
tag: New
---

This guide shows how to feed Ant Design’s component library, APIs and usage patterns to any LLM-powered editor (Cursor, Claude, ChatGPT MCP plug-in, Gemini CLI, etc.) through the Model Context Protocol (MCP).

## What is MCP?

Model Context Protocol is an open standard that lets large language models pull in external context—docs, APIs, databases—at request time. By exposing Ant Design’s llms.txt files over MCP, every supported tool reads the same canonical knowledge base, so answers stay consistent across editors.

## Available Routes

We provide several LLMs.txt routes to help AI tools access our documentation:

- [llms.txt](https://ant.design/llms.txt) - Contains a structured overview of all components and their documentation links
- [llms-full.txt](https://ant.design/llms-full.txt) - Provides comprehensive documentation including implementation details and examples

## Add Ant Design to your MCP config

Each tool declares external context slightly differently. Copy the snippet for the editor you use.

### ChatGPT MCP plug-in

Add the following to your `~/.config/mcp/config.json`:

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

`.cursorrules` or project-level Cursor settings:

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

### Windsurf

Add the following to your `~/.codeium/mcp_config.json`：

```json
{
  "mcpServers": {
    "llms": {
      "serverUrl": "https://ant.design/llms.txt"
    },
    "llms-full": {
      "serverUrl": "https://ant.design/llms-full.txt"
    }
  }
}
```

### Claude Code

Docs / Context Files section:

```json
{
  "mcpServers": ["https://ant.design/llms.txt", "https://ant.design/llms-full.txt"]
}
```

### Gemini CLI

Pass via command line arguments:

```bash
gemini --context https://ant.design/llms.txt --context https://ant.design/llms-full.txt
```

Or add to `.gemini/config.json`:

```json
{
  "contexts": ["https://ant.design/llms.txt", "https://ant.design/llms-full.txt"]
}
```

### Trae

Open Trae → AI sidebar → top-right "Settings" → "MCP" → "+ Add" → "Add Manually", then paste the following into the JSON configuration box that appears:

```json
{
  "mcpServers": {
    "ant-design-proxy": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-http"],
      "env": {
        "ANTD_DOCS_URL": "https://ant.design/llms.txt",
        "ANTD_DOCS_FULL_URL": "https://ant.design/llms-full.txt"
      }
    }
  }
}
```

### Qoder

Open Qoder → Top right “User Icon” → “MCP” → “+ Add”, and paste the JSON configuration in the pop-up configuration box:

```json
{
  "mcp_version": "1.0",
  "documents": [
    {
      "name": "ant-design-llms.txt",
      "type": "text",
      "source": "https://ant.design/llms.txt",
      "format": "txt",
      "description": "Contains a structured overview of all components and their documentation links"
    },
    {
      "name": "ant-design-llms-full.txt",
      "type": "text",
      "source": "https://ant.design/llms-full.txt",
      "format": "txt",
      "description": "Provides comprehensive documentation including implementation details and examples"
    }
  ],
  "options": {
    "refresh_interval": 3600,
    "max_retries": 3,
    "timeout": 5000
  }
}
```
