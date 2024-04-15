---
category: Components
group: Data Display
title: Chatbox
description: A bubble component for chat.
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*NMvqRZpuJfQAAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*D70qQJJmzhgAAAAAAAAAAAAADrJ8AQ/original
demo:
  cols: 2
tag: 5.17.0
---

## When To Use

Often used when chatting.

## Examples

<!-- prettier-ignore -->
<code src="./demo/basic.tsx">Basic</code>
<code src="./demo/avatar-and-placement.tsx">Placement and avatar</code>
<code src="./demo/stream-output.tsx">Stream output</code>
<code src="./demo/loading.tsx">Loading</code>
<code src="./demo/contentRender.tsx">Content render</code>

## API

Common props ref：[Common props](/docs/react/common-props)

> This component is available since `antd@5.17.0`.

### Chatbox

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| avatar | Avatar component | `React.ReactNode` | - |  |
| placement | Direction of Message | `start \| end` | `start` |  |
| loading | Loading state of Message | `boolean` | - |  |
| step | Show message with stepping motion | `boolean \| { step?: number, interval?: number }` | `false` |  |
| content | Content of Chatbox | `string` | - |  |
| contentRender | Display cuztomized content (If use `contentRender` prop, the typed effect needs to be implemented by yourself) | `(content?: string) => ReactNode` | - |  |

## Design Token

<ComponentTokenTable component="Chatbox"></ComponentTokenTable>
