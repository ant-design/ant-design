---
category: Components
subtitle: 瀑布流布局
group: 布局
title: Masonry
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*e8nNSayZcBMAAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*e8nNSayZcBMAAAAAAAAAAAAADrJ8AQ/original
demo:
  cols: 1
tag: 5.24.0
---

瀑布流布局组件，用于展示不同高度的内容。

## 何时使用

- 展示不规则高度的图片或卡片时
- 需要按照列数均匀分布内容时
- 需要响应式调整列数时

## 代码演示

<!-- prettier-ignore -->
<code src="./demo/basic.tsx">基础用法</code>
<code src="./demo/sequential.tsx">顺序布局</code>
<code src="./demo/responsive.tsx">响应式</code>

## API

### Masonry

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| columns | 列数，可以是固定值或响应式配置 | `number \| { xs?: number; sm?: number; md?: number }` | - |
| gutter | 间距，可以是固定值、响应式配置或水平垂直间距配置 | `number \| { xs?: number; sm?: number; md?: number } \| [number, number]` | `0` |
| sequential | 是否按照顺序布局（从左到右，从上到下） | `boolean` | `false` |
| children | 子元素 | `React.ReactNode` | - |
