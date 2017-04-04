---
category: Components
type: Data Entry
title: Cascader
---

Cascade selection box.


## When To Use

- When you need to select from a set of associated data set. Such as province/city/district, company level, things classification.
- When selecting from a large data set, with multi-stage classification separated for easy selection.
- Chooses cascade items in one float layer for better user experience.

## API

```html
<Cascader options={options} onChange={onChange} />
```

| Property | Description | Type | Default |
|------|------|------|--------|
| options | data options of cascade | object | - |
| defaultValue | initial selected value | [CascaderOptionType](https://git.io/vMMoK)[]  |[] |
| value | selected value | [CascaderOptionType](https://git.io/vMMoK)[] | - |
| onChange | callback when finishing cascader select | `(value, selectedOptions) => void` | - |
| displayRender | render function of displaying selected options | `(label, selectedOptions) => ReactNode` | `label => label.join(' / ')` |
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
| showSearch | Whether show search input in single mode. | boolean\|object | false |
| notFoundContent | Specify content to show when no result matches. | string | 'Not Found' |
| loadData  | To load option lazily, and it cannot work with `showSearch` | `(selectedOptions) => void`  | - |
| getPopupContainer | Parent Node which the selector should be rendered to. Default to `body`. When position issues happen, try to modify it into scrollable content and position it relative.[example](http://codepen.io/anon/pen/xVBOVQ?editors=001) | Function(triggerNode) | () => document.body |

Fields in `showSearch`:

| Property | Description | Type | Default |
|----------|-------------|------|---------|
| filter | The function will receive two arguments, inputValue and option, if the function returns true, the option will be included in the filtered set; Otherwise, it will be excluded. | `function(inputValue, path): boolean` | |
| render | Used to render filtered options. | `function(inputValue, path): ReactNode` | |
| sort | Used to sort filtered options. | `function(a, b, inputValue)` | |
| matchInputWidth | Whether the width of result list equals to input's | boolean | |

<style>
.ant-cascader-picker {
  width: 220px;
}
</style>
