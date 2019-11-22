---
category: Components
type: Data Entry
title: Rate
---

Rate component.

## When To Use

- Show evaluation.
- A quick rating operation on something.

## API

| Property | Description | type | Default |
| --- | --- | --- | --- |
| allowClear | whether to allow clear when click again | boolean | true |
| allowHalf | whether to allow semi selection | boolean | false |
| autoFocus | get focus when component mounted | boolean | false |
| character | custom character of rate | ReactNode | `<Icon type="star" />` |
| className | custom class name of rate | string |  |
| count | star count | number | 5 |
| defaultValue | default value | number | 0 |
| disabled | read only, unable to interact | boolean | false |
| style | custom style object of rate | object |  |
| tooltips | Customize tooltip by each character | string\[] |  |
| value | current value | number |  |
| onBlur | callback when component lose focus | Function() |  |
| onChange | callback when select value | Function(value: number) |  |
| onFocus | callback when component get focus | Function() |  |
| onHoverChange | callback when hover item | Function(value: number) |  |
| onKeyDown | callback when keydown on component | Function(event) |  |

## Methods

| Name    | Description  |
| ------- | ------------ |
| blur()  | remove focus |
| focus() | get focus    |
