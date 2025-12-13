---
category: Components
group: Data Entry
title: InputNumber
description: Enter a number within certain range with the mouse or keyboard.
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*JvWbSYhuNlIAAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*1uH-R5kLAMIAAAAAAAAAAAAADrJ8AQ/original
demo:
  cols: 2
---

## When To Use

When a numeric value needs to be provided.

## Examples

<!-- prettier-ignore -->
<code src="./demo/basic.tsx">Basic</code>
<code src="./demo/size.tsx">Sizes</code>
<code src="./demo/addon.tsx" debug>Pre / Post tab</code>
<code src="./demo/disabled.tsx">Disabled</code>
<code src="./demo/digit.tsx">High precision decimals</code>
<code src="./demo/formatter.tsx">Formatter</code>
<code src="./demo/keyboard.tsx">Keyboard</code>
<code src="./demo/change-on-wheel.tsx" version="5.14.0">Wheel</code>
<code src="./demo/variant.tsx" version="5.13.0">Variants</code>
<code src="./demo/spinner.tsx" version="6.0.0">Spinner</code>
<code src="./demo/filled-debug.tsx" debug>Filled Debug</code>
<code src="./demo/out-of-range.tsx">Out of range</code>
<code src="./demo/presuffix.tsx">Prefix / Suffix</code>
<code src="./demo/status.tsx">Status</code>
<code src="./demo/focus.tsx" version="5.22.0">Focus</code>
<code src="./demo/style-class.tsx" version="6.0.0">Custom semantic dom styling</code>
<code src="./demo/controls.tsx" debug>Icon</code>
<code src="./demo/render-panel.tsx" debug>_InternalPanelDoNotUseOrYouWillBeFired</code>
<code src="./demo/debug-token.tsx" debug>Override Component Style</code>
<code src="./demo/allow-clear.tsx" version="6.x">Allow Clear</code>

## API

