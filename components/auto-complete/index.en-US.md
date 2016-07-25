---
category: Components
chinese: 自动完成
type: Form Controls
cols: 1
english: AutoComplete
---

Autocomplete function of input field.

## When to use

When need to use autocomplete function.

## API

```jsx
const dataSource = ['12345', '23456', '34567'];
<AutoComplete dataSource={dataSource} />
```


| Property           | Description                             |  Type | Default |
|----------------|----------------------------------|------------|--------|
| dataSource          | Data source for autocomplete | Array     |      |
| value    | selcted option | String/Array<String>/{key: String, label: React.Node}/Array<{key, label}>   |  -  |
| defaultValue | Initial selected option. | string/Array<String>   |  -  |
| allowClear   | Show clear button, effective in multiple mode only. | boolean | false |
| onChange | Called when select an option or input value change, or value of input is changed in combobox mode | function(value, label) | - |
| disabled | Whether disabled select | boolean | false |
