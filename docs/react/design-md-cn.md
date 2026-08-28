---
group:
  title: AI
  order: 0.9
order: 1
title: design.md
tag: New
---

本指南介绍如何使用 Ant Design 的 `design.md`，让 AI 设计工具理解 Ant Design 的视觉语言。

## 什么是 design.md？ {#what-is-design-md}

[`design.md`](https://ant.design/design.md) 是面向 AI 设计工具的设计语言描述文件，遵循 [google-labs-code/design.md](https://github.com/google-labs-code/design.md) 规范。

它描述 Ant Design 默认 Light 主题的视觉语言、组件范式和主题 Token，帮助 Figma Make、Stitch 等 AI 设计工具生成更符合 Ant Design 设计体系的界面。

## 在线读取 {#read-online}

AI 工具可以直接读取：

```text
https://ant.design/design.md
```

你可以在 AI 设计工具中使用这段提示词：

```text
阅读 https://ant.design/design.md，并按 Ant Design 的视觉语言生成界面。
```

## 通过 CLI 获取 {#cli}

如果工具无法直接读取 URL，也可以通过 [`@ant-design/cli`](/docs/react/cli-cn) 获取同一份内容：

```bash
antd design.md
```

常用选项：

```bash
antd design.md --format json  # JSON 格式输出
antd design.md --lang zh      # 中文描述
```

## 文件包含什么 {#content}

`design.md` 包含：

- Ant Design 默认 Light 主题的颜色、字号、圆角、间距、阴影等视觉规则。
- 常见组件的视觉范式和使用建议。
- 与 `ConfigProvider.theme`、算法组合、组件级 Token、`cssVar`、`zeroRuntime` 等主题能力相关的说明。
- AI 设计工具在生成 Ant Design 界面时需要避免的误用方式。

## 适用场景 {#use-cases}

- 在 AI 设计工具中生成更符合 Ant Design 视觉体系的界面草图。
- 让设计 Agent 理解 Ant Design 的默认主题和组件使用方式。
- 将 Ant Design 的设计语言作为项目 UI 生成的约束条件。

## 相关文档 {#related}

- [For Agents](/docs/react/for-agents-cn)
- [LLMs.txt](/docs/react/llms-cn)
- [Ant Design CLI](/docs/react/cli-cn)
