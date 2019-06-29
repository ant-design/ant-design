---
category: Components
type: Data Entry
cols: 2
title: AutoComplete
---

Autocomplete function of input field.

## When To Use

When there is a need for autocomplete functionality.

## API

```jsx
const dataSource = ['12345', '23456', '34567'];
<AutoComplete dataSource={dataSource} />;
```

| Property | Description | Type | Default | Version Added |
| --- | --- | --- | --- | --- |
| allowClear | Show clear button, effective in multiple mode only. | boolean | false | 3.0.0 |
| autoFocus | get focus when component mounted | boolean | false | 3.0.0 |
| backfill | backfill selected item the input when using keyboard | boolean | false | 3.0.0 |
| children (for customize input element) | customize input element | HTMLInputElement / HTMLTextAreaElement / React.ReactElement<InputProps> | `<Input />` | 3.0.0 | 3.0.0 |
| children (for dataSource) | Data source for autocomplete | React.ReactElement<OptionProps> / Array&lt;React.ReactElement<OptionProps>> | - |
| dataSource | Data source for autocomplete | [DataSourceItemType](https://git.io/vMMKF)\[] |  | 3.0.0 |
| defaultActiveFirstOption | Whether active first option by default | boolean | true | 3.0.0 |
| defaultValue | Initial selected option. | string\|string\[]\| - | 3.0.0 |
| disabled | Whether disabled select | boolean | false | 3.0.0 |
| filterOption | If true, filter options by input, if function, filter options against it. The function will receive two arguments, `inputValue` and `option`, if the function returns `true`, the option will be included in the filtered set; Otherwise, it will be excluded. | boolean or function(inputValue, option) | true | 3.0.0 |
| optionLabelProp | Which prop value of option will render as content of select. | string | `children` | 3.0.0 |
| placeholder | placeholder of input | string | - | 3.0.0 |
| value | selected option | string\|string\[]\|{ key: string, label: string\|ReactNode }\|Array&lt;{ key: string, label: string\|ReactNode }> | - | 3.0.0 |
| onBlur | Called when leaving the component. | function() | - | 3.6.5 |
| onChange | Called when select an option or input value change, or value of input is changed | function(value) | - | 3.0.0 |
| onFocus | Called when entering the component | function() | - | 3.6.5 |
| onSearch | Called when searching items. | function(value) | - | 3.0.0 |
| onSelect | Called when a option is selected. param is option's value and option instance. | function(value, option) | - | 3.0.0 |
| defaultOpen | Initial open state of dropdown | boolean | - | 3.9.3 |
| open | Controlled open state of dropdown | boolean | - | 3.9.3 |
| onDropdownVisibleChange | Call when dropdown open | function(open) | - | 3.9.3 |

## Methods

| Name    | Description  | Version Added |
| ------- | ------------ | ------------- |
| blur()  | remove focus | 3.0.0         |
| focus() | get focus    | 3.0.0         |
