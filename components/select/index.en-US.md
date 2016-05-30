---
category: Components
type: Form Control
title: Select
---

A Selector similar to Select2.

## When to use

Select provides a dropdown menu for choosen, for replacing origin selector, or demanding of a elegent one.

```html
<Select>
  <Option value="lucy">lucy</Option>
</Select>
```

## API

### Select props

| Property     | Description           | Type     | Default       |
|----------|----------------|----------|--------------|
| value    | The value that is currently selected. | string/Array<String>   |  -  |
| defaultValue | The value that is defaultly selcted. | string/Array<String>   |  -  |
| multiple   | Allow multiple select. | boolean | false |
| allowClear   | Show clear button, effective in multiple mode only. | boolean | false |
| filterOption | If true, filter options with input, if function, filter options agianst it. The function will receive two arguments, `inputValue` and `option`, if the function returns `true`, the option will be included in the filtered set; Otherwise, it will be excluded. | boolean or function(inputValue, option) | true     |
| tags | Make whatever you input into tag. | boolean |false |
| onSelect | Callback function that is fired when a option is selected, with an argument of selected value. | function(value, option) | -   |
| onDeselect | Callback function that is fire when clear selected value, with an argumnet of selected value, effective in multiple or tags mode only. |  function(value) | -   |
| onChange | Callback function that is fired when a option is selected, or value of input is changed in combobox mode | function(value, label) | - |
| onSearch | Callback function that is fired when the value of input field is changed. | function(value: String) |  |
| placeholder | Placeholder of select | string | - |
| notFoundContent | Content to display when options empty.| string | 'Not Found' |
| dropdownMatchSelectWidth | With of dropdown will equals the Select. | boolean | true |
| optionFilterProp | property of Option when filtering，if seted to `children`, then search its content | string | value |
| optionLabelProp | property of Option when backfilling selected item to selector input. Default to children of Option. | string | `children` |
| combobox | Active autocomplete mode of Select. | boolean | false |
| size    | Size of Select input. `large` `small`  | String      |      default      |
| showSearch | Display search input in select.| boolean | false |
| disabled | Disables the select | boolean | false |
| getPopupContainer | Parent Node which the selector should be renderd to. Default to `body`. When position issues happen, try to modify it into scrollable content and position it relative.[example](http://codepen.io/anon/pen/xVBOVQ?editors=001) | Function(triggerNode) | () => document.body |

### Option props

| Property     | Description         | Type    | Default       |
|----------|----------------|----------|--------------|
| disabled    | Disable this option | Boolean   |  false  |
| key   | if react request you to set this property, you can set it to value of option, and then ignore value property. |  String |  |
| value   | default to filter with this propery | String | - |

### OptGroup props

| Property     | Description           | Type     | Default          |
|----------|----------------|----------|-----------------|
| label    | Group label           | String/React.Element | -  |
| key      |                |  String  | -               |