---
category: Components
type: Data Entry
cols: 1
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
Since `AutoComplete` is based on `Select`, so besides the following API, `AutoComplete` has the same API as `Select`.

| Property           | Description                             |  Type | Default |
|----------------|----------------------------------|------------|--------|
| dataSource          | Data source for autocomplete | Array     |      |
| value    | selected option | String/Array<String>/{key: String, label: string\|ReactNode}/Array<{key, label}>   |  -  |
| defaultValue | Initial selected option. | String/Array<String>/{key: String, label: string\|ReactNode}/Array<{key, label}> |  -  |
| allowClear   | Show clear button, effective in multiple mode only. | boolean | false |
| onChange | Called when select an option or input value change, or value of input is changed | function(value, label) | - |
| onSelect | Called when a option is selected. param is option's value and option instance. | function(value, option) | -   |
| disabled | Whether disabled select | boolean | false |
| placeholder | placeholder of input | string | - |
