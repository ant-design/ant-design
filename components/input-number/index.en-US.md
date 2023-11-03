---
category: Components
group: Data Entry
title: InputNumber
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*JvWbSYhuNlIAAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*1uH-R5kLAMIAAAAAAAAAAAAADrJ8AQ/original
demo:
  cols: 2
---

Enter a number within certain range with the mouse or keyboard.

## When To Use

When a numeric value needs to be provided.

## Examples

<!-- prettier-ignore -->
<code src="./demo/basic.tsx">Basic</code>
<code src="./demo/size.tsx">Sizes</code>
<code src="./demo/addon.tsx">Pre / Post tab</code>
<code src="./demo/disabled.tsx">Disabled</code>
<code src="./demo/digit.tsx">High precision decimals</code>
<code src="./demo/formatter.tsx">Formatter</code>
<code src="./demo/keyboard.tsx">Keyboard</code>
<code src="./demo/borderless.tsx">Borderless</code>
<code src="./demo/out-of-range.tsx">Out of range</code>
<code src="./demo/prefix.tsx">Prefix</code>
<code src="./demo/status.tsx">Status</code>
<code src="./demo/controls.tsx" debug>Icon</code>
<code src="./demo/render-panel.tsx" debug>_InternalPanelDoNotUseOrYouWillBeFired</code>
<code src="./demo/debug-token.tsx" debug>Override Component Style</code>

## API

Common props ref：[Common props](/docs/react/common-props)

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| addonAfter | The label text displayed after (on the right side of) the input field | ReactNode | - |  |
| addonBefore | The label text displayed before (on the left side of) the input field | ReactNode | - |  |
| autoFocus | If get focus when component mounted | boolean | false | - |
| bordered | Whether has border style | boolean | true | 4.12.0 |
| changeOnBlur | Trigger `onChange` when blur. e.g. reset value in range by blur | boolean | true | 5.11.0 |
| controls | Whether to show `+-` controls, or set custom arrows icon | boolean \| { upIcon?: React.ReactNode; downIcon?: React.ReactNode; } | - | 4.19.0 |
| decimalSeparator | Decimal separator | string | - | - |
| placeholder | placeholder | string | - |  |
| defaultValue | The initial value | number | - | - |
| disabled | If disable the input | boolean | false | - |
| formatter | Specifies the format of the value presented | function(value: number \| string, info: { userTyping: boolean, input: string }): string | - | info: 4.17.0 |
| keyboard | If enable keyboard behavior | boolean | true | 4.12.0 |
| max | The max value | number | [Number.MAX_SAFE_INTEGER](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/MAX_SAFE_INTEGER) | - |
| min | The min value | number | [Number.MIN_SAFE_INTEGER](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/MIN_SAFE_INTEGER) | - |
| parser | Specifies the value extracted from formatter | function(string): number | - | - |
| precision | The precision of input value. Will use `formatter` when config of `formatter` | number | - | - |
| readOnly | If readonly the input | boolean | false | - |
| status | Set validation status | 'error' \| 'warning' | - | 4.19.0 |
| prefix | The prefix icon for the Input | ReactNode | - | 4.17.0 |
| size | The height of input box | `large` \| `middle` \| `small` | - | - |
| step | The number to which the current value is increased or decreased. It can be an integer or decimal | number \| string | 1 | - |
| stringMode | Set value as string to support high precision decimals. Will return string value by `onChange` | boolean | false | 4.13.0 |
| value | The current value | number | - | - |
| onChange | The callback triggered when the value is changed | function(value: number \| string \| null) | - | - |
| onPressEnter | The callback function that is triggered when Enter key is pressed | function(e) | - | - |
| onStep | The callback function that is triggered when click up or down buttons | (value: number, info: { offset: number, type: 'up' \| 'down' }) => void | - | 4.7.0 |

## Methods

| Name    | Description  |
| ------- | ------------ |
| blur()  | Remove focus |
| focus() | Get focus    |

## Design Token

<ComponentTokenTable component="InputNumber"></ComponentTokenTable>

## Notes

Per issues [#21158](https://github.com/ant-design/ant-design/issues/21158), [#17344](https://github.com/ant-design/ant-design/issues/17344), [#9421](https://github.com/ant-design/ant-design/issues/9421), and [documentation about inputs](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/number#Using_number_inputs), it appears this community does not support native inclusion of the `type="number"` in the `<Input />` attributes, so please feel free to include it as needed, and be aware that it is heavily suggested that server side validation be utilized, as client side validation can be edited by power users.

## FAQ

### Why `value` can exceed `min` or `max` in control?

Developer handle data by their own in control. It will make data out of sync if InputNumber change display value. It also cause potential data issues when use in form.

### Why dynamic change `min` or `max` which makes `value` out of range will not trigger `onChange`?

`onChange` is user trigger event. Auto trigger will makes form lib can not detect data modify source.

### Why `onBlur` or other event can not get correct value?

InputNumber's value is wrapped by internal logic. The `event.target.value` you get from `onBlur` or other event is the DOM element's `value` instead of the actual value of InputNumber. For example, if you change the display format through `formatter` or `decimalSeparator`, you will get the formatted string in the DOM. You should always get the current value through `onChange`.
