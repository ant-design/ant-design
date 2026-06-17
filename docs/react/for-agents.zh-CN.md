---
group:
  title: AI
  order: 0.9
order: 0
title: For Agents
tag: New
---

本页面提供一段开箱即用的提示词，让任何 AI 编程 Agent 高效使用 Ant Design。

## 复制这段 prompt {#copy-prompt}

复制到你的 Agent 对话或自动化流程中。

```text
Read https://ant.design/llms-full.txt and follow the Ant Design conventions when writing UI code.

If you can install skills, run:
npx skills add ant-design/ant-design-cli
```

就这么简单 — 两行代码让你的 Agent 拥有完整的 Ant Design 知识和 CLI 访问能力。

## 它做了什么 {#what-happens}

| 行 | 作用 |
| --- | --- |
| `Read https://ant.design/llms-full.txt ...` | 为 Agent 提供完整的组件文档 — Props、Token、Demo 和最佳实践 — 让它开箱即写出符合 antd 规范的代码。 |
| `npx skills add ant-design/ant-design-cli` | 安装 [@ant-design/cli](https://github.com/ant-design/ant-design-cli) 技能，让 Agent 学会通过 `antd` 命令查询 API、调试问题、代码检查和版本迁移。 |

## 更多能力 {#learn-more}

| 能力                | 指南                             |
| ------------------- | -------------------------------- |
| LLM 结构化文档      | [LLMs.txt](/docs/react/llms-cn)  |
| IDE 集成 MCP Server | [MCP Server](/docs/react/mcp-cn) |
| 完整 CLI 参考       | [CLI](/docs/react/cli-cn)        |
