---
group:
  title: 进阶使用
order: 7
title: LLMs.txt
tag: New
---

本指南介绍如何让 Cursor、Windsurf、GitHub Copilot、ChatGPT 和 Claude 等 AI 工具更好地理解 Ant Design。

## 什么是 LLMs.txt？

我们支持通过 [LLMs.txt](https://llmstxt.org/) 文件向大语言模型（LLMs）提供 Ant Design 文档。此功能可帮助 AI 工具更好地理解我们的组件库、API 及使用模式。

## 可用资源

我们提供多个 LLMs.txt 路由来帮助 AI 工具访问文档：

- [llms.txt](https://ant.design/llms.txt) - 包含所有组件及其文档链接的结构化概览
- [llms-full.txt](https://ant.design/llms-full.txt) - 提供包含实现细节和示例的完整文档

## 在 AI 工具中的使用

### Cursor

在 Cursor 中使用 `@Docs` 功能将 LLMs.txt 文件包含到您的项目中。这有助于 Cursor 为 Ant Design 组件提供更准确的代码建议和文档。

[详细了解 Cursor 中的 @Docs 功能](https://docs.cursor.com/zh/context/@-symbols/@-docs)

### Windsurf

通过 `@` 引用或在 `.windsurfrules` 文件中配置 LLMs.txt 文件，以增强 Windsurf 对 Ant Design 组件的理解。

[详细了解 Windsurf Memories 功能](https://docs.codeium.com/windsurf/memories#memories-and-rules)

### 其他 AI 工具

任何支持 LLMs.txt 的 AI 工具均可使用以上路径来更好地理解 Ant Design。
