---
category: Components
type: Data Entry
title: Rate
cover: https://gw.alipayobjects.com/zos/alicdn/R5uiIWmxe/Rate.svg
---

Rate component.

## When To Use

- Show evaluation.
- A quick rating operation on something.

## API

| Property | Description | type | Default | Version |
| --- | --- | --- | --- | --- |
| allowClear | Whether to allow clear when click again | boolean | true |  |
| allowHalf | Whether to allow semi selection | boolean | false |  |
| autoFocus | If get focus when component mounted | boolean | false |  |
| character | The custom character of rate | ReactNode \| (RateProps) => ReactNode | &lt;StarFilled /> | function(): 4.4.0 |
| className | The custom class name of rate | string | - |  |
| count | Star count | number | 5 |  |
| defaultValue | The default value | number | 0 |  |
| disabled | If read only, unable to interact | boolean | false |  |
| style | The custom style object of rate | CSSProperties | - |  |
| tooltips | Customize tooltip by each character | string\[] | - |  |
| value | The current value | number | - |  |
| onBlur | Callback when component lose focus | function() | - |  |
| onChange | Callback when select value | function(value: number) | - |  |
| onFocus | Callback when component get focus | function() | - |  |
| onHoverChange | Callback when hover item | function(value: number) | - |  |
| onKeyDown | Callback when keydown on component | function(event) | - |  |

## Methods

| Name | Description |
| --- | --- |
| blur() | Remove focus |
| focus() | Get focus |
