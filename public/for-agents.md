# Ant Design — For Agents

> This file is the single entry point for AI coding agents to learn how to work with Ant Design.

## CLI

Read https://raw.githubusercontent.com/ant-design/ant-design-cli/main/skills/antd/SKILL.md and follow the instructions to use Ant Design.

If you can install skills, run:

```bash
npx skills add ant-design/ant-design-cli
```

## MCP Server

If your environment supports [MCP (Model Context Protocol)](https://modelcontextprotocol.io/), configure the Ant Design MCP server:

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

## LLMs.txt

If you need to load full component documentation into context:

- [llms.txt](https://ant.design/llms.txt) — Navigation file with links to all docs
- [llms-full.txt](https://ant.design/llms-full.txt) — Full component docs (English)
- [llms-full-cn.txt](https://ant.design/llms-full-cn.txt) — Full component docs (Chinese)

Single component doc: `https://ant.design/components/<name>.md`