Common props ref：[Common props](/docs/react/common-props)

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| ~~addonAfter~~ | The label text displayed after (on the right side of) the input field, please use Space.Compact instead | ReactNode | - |  |
| ~~addonBefore~~ | The label text displayed before (on the left side of) the input field, please use Space.Compact instead | ReactNode | - |  |
| changeOnBlur | Trigger `onChange` when blur. e.g. reset value in range by blur | boolean | true | 5.11.0 |
| changeOnWheel | Allows control with mouse wheel | boolean | - | 5.14.0 |
| classNames | Customize class for each semantic structure inside the component. Supports object or function. | Record<[SemanticDOM](#semantic-dom), string> \| (info: { props })=> Record<[SemanticDOM](#semantic-dom), string> | - | - |
| controls | Whether to show `+-` controls, or set custom arrow icons | boolean \| { upIcon?: React.ReactNode; downIcon?: React.ReactNode; } | - |  |
| decimalSeparator | Decimal separator | string | - | - |
| placeholder | Placeholder | string | - |  |
| defaultValue | The initial value | number | - | - |
| disabled | If the input is disabled | boolean | false | - |
| formatter | Specifies the format of the value presented | function(value: number \| string, info: { userTyping: boolean, input: string }): string | - |  |
| keyboard | If keyboard behavior is enabled | boolean | true |  |
| max | The max value | number | [Number.MAX_SAFE_INTEGER](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/MAX_SAFE_INTEGER) | - |
| min | The min value | number | [Number.MIN_SAFE_INTEGER](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/MIN_SAFE_INTEGER) | - |
| parser | Specifies the value extracted from formatter | function(string): number | - | - |
| precision | The precision of input value. Will use `formatter` when config of `formatter` | number | - | - |
| readOnly | If the input is readonly | boolean | false | - |
| status | Set validation status | 'error' \| 'warning' | - |  |
| styles | Customize inline style for each semantic structure inside the component. Supports object or function. | Record<[SemanticDOM](#semantic-dom), CSSProperties> \| (info: { props })=> Record<[SemanticDOM](#semantic-dom), CSSProperties> | - | - |
| prefix | The prefix icon for the Input | ReactNode | - |  |
| suffix | The suffix icon for the Input | ReactNode | - | 5.20.0 |
| size | The height of input box | `large` \| `middle` \| `small` | - | - |
| step | The number to which the current value is increased or decreased. It can be an integer or decimal | number \| string | 1 | - |
| stringMode | Set value as string to support high precision decimals. Will return string value by `onChange` | boolean | false |  |
| mode | Show input or spinner | `'input' \| 'spinner'` | `'input'` |  |
| value | The current value of the component | number | - | - |
| variant | Variants of Input | `outlined` \| `borderless` \| `filled` \| `underlined` | `outlined` | 5.13.0 \| `underlined`: 5.24.0 |
| allowClear | If allow clear, click to remove the content | `boolean` \| { clearIcon?: React.ReactNode } | false | 6.x |
| onChange | The callback triggered when the value is changed | function(value: number \| string \| null) | - | - |
| onPressEnter | The callback function that is triggered when Enter key is pressed | function(e) | - | - |
| onStep | The callback function that is triggered when click up or down buttons | (value: number, info: { offset: number, type: 'up' \| 'down' }) => void | - |  |
| onClear | The callback function that is triggered when click clear icon | `function(e: React.MouseEvent<HTMLDivElement>)` | - | 6.x |

## Ref

| Name | Description | Type | Version |
| --- | --- | --- | --- |
| blur() | Remove focus | - |  |
| focus() | Get focus | (option?: { preventScroll?: boolean, cursor?: 'start' \| 'end' \| 'all' }) | cursor - 5.22.0 |
| nativeElement | The native DOM element | - | 5.17.3 |

## Semantic DOM

<code src="./demo/_semantic.tsx" simplify="true"></code>

## Design Token

<ComponentTokenTable component="InputNumber"></ComponentTokenTable>

## Notes

Per issues [#21158](https://github.com/ant-design/ant-design/issues/21158), [#17344](https://github.com/ant-design/ant-design/issues/17344), [#9421](https://github.com/ant-design/ant-design/issues/9421), and [documentation about inputs](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/number#Using_number_inputs), it appears this community does not support native inclusion of the `type="number"` in the `<Input />` attributes, so please feel free to include it as needed, and be aware that it is heavily suggested that server side validation be utilized, as client side validation can be edited by power users.

## FAQ

### Why `value` can exceed `min` or `max` in control? {#faq-controlled-range}

Developer handle data by their own in control. It will make data out of sync if InputNumber changes display value. It also cause potential data issues when use in form.

### Why dynamic change `min` or `max` which makes `value` out of range will not trigger `onChange`? {#faq-dynamic-range-change}

`onChange` is user trigger event. Auto-triggering would prevent form libraries from detecting the data modification source.

### Why `onBlur` or other event can not get correct value? {#faq-onblur-value}

InputNumber's value is wrapped by internal logic. The `event.target.value` you get from `onBlur` or other event is the DOM element's `value` instead of the actual value of InputNumber. For example, if you change the display format through `formatter` or `decimalSeparator`, you will get the formatted string in the DOM. You should always get the current value through `onChange`.

### Why `changeOnWheel` unable to control whether the mouse scroll wheel changes value? {#faq-change-on-wheel}

> The use of the `type` attribute is deprecated

The InputNumber component allows you to use all the attributes of the input element and ultimately pass them to the input element, This attribute will also be added to the input element when you pass in `type='number'`, which will activate native behavior (allowing the mouse wheel to change the value), As a result `changeOnWheel` cannot control whether the mouse wheel changes the value.

### How to use allowClear feature? {#faq-allow-clear}

The `allowClear` property allows users to quickly clear the input content by clicking the clear button on the right side. When set to `true`, the clear button will be displayed when the input has content and is not disabled. You can also customize the clear icon using `allowClear={{ clearIcon: <CustomIcon /> }}`. Clicking the clear button will trigger the `onClear` callback and set the value to `null`.

```tsx
// Basic usage
<InputNumber allowClear />

// Custom clear icon
<InputNumber
  allowClear={{ clearIcon: <CustomClearIcon /> }}
  onClear={(e) => console.log('cleared!')}
/>
```

Note: The clear button will not be displayed when the `value` is `0`, as `0` is considered a valid numeric value.
