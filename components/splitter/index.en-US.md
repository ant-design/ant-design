---
category: Components
group: Layout
title: Splitter
description: Split panels are used to isolate areas and display multiple contents.
demo:
  cols: 2
tag: 5.21.0
---

## When To Use

You need to display multiple contents, and you want users to be able to adjust the size of each content freely.

- The Splitter component needs to calculate the panel size through its child elements, so its child elements only support `Splitter.Panel`。

## Examples

<!-- prettier-ignore -->
<code src="./demo/basic.tsx">Basic</code>
<code src="./demo/size.tsx">Panel size control</code>
<code src="./demo/collapsible.tsx">Quick Folding</code>
<code src="./demo/layout.tsx">Layout Switching</code>
<code src="./demo/multiple.tsx">Multiple panels</code>
<code src="./demo/group.tsx">Complex combination</code>
<code src="./demo/debug.tsx" debug>test</code>

## API

Common props ref：[Common props](/docs/react/common-props)

### Splitter

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| layout | Layout direction | `horizontal` \| `vertical` | `horizontal` | - |
| style | The additional style | `css-properties` | - | - |
| onResizeStart | Callback before dragging starts | `(sizes: number[], index:number) => void` | - | - |
| onResize | Panel size change callback | `(sizes: number[], index:number) => void` | - | - |
| onResizeEnd | Drag end callback | `(sizes: number[], index:number) => void` | - | - |

### Panel

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| min | Minimum threshold `1-100 \| '10%' \| '200px'` | `number \| string` | - | - |
| max | Maximum Threshold `1-100 \| '10%' \| '200px'` | `number \| string` | - | - |
| size | Controlled panel size `1-100 \| '10%' \| '200px'` | `number \| string` | - | - |
| defaultSize | Initial panel size `1-100 \| '10%' \| '200px'` | `number \| string` | 50 | - |
| collapsible | Quick folding | `boolean \| { start?: boolean; end?: boolean }` | `false` | - |
| resizable | Whether to enable drag and drop | `boolean` | `true` | - |

## Design Token

<ComponentTokenTable component='Splitter'></ComponentTokenTable>
