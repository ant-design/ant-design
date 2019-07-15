---
category: Components
type: Data Entry
title: Select
---

Select component to select value from options.

## When To Use

- A dropdown menu for displaying choices - an elegant alternative to the native `<select>` element.
- Utilizing [Radio](/components/radio/) is recommended when there are fewer total options (less than 5).

## API

```html
<select>
  <option value="lucy">lucy</option>
</select>
```

### Select props

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| allowClear | Show clear button. | boolean | false |  |
| autoClearSearchValue | Whether the current search will be cleared on selecting an item. Only applies when `mode` is set to `multiple` or `tags`. | boolean | true | 3.10.0 |
| autoFocus | Get focus by default | boolean | false |  |
| defaultActiveFirstOption | Whether active first option by default | boolean | true |  |
| defaultValue | Initial selected option. | string\|string\[]<br />number\|number\[]<br />LabeledValue\|LabeledValue[] | - |  |
| disabled | Whether disabled select | boolean | false |  |
| dropdownClassName | className of dropdown menu | string | - |  |
| dropdownMatchSelectWidth | Whether dropdown's width is same with select. | boolean | true |  |
| dropdownRender | Customize dropdown content | (menuNode: ReactNode, props) => ReactNode | - | 3.11.0 |
| dropdownStyle | style of dropdown menu | object | - |  |
| filterOption | If true, filter options by input, if function, filter options against it. The function will receive two arguments, `inputValue` and `option`, if the function returns `true`, the option will be included in the filtered set; Otherwise, it will be excluded. | boolean or function(inputValue, option) | true |  |
| firstActiveValue | Value of action option by default | string\|string\[] | - |  |
| getPopupContainer | Parent Node which the selector should be rendered to. Default to `body`. When position issues happen, try to modify it into scrollable content and position it relative. [Example](https://codesandbox.io/s/4j168r7jw0) | function(triggerNode) | () => document.body |  |
| labelInValue | whether to embed label in value, turn the format of value from `string` to `{key: string, label: ReactNode}` | boolean | false |  |
| maxTagCount | Max tag count to show | number | - |  |
| maxTagTextLength | Max tag count to show | number | - | 3.18.0 |
| maxTagPlaceholder | Placeholder for not showing tags | ReactNode/function(omittedValues) | - |  |
| mode | Set mode of Select | 'default' \| 'multiple' \| 'tags' | 'default' |  |
| notFoundContent | Specify content to show when no result matches.. | string | 'Not Found' |  |
| optionFilterProp | Which prop value of option will be used for filter if filterOption is true | string | value |  |
| optionLabelProp | Which prop value of option will render as content of select. [Example](https://codesandbox.io/s/antd-reproduction-template-tk678) | string | `value` for `combobox`, `children` for other modes |  |
| placeholder | Placeholder of select | string\|ReactNode | - |  |
| showArrow | Whether to show the drop-down arrow | boolean | true | 3.2.1 |
| showSearch | Whether show search input in single mode. | boolean | false |  |
| size | Size of Select input. `default` `large` `small` | string | default |  |
| suffixIcon | The custom suffix icon | ReactNode | - | 3.10.0 |
| removeIcon | The custom remove icon | ReactNode | - | 3.11.0 |
| clearIcon | The custom clear icon | ReactNode | - | 3.11.0 |
| menuItemSelectedIcon | The custom menuItemSelected icon with multiple options | ReactNode | - | 3.11.0 |
| tokenSeparators | Separator used to tokenize on tag/multiple mode | string\[] |  |  |
| value | Current selected option. | string\|string\[]\<br />number\|number\[]\<br />LabeledValue\|LabeledValue[] | - |  |
| onBlur | Called when blur | function | - |  |
| onChange | Called when select an option or input value change, or value of input is changed in combobox mode | function(value, option:Option/Array&lt;Option>) | - |  |
| onDeselect | Called when a option is deselected, param is the selected option's value. Only called for multiple or tags, effective in multiple or tags mode only. | function(string\|number\|LabeledValue) | - |  |
| onFocus | Called when focus | function | - |  |
| onInputKeyDown | Called when key pressed | function | - | 3.1.0 |
| onMouseEnter | Called when mouse enter | function | - |  |
| onMouseLeave | Called when mouse leave | function | - |  |
| onPopupScroll | Called when dropdown scrolls | function | - |  |
| onSearch | Callback function that is fired when input changed. | function(value: string) |  |  |
| onSelect | Called when a option is selected, the params are option's value (or key) and option instance. | function(string\|number\|LabeledValue, option:Option) | - |  |
| defaultOpen | Initial open state of dropdown | boolean | - | 3.9.3 |
| open | Controlled open state of dropdown | boolean | - | 3.9.0 |
| onDropdownVisibleChange | Call when dropdown open (Supported after version 3.9.0) | function(open) | - | 3.9.0 |
| loading | indicate loading state | Boolean | false | 3.11.0 |

### Select Methods

| Name    | Description  | Version |
| ------- | ------------ | ------- |
| blur()  | Remove focus |         |
| focus() | Get focus    |         |

### Option props

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| disabled | Disable this option | boolean | false |  |
| key | Same usage as `value`. If React request you to set this property, you can set it to value of option, and then omit value property. | string |  |  |
| title | `title` of Select after select this Option | string | - |  |
| value | default to filter with this property | string\|number | - |  |
| className | additional class to option | string | - | 3.10.1 |

### OptGroup props

| Property | Description | Type                  | Default | Version |
| -------- | ----------- | --------------------- | ------- | ------- |
| key      |             | string                | -       |         |
| label    | Group label | string\|React.Element | -       |         |
