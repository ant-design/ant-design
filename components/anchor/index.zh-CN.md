---
category: Components
subtitle: 锚点
cols: 1
type: Other
title: Anchor
---

用于跳转到页面指定位置。

## 何时使用

需要展现当前页面上可供跳转的锚点链接，以及快速在锚点之间跳转。

## API

### Anchor Props

| 成员        | 说明           | 类型               | 默认值       |
|-------------|----------------|--------------------|--------------|
| offsetTop    | 距离窗口顶部达到指定偏移量后触发   | Number |         |
| offsetBottom | 距离窗口底部达到指定偏移量后触发   | Number |         |
| bounds | 锚点区域边界 | Number | 5(px) |

### Link Props

| 成员        | 说明           | 类型               | 默认值       |
|-------------|----------------|--------------------|--------------|
| href    | 锚点链接   | String |         |
| title | 文字内容   | React.Node |         |
