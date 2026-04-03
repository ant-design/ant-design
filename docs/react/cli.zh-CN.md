---
group:
  title: AI
  order: 0.9
order: 3
title: CLI
tag: New
---

本指南介绍如何使用 `@ant-design/cli` 从命令行查询 Ant Design 组件知识、分析项目用量和指导版本迁移。

## 什么是 Ant Design CLI？ {#what-is-ant-design-cli}

[`@ant-design/cli`](https://github.com/ant-design/ant-design-cli) 是官方命令行工具，将 Ant Design 知识带到你的终端。所有元数据随包安装 — antd v4 / v5 / v6 的每个 Prop、Token、Demo 和 Changelog 条目 — 毫秒级查询，完全离线。

## 亮点 {#highlights}

- **完全离线** — 所有元数据随包安装，无需网络请求，无延迟，无 API Key。
- **版本精确** — 跨 v4/v5/v6 的 55+ 小版本快照，查询任意版本的精确 API。
- **Agent 优化** — 所有命令支持 `--format json`，结构化错误码与修复建议。
- **双语输出** — 每个组件名、描述和文档均有中英文，通过 `--lang zh` 切换。
- **智能纠错** — 输入 `Buttn`？CLI 基于 Levenshtein 距离建议 `Button`。

## 安装 {#install}

```bash
npm install -g @ant-design/cli
```

## 快速开始 {#quick-start}

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

## 命令 {#commands}

### 知识查询 {#knowledge-query}

| 命令                                   | 说明                                           |
| -------------------------------------- | ---------------------------------------------- |
| `antd list`                            | 列出所有组件，含双语名称、分类和引入版本       |
| `antd info <Component>`                | Props 表格，含类型、默认值、引入版本和废弃状态 |
| `antd doc <Component>`                 | 组件完整 Markdown 文档                         |
| `antd demo <Component> [name]`         | 可运行的 Demo 源码（TSX）                      |
| `antd token [Component]`               | 全局或组件级 Design Token                      |
| `antd semantic <Component>`            | 语义化 `classNames` / `styles` 结构及用法示例  |
| `antd changelog [v1] [v2] [component]` | Changelog 条目、版本范围或跨版本 API 对比      |

### 项目分析 {#project-analysis}

| 命令                       | 说明                                                              |
| -------------------------- | ----------------------------------------------------------------- |
| `antd doctor`              | 10 项诊断检查：React 兼容性、重复安装、peer 依赖、SSR、babel 插件 |
| `antd usage [dir]`         | 导入统计、子组件分布（`Form.Item`）、非组件导出                   |
| `antd lint [target]`       | 废弃 API、无障碍缺陷、性能问题、最佳实践                          |
| `antd migrate <from> <to>` | 迁移清单，区分自动修复/手动处理，`--apply` 生成 Agent 提示        |

### 全局参数 {#global-flags}

| 参数                            | 说明                          | 默认值   |
| ------------------------------- | ----------------------------- | -------- |
| `--format json\|text\|markdown` | 输出格式                      | `text`   |
| `--version <v>`                 | 目标 antd 版本（如 `5.20.0`） | 自动检测 |
| `--lang en\|zh`                 | 输出语言                      | `en`     |
| `--detail`                      | 包含扩展信息                  | `false`  |

### MCP Server {#mcp-server}

| 命令       | 说明                                                       |
| ---------- | ---------------------------------------------------------- |
| `antd mcp` | 启动 MCP 服务器，提供 7 个工具和 2 个提示词，支持 IDE 集成 |

`antd mcp` 命令启动 [Model Context Protocol](https://modelcontextprotocol.io/) 服务器，让 AI 助手可以直接访问 Ant Design 知识。详细配置参见 [MCP Server](/docs/react/mcp-zh-CN) 指南。

## 在 AI 工具中的使用 {#usage-with-ai-tools}

CLI 内置 [Skill 文件](https://github.com/ant-design/ant-design-cli/blob/main/skills/antd/SKILL.md)，指导 Code Agent 在正确的时机调用正确的命令：

```bash
npx skills add ant-design/ant-design-cli
```

| 工具 | 说明 |
| --- | --- |
| **Claude Code** | 安装为 Agent Skill 或直接在终端使用 `antd` 命令。[文档](https://docs.anthropic.com/en/docs/claude-code) |
| **Cursor** | 安装 Skill 后，Agent 会自动调用 CLI 命令。[文档](https://docs.cursor.com/zh/context/@-symbols/@-docs) |
| **Codex** | 安装 Skill 以启用 Agent 访问。[文档](https://github.com/openai/codex) |
| **Gemini CLI** | 安装 Skill 以启用自动命令调用。[文档](https://github.com/google-gemini/gemini-cli) |

支持所有兼容 [skills](https://github.com/nicepkg/agent-skills) 协议的 Agent。

## 了解更多 {#learn-more}

- [@ant-design/cli GitHub 仓库](https://github.com/ant-design/ant-design-cli)
- [@ant-design/cli npm 地址](https://www.npmjs.com/package/@ant-design/cli)
- [Ant Design LLMs.txt 指南](/docs/react/llms-zh-CN)
- [Ant Design MCP Server](/docs/react/mcp-zh-CN)
