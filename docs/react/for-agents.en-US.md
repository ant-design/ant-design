---
group:
  title: AI
  order: 0.9
order: 0
title: For Agents
tag: New
---

This page provides a ready-to-use prompt that lets any AI coding agent work with Ant Design effectively.

## Copy this prompt

Copy into your agent conversation or automation runner.

```text
Before writing any code, please read https://ant.design/docs/react/for-agents.md and https://raw.githubusercontent.com/ant-design/ant-design-cli/main/skills/antd/SKILL.md, pay attention to deprecation warnings, and follow the instructions to use Ant Design.

If you can install skills, run:
npx skills add ant-design/ant-design-cli
```

## What the agent gets

### CLI — offline knowledge and project tools

[`@ant-design/cli`](https://github.com/ant-design/ant-design-cli) ships all metadata locally — every prop, token, demo, and changelog entry for antd v3 / v4 / v5 / v6 — queryable in milliseconds, fully offline.

```bash
npm install -g @ant-design/cli
```

```bash
antd list                           # All components with versions
antd info Button                    # Component props, types, defaults
antd doc Button                     # Full markdown documentation
antd demo Select basic              # Runnable demo source code
antd token DatePicker               # Design Token values (v5+)
antd design.md                      # Design-language document (design.md)
antd semantic Table                 # classNames / styles structure
antd changelog 4.24.0 5.0.0 Select  # API diff across versions
antd doctor                         # Diagnose project issues
antd env                            # Collect env info for bug reports
antd usage ./src                    # Analyze antd imports in project
antd lint ./src                     # Check deprecated APIs & best practices
antd migrate 3 4                    # v3 to v4 migration guide
antd migrate 4 5 --apply ./src      # Agent-ready migration prompt
antd mcp                            # Start MCP server for IDE integration
antd setup --client claude          # Set up MCP/Skill for AI agents
antd upgrade                        # Upgrade CLI to latest version
```

Full reference: [CLI](/docs/react/cli)

### MCP Server — IDE integration

The CLI also runs as an MCP server with 8 tools and 2 prompts for IDE integration (Claude Code, Cursor, VS Code, etc.).

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

Full reference: [MCP Server](/docs/react/mcp)

### LLMs.txt — structured docs for LLMs

Feed complete component documentation directly into AI context:

| File | Description |
| --- | --- |
| [llms.txt](https://ant.design/llms.txt) | Navigation file with links to all docs and components |
| [llms-full.txt](https://ant.design/llms-full.txt) | Full component documentation (English) |
| [llms-full-cn.txt](https://ant.design/llms-full-cn.txt) | Full component documentation (Chinese) |

Single component docs are also available at `https://ant.design/components/<name>.md`.

Full reference: [LLMs.txt](/docs/react/llms)
