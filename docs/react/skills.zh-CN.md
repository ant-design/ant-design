---
group:
  title: AI
  order: 0.9
order: 2
title: SKILL.md
tag: New
---

<SkillsDocActions> </SkillsDocActions>

本文说明 Ant Design 技能包的定位、结构与用法。

## 什么是 SKILL.md？ {#what-is-skill-md}

`SKILL.md` 是技能入口文件，用于描述使用边界、触发条件与输出要求。一个技能包通常包含以下内容：

- `SKILL.md`
- `references/`（可选，用于拆分复杂内容）
- `scripts/` 或其他资源（可选）

## 可用资源 {#available-resources}

本仓库提供的技能内容位置：

- `antd-skill/skills/ant-design/SKILL.md`
- `antd-skill/skills/ant-design/references/`

## 在 Cursor 中使用 {#use-in-cursor}

Cursor 会从技能目录加载技能（详见 [Cursor Skills 文档](https://cursor.com/cn/docs/context/skills)）。

### 安装方式（项目级）

1. 在项目中创建目录：`.cursor/skills/ant-design/`
2. 将 `SKILL.md` 与 `references/` 放入该目录
3. 重新打开项目或触发索引刷新

### 安装方式（用户级）

将技能放入 `~/.cursor/skills/ant-design/`，可在多个项目复用。

### 触发方式

- 自动触发：描述 antd v6、ConfigProvider、token、SSR、Form、Table 等场景时，模型会选择该 skill。

## 在 Claude Code 中使用 {#use-in-claude-code}

Claude Code 支持技能目录与 `SKILL.md` 机制（详见 [Claude Code Skills 文档](https://code.claude.com/docs/en/skills#extend-claude-with-skills)）。

### 安装方式（项目级）

1. 在项目中创建目录：`.claude/skills/ant-design/`
2. 将 `SKILL.md` 与 `references/` 放入该目录
3. 重新打开项目或触发索引刷新

### 安装方式（用户级）

将技能放入 `~/.claude/skills/ant-design/`，可在多个项目复用。

### 触发方式

- 自动触发：当需求与 skill 描述匹配时自动启用。
- 手动触发：使用 `/ant-design` 显式调用。

## 在 Trae 中使用 {#use-in-trae}

Trae 提供技能机制与目录约定（详见 [Trae Skills 文档](https://docs.trae.ai/ide/skills?_lang=zh)）。

### 安装方式

将技能目录放入 Trae 约定的 skills 路径，并确保包含 `SKILL.md` 与 `references/`。

### 触发方式

- 自动触发：当需求与 skill 描述匹配时启用。
- 手动触发：使用 Trae 的技能调用入口执行。

## 在 Qoder 中使用 {#use-in-qoder}

Qoder CLI 支持以 `SKILL.md` 形式加载技能（详见 [Qoder Skills 文档](https://docs.qoder.com/cli/Skills#skills)）。

### 安装方式（项目级）

1. 在项目中创建目录：`.qoder/skills/ant-design/`
2. 将 `SKILL.md` 与 `references/` 放入该目录
3. 重启 Qoder CLI 或刷新会话

### 安装方式（用户级）

将技能放入 `~/.qoder/skills/ant-design/`，可在多个项目复用。

### 触发方式

- 自动触发：当需求与 skill 描述匹配时启用。
- 手动触发：使用 `/ant-design` 调用。

## 使用方式 {#usage}

### 主 Skill

- 适合组件选型、Provider/主题决策、SSR 与常见风险提示。
- 复杂场景只给结论与入口，细节下沉至 reference。

### Reference

- 用于复杂交互、异步或大数据量场景。
- 需要实现细节时再打开对应文件。

### 使用示例

- “Next.js SSR 下 antd 样式顺序有问题，ConfigProvider 和 StyleProvider 怎么配？”
- “表单跨字段联动要怎么做？”

## 使用建议 {#usage-tips}

- `SKILL.md` 保持简洁，复杂内容拆到 `references/`。
- 当问题命中复杂条件时，优先引用对应 reference。
