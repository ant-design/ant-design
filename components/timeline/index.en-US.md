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
<code src="./demo/color.tsx">Color</code>
<code src="./demo/pending.tsx">Last node and Reversing</code>
<code src="./demo/alternate.tsx">Alternate</code>
<code src="./demo/custom.tsx">Custom</code>
<code src="./demo/right.tsx">Right alternate</code>
<code src="./demo/label.tsx">Label</code>
<code src="./demo/wireframe.tsx" debug>Wireframe</code>
<code src="./demo/component-token.tsx" debug>Component Token</code>

## API

Common props ref：[Common props](/docs/react/common-props)

### Timeline

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| items | Each node of timeline | [Items](#Items)[] | - |  |
| mode | By sending `alternate` the timeline will distribute the nodes to the left and right | `start` \| `alternate` \| `end` | `start` |  |
| ~~pending~~ | Set the last ghost node's existence or its content | ReactNode | false |  |
| ~~pendingDot~~ | Set the dot of the last ghost node when pending is true | ReactNode | &lt;LoadingOutlined /&gt; |  |
| reverse | Whether reverse nodes or not | boolean | false |  |
| variant | Config style variant | `filled` \| `outlined` | `outlined` |  |

### Items

Node of timeline.

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| color | Set the circle's color to `blue`, `red`, `green`, `gray` or other custom colors | string | `blue` |
| icon | Customize node icon | ReactNode | - |
| ~~dot~~ | Customize timeline dot | ReactNode | - |
| ~~label~~ | Set the label | ReactNode | - |
| ~~children~~ | Set the content | ReactNode | - |
| title | Set the title | ReactNode | - |
| content | Set the content | ReactNode | - |
| position | Customize node position | `left` \| `right` | - |

## Semantic DOM

<code src="./demo/_semantic.tsx" simplify="true"></code>

## Design Token

<ComponentTokenTable component="Timeline"></ComponentTokenTable>
