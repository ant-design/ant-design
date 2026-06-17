# Ant Design — For Agents

> This file is the single entry point for AI coding agents to learn how to work with Ant Design. Read it fully before writing any antd code.

## 1. Install the CLI

[`@ant-design/cli`](https://github.com/ant-design/ant-design-cli) ships all metadata locally — every prop, token, demo, and changelog entry for antd v3 / v4 / v5 / v6 — queryable in milliseconds, fully offline.

```bash
npm install -g @ant-design/cli
```

### Key commands

```bash
antd info <Component>               # Props, types, defaults
antd demo <Component> [name]        # Runnable demo source code (TSX)
antd token [Component]              # Design Token values (v5+)
antd semantic <Component>           # classNames / styles structure
antd doc <Component>                # Full markdown documentation
antd changelog [v1] [v2] [component]  # Changelog or cross-version API diff
antd doctor                         # Diagnose project issues
antd lint [target]                  # Check deprecated APIs & best practices
antd migrate <from> <to>            # Migration checklist with --apply agent prompt
antd list                           # List all components
```

Always use `--format json` for structured output you can parse programmatically.

## 2. MCP Server

If your environment supports [MCP (Model Context Protocol)](https://modelcontextprotocol.io/), configure it to access Ant Design knowledge as tools:

```json
{
  "mcpServers": {
    "antd": {
      "command": "npx",
      "args": ["-y", "@ant-design/cli", "mcp"]
    }
  }
}
```

This provides 8 tools (`antd_list`, `antd_info`, `antd_doc`, `antd_demo`, `antd_token`, `antd_design_md`, `antd_semantic`, `antd_changelog`) and 2 prompts (`antd-expert`, `antd-page-generator`).

## 3. LLMs.txt — structured documentation

If you need to load full component documentation into context:

| File                                                    | Description                            |
| ------------------------------------------------------- | -------------------------------------- |
| [llms.txt](https://ant.design/llms.txt)                 | Navigation file with links to all docs |
| [llms-full.txt](https://ant.design/llms-full.txt)       | Full component docs (English)          |
| [llms-full-cn.txt](https://ant.design/llms-full-cn.txt) | Full component docs (Chinese)          |

Single component: `https://ant.design/components/<name>.md`

## 4. Skill installation

If your agent supports [skills](https://github.com/nicepkg/agent-skills), install the Ant Design skill for automatic CLI integration:

```bash
npx skills add ant-design/ant-design-cli
```
