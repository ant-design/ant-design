---
category: Components
type: 数据展示
title: Comment
subtitle: 评论
cols: 1
---

对网站内容的反馈、评价和讨论。

## 何时使用

评论组件可用于对事物的讨论，例如页面、博客文章、问题等等。

## API

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| actions | 在评论内容下面呈现的操作项列表 | Array<ReactNode> | - | 3.11.0 |
| author | 要显示为注释作者的元素 | string\|ReactNode | - | 3.11.0 |
| avatar | 要显示为评论头像的元素 - 通常是 antd `Avatar` 或者 src | string\|ReactNode | - | 3.11.0 |
| children | 嵌套注释应作为注释的子项提供 | ReactNode | - | 3.11.0 |
| content | 评论的主要内容 | string\|ReactNode | - | 3.11.0 |
| datetime | 展示时间描述 | string\|ReactNode | - | 3.11.0 |
