---
category: Components
type: Data Entry
cols: 2
title: AutoComplete
cover: https://gw.alipayobjects.com/zos/alicdn/qtJm4yt45/AutoComplete.svg
---

Autocomplete function of input field.

## When To Use

- When you need an input box instead of a selector.
- When you need input suggestions or helping text.

The differences with Select are:

- AutoComplete is an input box with text hints, and users can type freely. The keyword is aiding **input**.
- Select is selecting among given choices. The keyword is **select**.

## API

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| allowClear | Show clear button | boolean | false |  |
| autoFocus | If get focus when component mounted | boolean | false |  |
| backfill | If backfill selected item the input when using keyboard | boolean | false |  |
| children (for customize input element) | Customize input element | HTMLInputElement \| HTMLTextAreaElement \| React.ReactElement&lt;InputProps> | &lt;Input /> |  |
| children (for dataSource) | Data source to auto complete | React.ReactElement&lt;OptionProps> \| Array&lt;React.ReactElement&lt;OptionProps>> | - |  |
| defaultActiveFirstOption | Whether active first option by default | boolean | true |  |
| defaultOpen | Initial open state of dropdown | boolean | - |  |
| defaultValue | Initial selected option | string | - |  |
| disabled | Whether disabled select | boolean | false |  |
| dropdownClassName | The className of dropdown menu | string | - |  |
| dropdownMatchSelectWidth | Determine whether the dropdown menu and the select input are the same width. Default set `min-width` same as input. Will ignore when value less than select width. `false` will disable virtual scroll | boolean \| number | true |  |
| filterOption | If true, filter options by input, if function, filter options against it. The function will receive two arguments, `inputValue` and `option`, if the function returns true, the option will be included in the filtered set; Otherwise, it will be excluded | boolean \| function(inputValue, option) | true |  |
| notFoundContent | Specify content to show when no result matches | string | `Not Found` |  |
| open | Controlled open state of dropdown | boolean | - |  |
| options | Select options. Will get better perf than jsx definition | { label, value }\[] | - |  |
| placeholder | The placeholder of input | string | - |  |
| status | Set validation status | 'error' \| 'warning' | - | 4.19.0 |
| value | Selected option | string | - |  |
| onBlur | Called when leaving the component | function() | - |  |
| onChange | Called when selecting an option or changing an input value | function(value) | - |  |
| onDropdownVisibleChange | Call when dropdown open | function(open) | - |  |
| onFocus | Called when entering the component | function() | - |  |
| onSearch | Called when searching items | function(value) | - |  |
| onSelect | Called when a option is selected. param is option's value and option instance | function(value, option) | - |  |
| onClear | Called when clear | function | - | 4.6.0 |

## Methods

| Name    | Description  | Version |
| ------- | ------------ | ------- |
| blur()  | Remove focus |         |
| focus() | Get focus    |         |

## FAQ

### Why doesn't the text composition system work well with onSearch in controlled mode?

Please use `onChange` to manage control state. `onSearch` is used for searching input which is not the same as `onChange`. Besides, clicking on the option will not trigger the `onSearch` event.

Related issue: [#18230](https://github.com/ant-design/ant-design/issues/18230) [#17916](https://github.com/ant-design/ant-design/issues/17916)

### Part of the api in v3 are not available in v4?

AutoComplete is an Input component that supports auto complete tips. As such, it should not support props like `labelInValue` that affect value display. In v3, the AutoComplete implementation can not handle the case where the `value` and `label` are identical. v4 not longer support `label` as the value input.

Besides, to unify the API, `dataSource` is replaced with `options`. You can migrate with the following change:

#### v3

```tsx
dataSource = ['light', 'bamboo'];
// or
dataSource = [
  { value: 'light', text: 'Light' },
  { value: 'bamboo', text: 'Bamboo' },
];
```

#### v4

```tsx
options = [
  { value: 'light', label: 'Light' },
  { value: 'bamboo', label: 'Bamboo' },
];
```
