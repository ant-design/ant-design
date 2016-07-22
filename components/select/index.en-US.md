---
category: Components
type: Form Controls
title: Select
---

A Selector similar to Select2.

## When to use

A dropdown menu for choosing, an elegant alternative to the native select component.

```html
<Select>
  <Option value="lucy">lucy</Option>
</Select>
```

## API

### Select props

| Property     | Description           | Type     | Default       |
|----------|----------------|----------|--------------|
| value    | Current selected option. | string/Array<String>   |  -  |
| defaultValue | Initial selected option. | string/Array<String>   |  -  |
| multiple   | Allow multiple select. | boolean | false |
| allowClear   | Show clear button, effective in multiple mode only. | boolean | false |
| filterOption | If true, filter options by input, if function, filter options agianst it. The function will receive two arguments, `inputValue` and `option`, if the function returns `true`, the option will be included in the filtered set; Otherwise, it will be excluded. | boolean or function(inputValue, option) | true     |
| tags | When tagging is enabled the user can select from pre-existing options or create a new tag by picking the first choice, which is what the user has typed into the search box so far. | boolean |false |
| onSelect | Called when a option is selected. param is option's value and option instance. | function(value, option) | -   |
| onDeselect | Called when a option is deselected. param is option's value. only called for multiple or tags, effective in multiple or tags mode only. |  function(value) | -   |
| onChange | Called when select an option or input value change, or value of input is changed in combobox mode | function(value, label) | - |
| onSearch | Callback function that is fired when input changed. | function(value: String) |  |
| placeholder | Placeholder of select | string | - |
| notFoundContent | Specify content to show when no result matches..| string | 'Not Found' |
| dropdownMatchSelectWidth | Whether dropdown's with is same with select. | boolean | true |
| optionFilterProp | Which prop value of option will be used for filter if filterOption is true | string | value |
| optionLabelProp | Which prop value of option will render as content of select. | string | `children` |
| combobox | Enable combobox mode(can not set multiple at the same time). | boolean | false |
| size    | Size of Select input. `large` `small`  | String      |      default      |
| showSearch | Whether show search input in single mode.| boolean | false |
| disabled | Whether disabled select | boolean | false |
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
