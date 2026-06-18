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
在编写任何代码之前，请先阅读 https://ant.design/docs/react/for-agents-cn.md 中的相关指南，留意弃用提示，并按照说明使用 Ant Design。

如果你可以安装 skills，请运行：
npx skills add ant-design/ant-design-cli
```

## Agent 获得什么 {#what-the-agent-gets}

### CLI — 离线知识和项目工具 {#cli}

[`@ant-design/cli`](https://github.com/ant-design/ant-design-cli) 将所有元数据随包安装 — antd v3 / v4 / v5 / v6 的每个 Prop、Token、Demo 和 Changelog 条目 — 毫秒级查询，完全离线。

```bash
npm install -g @ant-design/cli
```

```bash
antd info Button                    # 组件 Props、类型、默认值
antd demo Select basic              # 可运行的 Demo 源码
antd token DatePicker               # Design Token 值（v5+）
antd semantic Table                 # classNames / styles 结构
antd changelog 4.24.0 5.0.0 Select  # 跨版本 API 差异对比
antd doctor                         # 诊断项目配置问题
antd lint ./src                     # 检查废弃 API 和最佳实践
antd migrate 4 5 --apply ./src      # 生成 Agent 迁移提示
```

完整参考：[CLI](/docs/react/cli-cn)

### MCP Server — IDE 集成 {#mcp}

CLI 同时支持作为 MCP 服务器运行，提供 8 个工具和 2 个提示词，支持 IDE 集成（Claude Code、Cursor、VS Code 等）。

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

完整参考：[MCP Server](/docs/react/mcp-cn)

### LLMs.txt — LLM 结构化文档 {#llms-txt}

将完整的组件文档直接注入 AI 上下文：

| 文件                                                    | 说明                               |
| ------------------------------------------------------- | ---------------------------------- |
| [llms.txt](https://ant.design/llms.txt)                 | 导航文件，包含所有文档和组件的链接 |
| [llms-full.txt](https://ant.design/llms-full.txt)       | 完整的组件文档（英文）             |
| [llms-full-cn.txt](https://ant.design/llms-full-cn.txt) | 完整的组件文档（中文）             |

也可以获取单个组件文档：`https://ant.design/components/<name>.md`。

完整参考：[LLMs.txt](/docs/react/llms-cn)
