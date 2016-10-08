---
category: Components
type: Form Controls
cols: 1
title: AutoComplete
---

Autocomplete function of input field.

## When To Use

When need to use autocomplete function.

## API

```jsx
const dataSource = ['12345', '23456', '34567'];
<AutoComplete dataSource={dataSource} />
```


| Property           | Description                             |  Type | Default |
|----------------|----------------------------------|------------|--------|
| dataSource          | Data source for autocomplete | Array     |      |
| value    | selected option | String/Array<String>/{key: String, label: React.Node}/Array<{key, label}>   |  -  |
| defaultValue | Initial selected option. | string/Array<String>   |  -  |
| allowClear   | Show clear button, effective in multiple mode only. | boolean | false |
| onChange | Called when select an option or input value change, or value of input is changed | function(value, label) | - |
| onSelect | Called when a option is selected. param is option's value and option instance. | function(value, option) | -   |
| disabled | Whether disabled select | boolean | false |
