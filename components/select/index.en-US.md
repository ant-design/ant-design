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

| Property | Description | Type | Default | Version Added |
| --- | --- | --- | --- | --- |
| allowClear | Show clear button. | boolean | false | 3.0.0 |
| autoClearSearchValue | Whether the current search will be cleared on selecting an item. Only applies when `mode` is set to `multiple` or `tags`. | boolean | true | 3.10.0 |
| autoFocus | Get focus by default | boolean | false | 3.0.0 |
| defaultActiveFirstOption | Whether active first option by default | boolean | true | 3.0.0 |
| defaultValue | Initial selected option. | string\|string\[]<br />number\|number\[]<br />LabeledValue\|LabeledValue[] | - | 3.0.0 |
| disabled | Whether disabled select | boolean | false | 3.0.0 |
| dropdownClassName | className of dropdown menu | string | - | 3.0.0 |
| dropdownMatchSelectWidth | Whether dropdown's width is same with select. | boolean | true | 3.0.0 |
| dropdownRender | Customize dropdown content | (menuNode: ReactNode, props) => ReactNode | - | 3.11.0 |
| dropdownStyle | style of dropdown menu | object | - | 3.0.0 |
| filterOption | If true, filter options by input, if function, filter options against it. The function will receive two arguments, `inputValue` and `option`, if the function returns `true`, the option will be included in the filtered set; Otherwise, it will be excluded. | boolean or function(inputValue, option) | true | 3.0.0 |
| firstActiveValue | Value of action option by default | string\|string\[] | - | 3.0.0 |
| getPopupContainer | Parent Node which the selector should be rendered to. Default to `body`. When position issues happen, try to modify it into scrollable content and position it relative. [Example](https://codesandbox.io/s/4j168r7jw0) | function(triggerNode) | () => document.body | 3.0.0 |
| labelInValue | whether to embed label in value, turn the format of value from `string` to `{key: string, label: ReactNode}` | boolean | false | 3.0.0 |
| maxTagCount | Max tag count to show | number | - | 3.0.0 |
| maxTagTextLength | Max tag count to show | number | - | 3.18.0 |
| maxTagPlaceholder | Placeholder for not showing tags | ReactNode/function(omittedValues) | - | 3.0.0 |
| mode | Set mode of Select | 'default' \| 'multiple' \| 'tags' | 'default' | 3.0.0 |
| notFoundContent | Specify content to show when no result matches.. | string | 'Not Found' | 3.0.0 |
| optionFilterProp | Which prop value of option will be used for filter if filterOption is true | string | value | 3.0.0 |
| optionLabelProp | Which prop value of option will render as content of select. [Example](https://codesandbox.io/s/antd-reproduction-template-tk678) | string | `value` for `combobox`, `children` for other modes | 3.0.0 |
| placeholder | Placeholder of select | string\|ReactNode | - | 3.0.0 |
| showArrow | Whether to show the drop-down arrow | boolean | true | 3.2.1 |
| showSearch | Whether show search input in single mode. | boolean | false | 3.0.0 |
| size | Size of Select input. `default` `large` `small` | string | default | 3.0.0 |
| suffixIcon | The custom suffix icon | ReactNode | - | 3.10.0 |
| removeIcon | The custom remove icon | ReactNode | - | 3.11.0 |
| clearIcon | The custom clear icon | ReactNode | - | 3.11.0 |
| menuItemSelectedIcon | The custom menuItemSelected icon with multiple options | ReactNode | - | 3.11.0 |
| tokenSeparators | Separator used to tokenize on tag/multiple mode | string\[] |  | 3.0.0 |
| value | Current selected option. | string\|string\[]\<br />number\|number\[]\<br />LabeledValue\|LabeledValue[] | - | 3.0.0 |
| onBlur | Called when blur | function | - | 3.0.0 |
| onChange | Called when select an option or input value change, or value of input is changed in combobox mode | function(value, option:Option/Array&lt;Option>) | - | 3.0.0 |
| onDeselect | Called when a option is deselected, param is the selected option's value. Only called for multiple or tags, effective in multiple or tags mode only. | function(string\|number\|LabeledValue) | - | 3.0.0 |
| onFocus | Called when focus | function | - | 3.0.0 |
| onInputKeyDown | Called when key pressed | function | - | 3.1.0 |
| onMouseEnter | Called when mouse enter | function | - | 3.0.0 |
| onMouseLeave | Called when mouse leave | function | - | 3.0.0 |
| onPopupScroll | Called when dropdown scrolls | function | - | 3.0.0 |
| onSearch | Callback function that is fired when input changed. | function(value: string) |  | 3.0.0 |
| onSelect | Called when a option is selected, the params are option's value (or key) and option instance. | function(string\|number\|LabeledValue, option:Option) | - | 3.0.0 |
| defaultOpen | Initial open state of dropdown | boolean | - | 3.9.3 |
| open | Controlled open state of dropdown | boolean | - | 3.9.0 |
| onDropdownVisibleChange | Call when dropdown open (Supported after version 3.9.0) | function(open) | - | 3.9.0 |
| loading | indicate loading state | Boolean | false | 3.11.0 |

### Select Methods

| Name    | Description  | Version Added |
| ------- | ------------ | ------------- |
| blur()  | Remove focus | 3.0.0         |
| focus() | Get focus    | 3.0.0         |

### Option props

| Property | Description | Type | Default | Version Added |
| --- | --- | --- | --- | --- |
| disabled | Disable this option | boolean | false | 3.0.0 |
| key | Same usage as `value`. If React request you to set this property, you can set it to value of option, and then omit value property. | string |  | 3.0.0 |
| title | `title` of Select after select this Option | string | - | 3.0.0 |
| value | default to filter with this property | string\|number | - | 3.0.0 |
| className | additional class to option | string | - | 3.10.1 |

### OptGroup props

| Property | Description | Type                  | Default | Version Added |
| -------- | ----------- | --------------------- | ------- | ------------- |
| key      |             | string                | -       | 3.0.0         |
| label    | Group label | string\|React.Element | -       | 3.0.0         |
