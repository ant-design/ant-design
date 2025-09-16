---
group: Feedback
category: Components
title: Result
description: Used to feedback the processing results of a series of operations.
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*-e2IRroDJyEAAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*-0kxQrbHx2kAAAAAAAAAAAAADrJ8AQ/original
---

## When To Use

Use when important operations need to inform the user to process the results and the feedback is more complicated.

## Examples

<!-- prettier-ignore -->
<code src="./demo/success.tsx">Success</code>
<code src="./demo/info.tsx">Info</code>
<code src="./demo/warning.tsx">Warning</code>
<code src="./demo/403.tsx">403</code>
<code src="./demo/404.tsx">404</code>
<code src="./demo/500.tsx">500</code>
<code src="./demo/error.tsx">Error</code>
<code src="./demo/customIcon.tsx">Custom icon</code>
<code src="./demo/component-token.tsx" debug>Component Token</code>
<code src="./demo/style-class.tsx">Custom classNames and styles</code>

## API

Common props ref：[Common props](/docs/react/common-props)

| Property | Description | Type | Default |
| --- | --- | --- | --- | --- |
| classNames | Customize class for each semantic structure inside the component | Record<[SemanticDOM](#semantic-dom), string> | - | 6.0.0 |
| extra | Operating area | ReactNode | - |
| icon | Custom back icon | ReactNode | - |
| status | Result status, decide icons and colors | `success` \| `error` \| `info` \| `warning` \| `404` \| `403` \| `500` | `info` |
| styles | Customize inline style for each semantic structure inside the component | Record<[SemanticDOM](#semantic-dom), CSSProperties> | - | 6.0.0 |
| subTitle | The subTitle | ReactNode | - |
| title | The title | ReactNode | - |

## Semantic DOM

<code src="./demo/_semantic.tsx" simplify="true"></code>

## Design Token

<ComponentTokenTable component="Result"></ComponentTokenTable>
