---
category: Components
group: Layout
title: Masonry
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*e8nNSayZcBMAAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*e8nNSayZcBMAAAAAAAAAAAAADrJ8AQ/original
demo:
  cols: 1
tag: 5.24.0
---

A masonry layout component for displaying content with different heights.

## When To Use

- When displaying images or cards with irregular heights
- When content needs to be evenly distributed in columns
- When column count needs to be responsive

## Examples

<!-- prettier-ignore -->
<code src="./demo/basic.tsx">Basic</code>
<code src="./demo/sequential.tsx">Sequential</code>
<code src="./demo/responsive.tsx">Responsive</code>

## API

### Masonry

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| columns | Number of columns, can be a fixed number or responsive config | `number \| { xs?: number; sm?: number; md?: number }` | - |
| gutter | Gap between items, can be a fixed number, responsive config, or [horizontal, vertical] config | `number \| { xs?: number; sm?: number; md?: number } \| [number, number]` | `0` |
| sequential | When true, items are placed sequentially (left-to-right, top-to-bottom) | `boolean` | `false` |
| children | Child elements | `React.ReactNode` | - |
