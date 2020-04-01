---
category: Components
type: Data Entry
title: InputNumber
---

Enter a number within certain range with the mouse or keyboard.

## When To Use

When a numeric value needs to be provided.

## API

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| autoFocus | get focus when component mounted | boolean | false |
| defaultValue | initial value | number |  |
| disabled | disable the input | boolean | false |
| formatter | Specifies the format of the value presented | function(value: number \| string): string |  |
| max | max value | number | Infinity |
| min | min value | number | -Infinity |
| parser | Specifies the value extracted from formatter | function( string): number |  |
| precision | precision of input value | number |  |
| decimalSeparator | decimal separator | string |  |
| size | height of input box | `large` \| `middle` \| `small` |  |
| step | The number to which the current value is increased or decreased. It can be an integer or decimal. | number\|string | 1 |
| type | HTML inputs can have a type of `number`, and this can be added to aid [mobile] broswer keyboards to show the number keybaord, as well as limit inputs to numbers only [0-9 and e], but will not guaruntee client and server side validation. | string - ie 'number' |  |
| value | current value | number |  |
| onChange | The callback triggered when the value is changed. | function(value: number \| string) |  |
| onPressEnter | The callback function that is triggered when Enter key is pressed. | function(e) |  |

## Methods

| Name    | Description  |
| ------- | ------------ |
| blur()  | remove focus |
| focus() | get focus    |

## Notes

Per issues [#21158](https://github.com/ant-design/ant-design/issues/21158), [#17344](https://github.com/ant-design/ant-design/issues/17344), [#9421](https://github.com/ant-design/ant-design/issues/9421), and [documentation about inputs](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/number#Using_number_inputs), it appears this community does not support native inclusion of the `type="number"` in the `<Input />` attributes, so please feel free to include it as needed, and be aware that it is heavily suggested that server side validation be utilized, as client side validation can be edited by power users.
