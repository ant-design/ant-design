---
category: Components
group: Layout
title: Splitter
description: Split panels are used to isolate areas and display multiple contents.
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*mQmMTYq6OjYAAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*7v4GTo2Ely8AAAAAAAAAAAAADrJ8AQ/original
demo:
  cols: 2
tag: 5.21.0
---

## When To Use

You need to display multiple contents, and you want users to be able to adjust the size of each content freely.

- The Splitter component needs to calculate the panel size through its child elements, so its child elements only support `Splitter.Panel`。

## Examples

<!-- prettier-ignore -->
<code src="./demo/size.tsx">Basic</code>
<code src="./demo/control.tsx">Control mode</code>
<code src="./demo/vertical.tsx">Vertical</code>
<code src="./demo/collapsible.tsx">Collapsible</code>
<code src="./demo/multiple.tsx">Multiple panels</code>
<code src="./demo/group.tsx">Complex combination</code>

## API

Common props ref：[Common props](/docs/react/common-props)

### Splitter

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| layout | Layout direction | `horizontal` \| `vertical` | `horizontal` | - |
| style | The additional style | `css-properties` | - | - |
| transition | Whether animation is enabled when folding | `boolean` | `true` | - |
| onResizeStart | Callback before dragging starts | `(sizes: number[], index:number) => void` | - | - |
| onResize | Panel size change callback | `(sizes: number[], index:number) => void` | - | - |
| onResizeEnd | Drag end callback | `(sizes: number[], index:number) => void` | - | - |

### Panel

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| min | Minimum threshold support number for px or 'percent%' usage | `number \| string` | - | - |
| max | Maximum threshold support number for px or 'percent%' usage | `number \| string` | - | - |
| size | Controlled panel size support number for px or 'percent%' usage | `number \| string` | - | - |
| collapsible | Quick folding | `boolean \| { start?: boolean; end?: boolean }` | `false` | - |
| resizable | Whether to enable drag and drop | `boolean` | `true` | - |

## Design Token

<ComponentTokenTable component='Splitter'></ComponentTokenTable>
