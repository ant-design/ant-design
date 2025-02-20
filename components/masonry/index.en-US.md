---
category: Components
group: Layout
title: Masonry
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*e8nNSayZcBMAAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*e8nNSayZcBMAAAAAAAAAAAAADrJ8AQ/original
demo:
  cols: 1
tag: 6.0.0
---

A masonry layout component for displaying content with different heights.

## When To Use

- When displaying images or cards with irregular heights
- When content needs to be evenly distributed in columns
- When column count needs to be responsive

## Examples

<!-- prettier-ignore -->
<code src="./demo/basic.tsx">Basic</code>
<code src="./demo/responsive.tsx">Responsive</code>
<code src="./demo/image.tsx">Image</code>
<code src="./demo/dynamic.tsx">Dynamic</code>

## API

Common props ref：[Common props](/docs/react/common-props)

### Masonry

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| columns | Number of columns, can be a fixed number or responsive config | `number \| { xs?: number; sm?: number; md?: number }` | - |
| gutter | Gap between items, can be a fixed number, responsive config, or \[horizontal, vertical\] config | `Gap` \| `[Gap, Gap]` | `0` |
| items | Masonry items | `<T = MasonryItem>[]` | - |
| onSortChange | Callback when column order changes | `({ key: React.Key; column: number }[]) => void` | - |

### MasonryItem

| Property | Description       | Type                 | Default |
| -------- | ----------------- | -------------------- | ------- |
| children | Custom content    | `React.ReactNode`    | -       |
| column   | Custom column     | `number`             | -       |
| height   | Height            | `number`             | -       |
| key      | Unique identifier | `string` \| `number` | -       |

### Gap

Gap is the spacing between items, can be a fixed number, or responsive config.

```ts
type Gap = number | undefined | Partial<Record<'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl', number>>;
```
