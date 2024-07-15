---
category: Components
group: Data Display
title: Chatbox
description: A bubble component for chat.
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*HjY3QKszqFEAAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*G8njQogkGwAAAAAAAAAAAAAADrJ8AQ/original
demo:
  cols: 2
tag: 5.20.0
---

## When To Use

Often used when chatting.

## Examples

<!-- prettier-ignore -->
<code src="./demo/basic.tsx">Basic</code>
<code src="./demo/avatar-and-placement.tsx">Placement and avatar</code>
<code src="./demo/loading.tsx">Loading</code>
<code src="./demo/typing.tsx">Typing effect</code>
<code src="./demo/contentRender.tsx">Content render</code>

## API

Common props ref：[Common props](/docs/react/common-props)

> This component is available since `antd@5.20.0`.

### Chatbox

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| avatar | Avatar component | `React.ReactNode` | - |  |
| classNames | Semantic DOM class | [Record<SemanticDOM, string>](#semantic-dom) | - |  |
| styles | Semantic DOM style | [Record<SemanticDOM, CSSProperties>](#semantic-dom) | - |  |
| placement | Direction of Message | `start \| end` | `start` |  |
| loading | Loading state of Message | `boolean` | - |  |
| typing | Show message with typing motion | `boolean \| { step?: number, interval?: number }` | `false` |  |
| content | Content of Chatbox | `string` | - |  |
| contentRender | Display cuztomized content | `(content?: string) => ReactNode` | - |  |

## Semantic DOM

<code src="./demo/_semantic.tsx" simplify="true"></code>

## Design Token

<ComponentTokenTable component="Chatbox"></ComponentTokenTable>
