---
category: Components
group: Layout
title: Flex
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*SMzgSJZE_AwAAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*8yArQ43EGccAAAAAAAAAAAAADrJ8AQ/original
tag: New
---

Flex. Available since `5.9.0`.

## When To Use

- Good for setting spacing between elements.
- Suitable for setting various horizontal and vertical alignments.

## Examples

<!-- prettier-ignore -->
<code src="./demo/basic.tsx">Basic</code>
<code src="./demo/align.tsx">align</code>
<code src="./demo/gap.tsx">gap</code>
<code src="./demo/wrap.tsx">Wrap</code>
<code src="./demo/combination.tsx">combination</code>

## API

> This component is available since `antd@5.9.0`.

Common props ref：[Common props](/docs/react/common-props)

| Property | Description | type | Default | Version |
| --- | --- | --- | --- | --- |
| style | custom style | React.CSSProperties | - |  |
| className | custom className | string | - |  |
| direction | Defines the direction of the flex main axis | reference [flex-direction](https://developer.mozilla.org/en-US/docs/Web/CSS/flex-direction) | row |  |
| wrap | Set whether the element is displayed in a single line or in multiple lines | reference [flex-wrap](https://developer.mozilla.org/en-US/docs/Web/CSS/flex-wrap) | nowrap |  |
| justify | Sets the alignment of elements in the direction of the main axis | reference [justify-content](https://developer.mozilla.org/en-US/docs/Web/CSS/justify-content) | normal |  |
| align | Sets the alignment of elements in the direction of the cross axis | reference [align-items](https://developer.mozilla.org/en-US/docs/Web/CSS/align-items) | normal |  |
| flex | flex CSS shorthand properties | reference [flex](https://developer.mozilla.org/en-US/docs/Web/CSS/flex) | normal |  |
| gap | Sets the gap between grids | `small` \| `middle` \| `large` \| `string` \| `number` | - |  |
| component | custom element type | React.ComponentType | `div` |  |

## Design Token

<ComponentTokenTable component="Flex"></ComponentTokenTable>
