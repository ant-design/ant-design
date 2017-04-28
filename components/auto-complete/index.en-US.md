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
<AutoComplete dataSource={dataSource} />
```

| Property           | Description                             |  Type | Default |
|----------------|----------------------------------|------------|--------|
| dataSource          | Data source for autocomplete | [DataSourceItemType](https://git.io/vMMKF)[]     |      |
| value    | selected option | string\|string[]\|{ key: string, label: string\|ReactNode }\|Array<{ key: string, label: string\|ReactNode }>   |  -  |
| defaultValue | Initial selected option. | string\|string[]\|{ key: string, label: string\|ReactNode }\|Array<{ key: string, label: string\|ReactNode }> |  -  |
| allowClear   | Show clear button, effective in multiple mode only. | boolean | false |
| onChange | Called when select an option or input value change, or value of input is changed | function(value, label) | - |
| onSelect | Called when a option is selected. param is option's value and option instance. | function(value, option) | -   |
| onSearch | Called when searching items. | function(value) | - |
| disabled | Whether disabled select | boolean | false |
| defaultActiveFirstOption | Whether active first option by default | boolean | true |
| placeholder | placeholder of input | string | - |
| children (for dataSource) | Data source for autocomplet | React.ReactElement<OptionProps> /  Array<React.ReactElement<OptionProps>> | - |
| children (for customize input element) | customize input element | HTMLInputElement / HTMLTextAreaElement / React.ReactElement<InputProps> | `<Input />` |
| optionLabelProp | Which prop value of option will render as content of select. | string | `children` |
| filterOption | If true, filter options by input, if function, filter options against it. The function will receive two arguments, `inputValue` and `option`, if the function returns `true`, the option will be included in the filtered set; Otherwise, it will be excluded. | boolean or function(inputValue, option) | true     |
