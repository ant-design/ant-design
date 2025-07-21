---
category: Components
group: Data Display
title: Timeline
description: Vertical display timeline.
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*FkTySqNt3sYAAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*yIl9S4hAIBcAAAAAAAAAAAAADrJ8AQ/original
demo:
  cols: 2
---

## When To Use

- When a series of information needs to be ordered by time (ascending or descending).
- When you need a timeline to make a visual connection.

## Examples

<!-- prettier-ignore -->
<code src="./demo/basic.tsx">Basic</code>
<code src="./demo/variant.tsx">Variant</code>
<code src="./demo/pending.tsx">Loading and Reversing</code>
<code src="./demo/pending-legacy.tsx" debug>Pending and Reversing</code>
<code src="./demo/alternate.tsx">Alternate</code>
<code src="./demo/horizontal.tsx">Horizontal</code>
<code src="./demo/horizontal-debug.tsx" debug>Horizontal</code>
<code src="./demo/custom.tsx">Custom</code>
<code src="./demo/end.tsx">End alternate</code>
<code src="./demo/title.tsx">Title</code>
<code src="./demo/title-span.tsx">Title Offset</code>
<code src="./demo/semantic.tsx">Semantic Sample</code>
<code src="./demo/component-token.tsx" debug>Component Token</code>

## API

Common props ref：[Common props](/docs/react/common-props)

### Timeline

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| items | Each node of timeline | [Items](#Items)[] | - |  |
| mode | By sending `alternate` the timeline will distribute the nodes to the left and right | `start` \| `alternate` \| `end` | `start` |  |
| orientation | Set the direction of the timeline | `vertical` \| `horizontal` | `vertical` |  |
| ~~pending~~ | Set the last ghost node's existence or its content. Use `item.loading` instead | ReactNode | false |  |
| ~~pendingDot~~ | Set the dot of the last ghost node when pending is true. Use `item.icon` instead | ReactNode | &lt;LoadingOutlined /&gt; |  |
| reverse | Whether reverse nodes or not | boolean | false |  |
| titleSpan | Set the title span space. It is the distance to the center of the dot <InlinePopover previewURL="https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*1NJISa7bpqgAAAAAR5AAAAgAerJ8AQ/original"></InlinePopover> | number \| string | 12 |  |
| variant | Config style variant | `filled` \| `outlined` | `outlined` |  |

### Items

Node of timeline.

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| color | Set the circle's color to `blue`, `red`, `green`, `gray` or other custom colors | string | `blue` |
| content | Set the content | ReactNode | - |
| ~~children~~ | Set the content. Please use `content` instead | ReactNode | - |
| ~~dot~~ | Customize timeline dot. Please use `icon` instead | ReactNode | - |
| icon | Customize node icon | ReactNode | - |
| ~~label~~ | Set the label. Please use `title` instead | ReactNode | - |
| loading | Set loading state | boolean | false |
| placement | Customize node placement | `start` \| `end` | - |
| ~~position~~ | Customize node position，Please use `placement` instead | `start` \| `end` | - |
| title | Set the title | ReactNode | - |

## Semantic DOM

### Timeline

<code src="./demo/_semantic.tsx" simplify="true"></code>

### Timeline Items

<code src="./demo/_semantic_items.tsx" simplify="true"></code>

## Design Token

<ComponentTokenTable component="Timeline"></ComponentTokenTable>
