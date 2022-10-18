---
group: Feedback
category: Components
title: Result
cover: https://gw.alipayobjects.com/zos/alicdn/9nepwjaLa/Result.svg
demo:
  cols: 2
---

Used to feed back the results of a series of operational tasks.

## When To Use

Use when important operations need to inform the user to process the results and the feedback is more complicated.

## Examples

<code src="./demo/success.tsx">Success</code>
<code src="./demo/info.tsx">Info</code>
<code src="./demo/warning.tsx">Warning</code>
<code src="./demo/403.tsx">403</code>
<code src="./demo/404.tsx">404</code>
<code src="./demo/500.tsx">500</code>
<code src="./demo/error.tsx">Error</code>
<code src="./demo/customIcon.tsx">Custom icon</code>

## API

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| extra | Operating area | ReactNode | - |
| icon | Custom back icon | ReactNode | - |
| status | Result status, decide icons and colors | `success` \| `error` \| `info` \| `warning` \| `404` \| `403` \| `500` | `info` |
| subTitle | The subTitle | ReactNode | - |
| title | The title | ReactNode | - |
