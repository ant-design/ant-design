---
title: 📢 v5 维护周期截止
date: 2026-11-22
author: li-jia-nan
---

Ant Design v6 发布后，v5 进入为期一年的维护期。按发布时公布的计划，**v5 的常规维护将在 2026 年底前结束**。此后，新功能和日常修复将集中在 v6。除非 v5 版本出现特别严重的问题，我们会视情况发布补丁。

如果你的项目仍在使用 v5，建议尽早安排升级。可以先更新到最新的 v5 版本，根据控制台提示替换已废弃的 API，并确认项目使用 React 18 或更高版本。如果项目直接依赖 `@ant-design/icons`，请在升级到 `antd@6` 时一并升级到 `@ant-design/icons@6`。

v6 默认启用 CSS 变量，组件也提供了更细粒度的样式定制能力。如果项目的自定义样式依赖组件内部的 DOM 结构，升级后请重点检查这些样式。感谢大家在 v5 周期内提供的反馈和贡献！

- [从 v5 到 v6 的迁移指南](/docs/react/migration-v6-cn)
- [Ant Design v6 发布公告](https://github.com/ant-design/ant-design/issues/55804)
- [在 GitHub 上反馈升级问题](https://github.com/ant-design/ant-design/issues)
