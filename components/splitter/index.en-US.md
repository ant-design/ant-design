---
category: Components
group: Layout
title: Splitter
description: Split panels to isolate
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*f0SISaETY0wAAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*y92yRYhObU8AAAAAAAAAAAAADrJ8AQ/original
demo:
  cols: 1
tag: 5.21.0
---

## When To Use

Can be used to separate areas horizontally or vertically. When you need to freely drag and adjust the size of each area. When you need to specify the maximum and minimum width and height of an area.

## Examples

<!-- prettier-ignore -->
<code src="./demo/size.tsx">Basic</code>
<code src="./demo/control.tsx">Control mode</code>
<code src="./demo/vertical.tsx">Vertical</code>
<code src="./demo/collapsible.tsx">Collapsible</code>
<code src="./demo/multiple.tsx">Multiple panels</code>
<code src="./demo/group.tsx">Complex combination</code>
<code src="./demo/nested-in-tabs.tsx" debug>Nested in tabs</code>
<code src="./demo/lazy.tsx" version="5.23.0">Lazy</code>
<code src="./demo/debug.tsx" debug>Debug</code>

## API

Common props ref：[Common props](/docs/react/common-props)

> The Splitter component needs to calculate the panel size through its child elements, so its child elements only support `Splitter.Panel`.

### Splitter

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| layout | Layout direction | `horizontal` \| `vertical` | `horizontal` | - |
| onResizeStart | Callback before dragging starts | `(sizes: number[]) => void` | - | - |
| onResize | Panel size change callback | `(sizes: number[]) => void` | - | - |
| onResizeEnd | Drag end callback | `(sizes: number[]) => void` | - | - |
| lazy | Lazy mode | `boolean` | `false` | 5.23.0 |

### Panel

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| defaultSize | Initial panel size support number for px or 'percent%' usage | `number \| string` | - | - |
| min | Minimum threshold support number for px or 'percent%' usage | `number \| string` | - | - |
| max | Maximum threshold support number for px or 'percent%' usage | `number \| string` | - | - |
| size | Controlled panel size support number for px or 'percent%' usage | `number \| string` | - | - |
| collapsible | Quick folding | `boolean \| { start?: boolean; end?: boolean }` | `false` | - |
| resizable | Whether to enable drag and drop | `boolean` | `true` | - |

## Design Token

<ComponentTokenTable component='Splitter'></ComponentTokenTable>
