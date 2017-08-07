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

### Card

| 参数     | 说明           | 类型     | 默认值       |
|----------|----------------|----------|--------------|
| title    | 卡片标题 | string\|ReactNode   |  -  |
| extra    | 卡片右上角的操作区域 | string\|ReactNode   | - |
| bordered | 是否有边框 | boolean   |  true  |
| bodyStyle | 内容区域自定义样式 | object   |  -  |
| noHovering | 取消鼠标移过浮起 | boolean | false |
| loading | 当卡片内容还在加载中时，可以用 loading 展示一个占位 | boolean   |  false  |
| type | 卡片类型，可设置为 `inner` 或 不设置 | string   |  -  |
| cover | 卡片封面 | ReactNode   |  -  |
| actions | 卡片操作组，位置在卡片底部 | Array<ReactNode>   |  -  |
| avatar | 头像/图标，仅[内建模式](/components/card/#components-card-demo-built-in)下生效 | ReactNode |  -  |
| description | 描述内容，仅[内建模式](/components/card/#components-card-demo-built-in)下生效 | ReactNode   |  -  |
| extraContent | 补充内容，仅[内建模式](/components/card/#components-card-demo-built-in)下生效 | ReactNode   |  -  |

> 注意：当卡片不包含任何子元素时，自动变为内建模式。

### Card.Grid

Property | Description | Type | Default
---------|-------------|------|---------
className | 网格容器类名 | string | -
style | 定义网格容器类名的样式 | object | -
