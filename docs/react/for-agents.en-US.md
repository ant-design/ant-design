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
Read https://ant.design/llms-full.txt and follow the Ant Design conventions when writing UI code.

If you can install skills, run:
npx skills add ant-design/ant-design-cli
```

That's it — two lines give your agent full Ant Design knowledge and CLI access.

## What happens

| Line | What it does |
| --- | --- |
| `Read https://ant.design/llms-full.txt ...` | Feeds the agent complete component docs — props, tokens, demos, and best practices — so it writes idiomatic antd code out of the box. |
| `npx skills add ant-design/ant-design-cli` | Installs the [@ant-design/cli](https://github.com/ant-design/ant-design-cli) skill, teaching the agent to query APIs, debug issues, lint code, and run migrations via `antd` commands. |

## Want more?

| Capability                     | Guide                         |
| ------------------------------ | ----------------------------- |
| Structured docs for LLMs       | [LLMs.txt](/docs/react/llms)  |
| MCP Server for IDE integration | [MCP Server](/docs/react/mcp) |
| Full CLI reference             | [CLI](/docs/react/cli)        |
