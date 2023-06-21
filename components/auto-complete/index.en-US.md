---
category: Components
title: AutoComplete
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*g8THS4NpV6sAAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*WERTQ6qvgEYAAAAAAAAAAAAADrJ8AQ/original
group:
  title: Data Entry
  order: 4
demo:
  cols: 2
---

Autocomplete function of input field.

## When To Use

- When you need an input box instead of a selector.
- When you need input suggestions or helping text.

The differences with Select are:

- AutoComplete is an input box with text hints, and users can type freely. The keyword is aiding **input**.
- Select is selecting among given choices. The keyword is **select**.

## Examples

<!-- prettier-ignore -->
<code src="./demo/basic.tsx">Basic Usage</code>
<code src="./demo/options.tsx">Customized</code>
<code src="./demo/custom.tsx">Customize Input Component</code>
<code src="./demo/non-case-sensitive.tsx">Non-case-sensitive AutoComplete</code>
<code src="./demo/certain-category.tsx">Lookup-Patterns - Certain Category</code>
<code src="./demo/uncertain-category.tsx">Lookup-Patterns - Uncertain Category</code>
<code src="./demo/status.tsx">Status</code>
<code src="./demo/borderless.tsx">Borderless</code>
<code src="./demo/form-debug.tsx" debug>Debug in Form</code>
<code src="./demo/render-panel.tsx" debug>_InternalPanelDoNotUseOrYouWillBeFired</code>

## API

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| allowClear | Show clear button | boolean | false |  |
| autoFocus | If get focus when component mounted | boolean | false |  |
| backfill | If backfill selected item the input when using keyboard | boolean | false |  |
| bordered | Whether has border style | boolean | true |  |
| children (for customize input element) | Customize input element | HTMLInputElement \| HTMLTextAreaElement \| React.ReactElement&lt;InputProps> | &lt;Input /> |  |
| children (for dataSource) | Data source to auto complete | React.ReactElement&lt;OptionProps> \| Array&lt;React.ReactElement&lt;OptionProps>> | - |  |
| defaultActiveFirstOption | Whether active first option by default | boolean | true |  |
| defaultOpen | Initial open state of dropdown | boolean | - |  |
| defaultValue | Initial selected option | string | - |  |
| disabled | Whether disabled select | boolean | false |  |
| popupClassName | The className of dropdown menu | string | - | 4.23.0 |
| dropdownMatchSelectWidth | Determine whether the dropdown menu and the select input are the same width. Default set `min-width` same as input. Will ignore when value less than select width. `false` will disable virtual scroll | boolean \| number | true |  |
| filterOption | If true, filter options by input, if function, filter options against it. The function will receive two arguments, `inputValue` and `option`, if the function returns true, the option will be included in the filtered set; Otherwise, it will be excluded | boolean \| function(inputValue, option) | true |  |
| notFoundContent | Specify content to show when no result matches | string | `Not Found` |  |
| open | Controlled open state of dropdown | boolean | - |  |
| options | Select options. Will get better perf than jsx definition | { label, value }\[] | - |  |
| placeholder | The placeholder of input | string | - |  |
| status | Set validation status | 'error' \| 'warning' | - | 4.19.0 |
| value | Selected option | string | - |  |
| onBlur | Called when leaving the component | function() | - |  |
| onChange | Called when selecting an option or changing an input value | function(value) | - |  |
| onDropdownVisibleChange | Call when dropdown open | function(open) | - |  |
| onFocus | Called when entering the component | function() | - |  |
| onSearch | Called when searching items | function(value) | - |  |
| onSelect | Called when a option is selected. param is option's value and option instance | function(value, option) | - |  |
| onClear | Called when clear | function | - | 4.6.0 |

## Methods

| Name    | Description  | Version |
| ------- | ------------ | ------- |
| blur()  | Remove focus |         |
| focus() | Get focus    |         |

## Design Token

<ComponentTokenTable component="Select"></ComponentTokenTable>

## FAQ

### Why doesn't the text composition system work well with onSearch in controlled mode?

Please use `onChange` to manage control state. `onSearch` is used for searching input which is not the same as `onChange`. Besides, clicking on the option will not trigger the `onSearch` event.

Related issue: [#18230](https://github.com/ant-design/ant-design/issues/18230) [#17916](https://github.com/ant-design/ant-design/issues/17916)
