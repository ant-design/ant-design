---
category: Components
subtitle: 锚点
cols: 2
type: Other
title: Anchor
---

用于跳转到页面指定位置。

## 何时使用

需要展现当前页面上可供跳转的锚点链接，以及快速在锚点之间跳转。

## API

### Anchor Props

| 成员 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| affix | 固定模式 | boolean | true |
| bounds | 锚点区域边界 | number | 5(px) |
| getContainer | 指定滚动的容器 | () => HTMLElement | () => window |
| offsetBottom | 距离窗口底部达到指定偏移量后触发 | number |  |
| offsetTop | 距离窗口顶部达到指定偏移量后触发 | number |  |
| showInkInFixed | 固定模式是否显示小圆点 | boolean | false |

### Link Props

| 成员 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| href | 锚点链接 | string |  |
| title | 文字内容 | string\|ReactNode |  |
