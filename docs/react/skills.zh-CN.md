---
group:
  title: AI
  order: 0.9
order: 2
title: SKILL.md
tag: New
---

<SkillsDocActions> </SkillsDocActions>

本指南介绍 Ant Design 的技能包及其使用方式。

## 什么是 SKILL.md？ {#what-is-skill-md}

`SKILL.md` 是技能的入口文件，包含名称、描述与使用指引。一个技能包通常包含：

- `SKILL.md`
- `references/`（可选，用于拆分复杂内容）
- `scripts/` 或其他资源（可选）

## 在 Cursor 中使用 {#use-in-cursor}

Cursor 会自动从技能目录加载技能（详见 [Cursor Skills 文档](https://cursor.com/cn/docs/context/skills)）。

### 安装方式（项目级）

1. 在项目中创建目录：`.cursor/skills/ant-design/`
2. 放入 `SKILL.md` 与 `references/` 等文件
3. 重新打开项目或触发一次索引刷新

### 安装方式（用户级）

将技能放入 `~/.cursor/skills/ant-design/`，可在多个项目复用。

### 触发方式

- 自动触发：描述 antd v6、ConfigProvider、token、SSR、Form、Table 等场景时，模型会选择该 skill。

### 使用示例

- “Next.js SSR 下 antd 样式顺序有问题，ConfigProvider 和 StyleProvider 怎么配？”
- “表单跨字段联动要怎么做？”

## 使用建议 {#usage-tips}

- `SKILL.md` 保持简洁，复杂内容拆到 `references/`。
- 当问题命中复杂条件时，优先引用对应 reference。
