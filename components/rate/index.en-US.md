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

| Property | Description | type | Default | Version Added |
| --- | --- | --- | --- | --- |
| allowClear | whether to allow clear when click again | boolean | true | 3.1.0 |
| allowHalf | whether to allow semi selection | boolean | false | 3.0.0 |
| autoFocus | get focus when component mounted | boolean | false | 3.0.0 |
| character | custom character of rate | ReactNode | `<Icon type="star" />` | 3.0.0 |
| className | custom class name of rate | string | - | 3.0.0 |
| count | star count | number | 5 | 3.0.0 |
| defaultValue | default value | number | 0 | 3.0.0 |
| disabled | read only, unable to interact | boolean | false | 3.0.0 |
| style | custom style object of rate | object | - | 3.0.0 |
| tooltips | Customize tooltip by each character | string\[] | - | 3.12.0 |
| value | current value | number | - | 3.0.0 |
| onBlur | callback when component lose focus | Function() | - | 3.0.0 |
| onChange | callback when select value | Function(value: number) | - | 3.0.0 |
| onFocus | callback when component get focus | Function() | - | 3.0.0 |
| onHoverChange | callback when hover item | Function(value: number) | - | 3.0.0 |
| onKeyDown | callback when keydown on component | Function(event) | - | 3.0.0 |

## Methods

| Name    | Description  | Version Added |
| ------- | ------------ | ------------- |
| blur()  | remove focus | 3.0.0         |
| focus() | get focus    | 3.0.0         |
