---
category: Components
group: Data Display
title: ChatBox
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
<code src="./demo/avatar-and-placement.tsx">placement and avatar</code>
<code src="./demo/stream-output.tsx">stream output</code>

## API

Common props ref：[Common props](/docs/react/common-props)

> This component is available since `antd@5.17.0`.

### ChatBox

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| avatar | Avatar component | `React.ReactNode` | - |  |
| placement | Direction of Message | `start \| end` | `start` |  |
| loading | Loading state of Message | `React.ReactNode` | - |  |
| step | Show message with stepping motion | `boolean \| { step?: number, interval?: number }` | `false` |  |
| content | Content of ChatBox | `string` | - |  |
| contentRender | Display cuztomized content | `(content?: string) => ReactNode` | - |  |

## Design Token

<ComponentTokenTable component="ChatBox"></ComponentTokenTable>
