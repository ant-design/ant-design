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

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| allowClear | Show clear button, effective in multiple mode only. | boolean | false |  |
| autoFocus | get focus when component mounted | boolean | false |  |
| backfill | backfill selected item the input when using keyboard | boolean | false |  |
| children (for customize input element) | customize input element | HTMLInputElement <br /><br /> HTMLTextAreaElement <br /><br /> `React.ReactElement<InputProps>` | `<Input />` |  |
| children (for dataSource) | Data source to auto complete | `React.ReactElement<OptionProps>` <br /><br /> `Array<React.ReactElement<OptionProps>>` | - |  |
| dataSource | Data source for autocomplete | [DataSourceItemType](https://git.io/vMMKF)\[] | - |  |
| defaultActiveFirstOption | Whether active first option by default | boolean | true |  |
| defaultValue | Initial selected option. | string\|string\[] | - |  |
| disabled | Whether disabled select | boolean | false |  |
| filterOption | If true, filter options by input, if function, filter options against it. The function will receive two arguments, `inputValue` and `option`, if the function returns `true`, the option will be included in the filtered set; Otherwise, it will be excluded. | boolean or function(inputValue, option) | true |  |
| optionLabelProp | Which prop value of option will render as content of select. | string | `children` |  |
| placeholder | placeholder of input | string | - |  |
| value | selected option | string\|string\[]\|{ key: string, label: string\|ReactNode }\|Array&lt;{ key: string, label: string\|ReactNode }> | - |  |
| onBlur | Called when leaving the component. | function() | - | 3.6.5 |
| onChange | Called when select an option or input value change, or value of input is changed | function(value) | - |  |
| onFocus | Called when entering the component | function() | - | 3.6.5 |
| onSearch | Called when searching items. | function(value) | - |  |
| onSelect | Called when a option is selected. param is option's value and option instance. | function(value, option) | - |  |
| defaultOpen | Initial open state of dropdown | boolean | - | 3.9.3 |
| open | Controlled open state of dropdown | boolean | - | 3.9.3 |
| onDropdownVisibleChange | Call when dropdown open | function(open) | - | 3.9.3 |

## Methods

| Name    | Description  | Version |
| ------- | ------------ | ------- |
| blur()  | remove focus |         |
| focus() | get focus    |         |

## FAQ

### Why text composition system not works well with onSearch in controlled mode?

Please use `onChange` to manage control state. `onSearch` is used for searching input which is not same as `onChange`. Besides, click on the option also not trigger the `onSearch` event.

Related issue: [#18230](https://github.com/ant-design/ant-design/issues/18230) [#17916](https://github.com/ant-design/ant-design/issues/17916)
