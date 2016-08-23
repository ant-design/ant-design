---
category: Components
type: Form Controls
title: Cascader
---

Cascade selection box.


## When to use

- When you need to select from a set of associated data set. Such as province/city/district, company level, things classification.
- When selecting from a large data set, with multi-stage classification separated for easy selection.
- chooses cascade items in one float layer for better user experience.

## API

```html
<Cascader options={options} onChange={onChange} />
```

| Property | Description | Type | Default |
|------|------|------|--------|
| options | data options of cascade | object | - |
| defaultValue | initial selected value | array  |[] |
| value | selected value | array  | - |
| onChange | callback when finishing cascader select | `function(value, selectedOptions)` | - |
| displayRender | render function of displaying selected options | `function(label, selectedOptions)` | `label => label.join(' / ')` |
| style | additional style | string | - |
| className | additional css class | string | - |
| popupClassName | additional className of popup overlay | string | - |
| popupPlacement | use preset popup align config from builtinPlacements：`bottomLeft` `bottomRight` `topLeft` `topRight` | string | `bottomLeft` |
| placeholder | input placeholder | string | 'Please select' |
| size | input size, one of `large` `default` `small` | string | `default` |
| disabled | whether disabled select | boolean | false |
| allowClear | whether allow clear | boolean | true |
| expandTrigger | expand current item when click or hover, one of 'click' 'hover' | string | 'click' |
| changeOnSelect | change value on each selection if set to true, see above demo for details | boolean | false |
| showSearch | Whether show search input in single mode. | Boolean | false |
| notFoundContent | Specify content to show when no result matches. | String | 'Not Found' |
| filterOption | The function will receive two arguments, inputValue and option, if the function returns true, the option will be included in the filtered set; Otherwise, it will be excluded. | `function(inputValue, path): boolean` | |
| renderFilteredOption | Used to render filtered options. | `function(inputValue, path): React.ReactNode` | |
| sortFilteredOption | Used to sort filtered options. | `function(a, b, inputValue)` | |
| searchResultListWidth | To set the width of search result list, the default value is equal to input's | number | |

