---
category: Components
group: Layout
title: Masonry
cover: https://mdn.alipayobjects.com/huamei_iwk9zp/afts/img/A*cELTRrM5HpAAAAAAOGAAAAgAegCCAQ/original
coverDark: https://mdn.alipayobjects.com/huamei_iwk9zp/afts/img/A*2CxJRYJmfbIAAAAAPqAAAAgAegCCAQ/original
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
<code src="./demo/virtual.tsx">Virtual Scroll</code>
<code src="./demo/virtual-dynamic.tsx">Virtual Scroll with Dynamic Loading</code>
<code src="./demo/style-class.tsx">Custom semantic dom styling</code>
<code src="./demo/fresh.tsx" debug>Fresh</code>

## API

Common props ref：[Common props](/docs/react/common-props)

## Masonry

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| classNames | Customize class for each semantic structure inside the component. Supports object or function. | Record<[SemanticDOM](#semantic-dom), string> \| (info: { props })=> Record<[SemanticDOM](#semantic-dom), string> | - |  |
| columns | Number of columns, can be a fixed value or a responsive configuration | `number \| { xs?: number; sm?: number; md?: number }` | `3` |  |
| fresh | Whether to continuously monitor the size changes of child items | `boolean` | `false` |  |
| gutter | Spacing, can be a fixed value, responsive configuration, or a configuration for horizontal and vertical spacing | [Gap](#gap) \| \[[Gap](#gap), [Gap](#gap)\] | `0` |  |
| items | Masonry items | [MasonryItem](#masonryitem)[] | - |  |
| itemRender | Custom item rendering function | `(item: MasonryItem) => React.ReactNode` | - |  |
| styles | Customize inline style for each semantic structure inside the component. Supports object or function. | Record<[SemanticDOM](#semantic-dom), CSSProperties> \| (info: { props })=> Record<[SemanticDOM](#semantic-dom), CSSProperties> | - |  |
| virtual | Enable virtual scrolling for large datasets | [VirtualConfig](#virtualconfig) | - |  |
| onLayoutChange | Callback for column sorting changes | `({ key: React.Key; column: number }[]) => void` | - |  |
| onScrollEnd | Callback when scroll reaches near the end (for infinite loading, requires virtual) | `() => void` | - |  |

### MasonryItem

| Parameter | Description | Type | Default Value |
| --- | --- | --- | --- |
| children | Custom display content, takes precedence over `itemRender` | `React.ReactNode` | - |
| column | Specifies the column to which the item belongs | `number` | - |
| data | Custom data storage | `T` | - |
| height | Height of the item | `number` | - |
| key | Unique identifier for the item | `string` \| `number` | - |

### Gap

`Gap` represents the spacing between items. It can either be a fixed value or a responsive configuration.

```ts
type Gap = undefined | number | Partial<Record<'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl', number>>;
```

### VirtualConfig

Configuration for virtual scrolling. When enabled, only visible items are rendered for better performance with large datasets.

| Parameter | Description | Type | Default |
| --- | --- | --- | --- |
| height | Container height in pixels (required) | `number` | - |
| itemHeight | Estimated item height for position calculation (required) | `number` | - |
| buffer | Number of items to render outside visible area | `number` | `columnCount * 2` |

## Semantic DOM

<code src="./demo/_semantic.tsx" simplify="true"></code>

## Design Token

<ComponentTokenTable component="Masonry"></ComponentTokenTable>
