---
category: Components
type: Data Entry
cols: 2
title: AutoComplete
cover: https://gw.alipayobjects.com/zos/alicdn/qtJm4yt45/AutoComplete.svg
---

Autocomplete function of input field.

## When To Use

When there is a need for autocomplete functionality.

## API

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| allowClear | Show clear button, effective in multiple mode only | boolean | false |  |
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
| onBlur | Called when leaving the component | function() | - |  |
| onChange | Called when select an option or input value change, or value of input is changed | function(value) | - |  |
| onDropdownVisibleChange | Call when dropdown open | function(open) | - |  |
| onFocus | Called when entering the component | function() | - |  |
| onSearch | Called when searching items | function(value) | - |  |
| onSelect | Called when a option is selected. param is option's value and option instance | function(value, option) | - |  |
| open | Controlled open state of dropdown | boolean | - |  |
| options | Select options. Will get better perf than jsx definition | { label, value }[] | - |  |
| placeholder | The placeholder of input | string | - |  |
| value | Selected option | string | - |  |

## Methods

| Name    | Description  | Version |
| ------- | ------------ | ------- |
| blur()  | Remove focus |         |
| focus() | Get focus    |         |

## FAQ

### Why doesn't the text composition system work well with onSearch in controlled mode?

Please use `onChange` to manage control state. `onSearch` is used for searching input which is not same as `onChange`. Besides, clicking on the option will not trigger the `onSearch` event.

Related issue: [#18230](https://github.com/ant-design/ant-design/issues/18230) [#17916](https://github.com/ant-design/ant-design/issues/17916)

### Part of api from v3 not available in v4?

AutoComplete is a Input component support auto complete tips which should not support `labelInValue` prop to modify dispaly value in input. In v3, AutoComplete realization can not handle case that user type match of both `value` & `label` are the same. v4 not longer support `label` as the value input.

Besides, to unique API, `dataSource` replaced with `options`:

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
