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

```jsx
<Cascader options={options} onChange={onChange} />
```

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| allowClear | whether allow clear | boolean | true | 3.0.0 |
| autoFocus | get focus when component mounted | boolean | false | 3.0.0 |
| changeOnSelect | change value on each selection if set to true, see above demo for details | boolean | false | 3.0.0 |
| className | additional css class | string | - | 3.0.0 |
| defaultValue | initial selected value | string\[] | \[] | 3.0.0 |
| disabled | whether disabled select | boolean | false | 3.0.0 |
| displayRender | render function of displaying selected options | `(label, selectedOptions) => ReactNode` | `label => label.join(' / ')` | 3.0.0 |
| expandTrigger | expand current item when click or hover, one of 'click' 'hover' | string | 'click' | 3.0.0 |
| fieldNames | custom field name for label and value and children (before 3.7.0 it calls `filedNames` which is typo）) | object | `{ label: 'label', value: 'value', children: 'children' }` | 3.7.0 |
| getPopupContainer | Parent Node which the selector should be rendered to. Default to `body`. When position issues happen, try to modify it into scrollable content and position it relative.[example](https://codepen.io/afc163/pen/zEjNOy?editors=0010) | Function(triggerNode) | () => document.body | 3.0.0 |
| loadData | To load option lazily, and it cannot work with `showSearch` | `(selectedOptions) => void` | - | 3.0.0 |
| notFoundContent | Specify content to show when no result matches. | string | 'Not Found' | 3.0.0 |
| options | data options of cascade | [Option](#Option)[] | - | 3.0.0 |
| placeholder | input placeholder | string | 'Please select' | 3.0.0 |
| popupClassName | additional className of popup overlay | string | - | 3.0.0 |
| popupPlacement | use preset popup align config from builtinPlacements：`bottomLeft` `bottomRight` `topLeft` `topRight` | string | `bottomLeft` | 3.0.0 |
| popupVisible | set visible of cascader popup | boolean | - | 3.0.0 |
| showSearch | Whether show search input in single mode. | boolean\|object | false | 3.0.0 |
| size | input size, one of `large` `default` `small` | string | `default` | 3.0.0 |
| style | additional style | string | - | 3.0.0 |
| suffixIcon | The custom suffix icon | ReactNode | - | 3.10.0 |
| value | selected value | string\[] | - | 3.0.0 |
| onChange | callback when finishing cascader select | `(value, selectedOptions) => void` | - | 3.0.0 |
| onPopupVisibleChange | callback when popup shown or hidden | `(value) => void` | - | 3.0.0 |

Fields in `showSearch`:

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| filter | The function will receive two arguments, inputValue and option, if the function returns true, the option will be included in the filtered set; Otherwise, it will be excluded. | `function(inputValue, path): boolean` |  | 3.0.0 |
| limit | Set the count of filtered items | number \| false | 50 | 3.11.0 |
| matchInputWidth | Whether the width of result list equals to input's | boolean |  | 3.0.0 |
| render | Used to render filtered options. | `function(inputValue, path): ReactNode` |  | 3.0.0 |
| sort | Used to sort filtered options. | `function(a, b, inputValue)` |  | 3.0.0 |

### Option

```typescript
interface Option {
  value: string;
  label?: React.ReactNode;
  disabled?: boolean;
  children?: Option[];
}
```

## Methods

| Name    | Description  | Version |
| ------- | ------------ | ------- |
| blur()  | remove focus | 3.0.0   |
| focus() | get focus    | 3.0.0   |

<style>
.ant-cascader-picker {
  width: 300px;
}
</style>
