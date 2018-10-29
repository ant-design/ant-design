---
category: Components
type: Data Display
title: Comment
subtitle: 评论
cols: 1
---

单一评论组件。

## 何时使用

评论组件可用于对事物的讨论，例如页面、博客文章、问题等等。

## API

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| actions | 在评论内容下面呈现的操作项列表 | Array<ReactNode> | - |
| author | 要显示为注释作者的元素 | ReactNode | - |
| avatar | 要显示为评论头像的元素 - 通常是antd `Avatar` | ReactNode | - |
| children | 嵌套注释应作为注释的子项提供 | ReactNode | - |
| className | 网格容器类名 | string | - |
| content | 评论的主要内容 | ReactNode | - |
| id | 评论的可选ID | string | - |
| style | 评论的其他风格 | object | - |
| datetime | 包含要显示的时间的时间元素 | ReactNode | - |
