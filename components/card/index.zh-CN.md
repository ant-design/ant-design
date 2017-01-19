---
category: Components
type: Data Display
title: Card
subtitle: 卡片
cols: 1
---

通用卡片容器。

## 何时使用

最基础的卡片容器，可承载文字、列表、图片、段落，常用于后台概览页面。

## API

```html
<Card title="卡片标题">卡片内容</Card>
```

| 参数     | 说明           | 类型     | 默认值       |
|----------|----------------|----------|--------------|
| title    | 卡片标题 | string\|ReactNode   |  -  |
| extra    | 卡片右上角的操作区域 | string\|ReactNode   | - |
| bordered | 是否有边框 | boolean   |  true  |
| bodyStyle | 内容区域自定义样式 | object   |  -  |
