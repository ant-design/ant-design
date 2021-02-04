---
category: Components
type: Data Entry
title: InputNumber
cover: https://gw.alipayobjects.com/zos/alicdn/XOS8qZ0kU/InputNumber.svg
---

Enter a number within certain range with the mouse or keyboard.

## When To Use

When a numeric value needs to be provided.

## API

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| autoFocus | If get focus when component mounted | boolean | false | - |
| bordered | Whether has border style | boolean | true | 4.12.0 |
| decimalSeparator | Decimal separator | string | - | - |
| defaultValue | The initial value | number | - | - |
| disabled | If disable the input | boolean | false | - |
| formatter | Specifies the format of the value presented | function(value: number \| string): string | - | - |
| keyboard | If enable keyboard behavior | boolean | true | 4.12.0 |
| max | The max value | number | [Number.MAX_SAFE_INTEGER](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/MAX_SAFE_INTEGER) | - |
| min | The min value | number | [Number.MIN_SAFE_INTEGER](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/MIN_SAFE_INTEGER) | - |
| parser | Specifies the value extracted from formatter | function(string): number | - | - |
| precision | The precision of input value | number | - | - |
| readOnly | If readonly the input | boolean | false | - |
| size | The height of input box | `large` \| `middle` \| `small` | - | - |
| step | The number to which the current value is increased or decreased. It can be an integer or decimal | number \| string | 1 | - |
| value | The current value | number | - | - |
| onChange | The callback triggered when the value is changed | function(value: number \| string \| null) | - | - |
| onPressEnter | The callback function that is triggered when Enter key is pressed | function(e) | - | - |
| onStep | The callback function that is triggered when click up or down buttons | (value: number, info: { offset: number, type: 'up' \| 'down' }) => void | - | 4.7.0 |

## Methods

| Name    | Description  |
| ------- | ------------ |
| blur()  | Remove focus |
| focus() | Get focus    |

## Notes

Per issues [#21158](https://github.com/ant-design/ant-design/issues/21158), [#17344](https://github.com/ant-design/ant-design/issues/17344), [#9421](https://github.com/ant-design/ant-design/issues/9421), and [documentation about inputs](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/number#Using_number_inputs), it appears this community does not support native inclusion of the `type="number"` in the `<Input />` attributes, so please feel free to include it as needed, and be aware that it is heavily suggested that server side validation be utilized, as client side validation can be edited by power users.
