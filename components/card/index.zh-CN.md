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
| noHovering | 鼠标移过时不浮起，设为 `false` 可浮起 | boolean | true |
| loading | 当卡片内容还在加载中时，可以用 loading 展示一个占位 | boolean   |  false  |
| type | 卡片类型，可设置为 `inner` 或 不设置 | string   |  -  |
| cover | 卡片封面 | ReactNode   |  -  |
| actions | 卡片操作组，位置在卡片底部 | Array<ReactNode>   |  -  |
| tabList | 页签标题列表 | Array<{key: string, tab: ReactNode}>   |  -  |
| onTabChange | 页签切换的回调 | (key) => void   |  -  |

### Card.Grid

Property | Description | Type | Default
---------|-------------|------|---------
className | 网格容器类名 | string | -
style | 定义网格容器类名的样式 | object | -

### Card.Meta

Property | Description | Type | Default
---------|-------------|------|---------
className | 容器类名 | string | -
style | 定义容器类名的样式 | object | -
avatar | 头像/图标 | ReactNode | -
title | 标题内容 | ReactNode | -
description | 描述内容 | ReactNode | -
