---
group:
  title: AI
  order: 0.9
order: 1
title: LLMs.txt
tag: New
---

本指南介绍如何让 Cursor、Windsurf 和 Claude 等 AI 工具更好地理解 Ant Design。

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

通过 `@` 引用或在 `.windsurf/rules` 文件中配置 LLMs.txt 文件，以增强 Windsurf 对 Ant Design 组件的理解。

[详细了解 Windsurf Memories 功能](https://docs.windsurf.com/windsurf/cascade/memories)

### Claude Code

在 Claude Code 中，将 `LLMs.txt` 添加到工作区的知识库（Docs / Context Files）配置中，即可在代码补全与解释时引用其中的内容，从而提升对 Ant Design 组件的理解。

[详细了解 Claude Code 文档上下文配置](https://code.claude.com/docs)

### Gemini CLI

在 Gemini CLI 中，可以通过 `--context` 参数或在 `.gemini/config.json` 中指定 `LLMs.txt` 文件路径，让 Gemini 在回答和生成代码时参考该文档。

[详细了解 Gemini CLI 上下文配置](https://ai.google.dev/gemini-api/docs?hl=zh-cn)

### Trae

在 Trae 中，将 `LLMs.txt` 文件放入项目的 knowledge sources 并在设置里开启引用，即可让 Trae 在生成或分析代码时更好地支持 Ant Design 组件。

[详细了解 Trae 的知识源功能](https://trae.ai/docs)

### Qoder

在 Qoder 中，可以在 `.qoder/config.yml` 中添加 `LLMs.txt` 作为外部知识文件，或在对话中通过 `@docs LLMs.txt` 进行临时引用，增强对 Ant Design 组件的支持。

[详细了解 Qoder 配置方法](https://docs.qoder.com/)

### 其他 AI 工具

任何支持 LLMs.txt 的 AI 工具均可使用以上路径来更好地理解 Ant Design。
