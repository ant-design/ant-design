---
category: Components
type: Data Entry
title: Cascader
cover: https://gw.alipayobjects.com/zos/alicdn/UdS8y8xyZ/Cascader.svg
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
| allowClear | Whether allow clear | boolean | true |  |
| autoFocus | If get focus when component mounted | boolean | false |  |
| bordered | Whether has border style | boolean | true |  |
| clearIcon | The custom clear icon | ReactNode | - |  |
| changeOnSelect | (Work on single select) Change value on each selection if set to true, see above demo for details | boolean | false |  |
| className | The additional css class | string | - |  |
| defaultOpen | Initial visible of cascader popup | boolean | - |  |
| defaultValue | Initial selected value | string\[] \| number\[] | \[] |  |
| disabled | Whether disabled select | boolean | false |  |
| displayRender | The render function of displaying selected options | (label, selectedOptions) => ReactNode | label => label.join(`/`) | `multiple`: 4.18.0 |
| popupClassName | The additional className of popup overlay | string | - | 4.23.0 |
| dropdownRender | Customize dropdown content | (menus: ReactNode) => ReactNode | - | 4.4.0 |
| expandIcon | Customize the current item expand icon | ReactNode | - | 4.4.0 |
| expandTrigger | expand current item when click or hover, one of `click` `hover` | string | `click` |  |
| fieldNames | Custom field name for label and value and children | object | { label: `label`, value: `value`, children: `children` } |  |
| getPopupContainer | Parent Node which the selector should be rendered to. Default to `body`. When position issues happen, try to modify it into scrollable content and position it relative. [example](https://codepen.io/afc163/pen/zEjNOy?editors=0010) | function(triggerNode) | () => document.body |  |
| loadData | To load option lazily, and it cannot work with `showSearch` | (selectedOptions) => void | - |  |
| maxTagCount | Max tag count to show. `responsive` will cost render performance | number \| `responsive` | - | 4.17.0 |
| maxTagPlaceholder | Placeholder for not showing tags | ReactNode \| function(omittedValues) | - | 4.17.0 |
| notFoundContent | Specify content to show when no result matches | string | `Not Found` |  |
| open | Set visible of cascader popup | boolean | - | 4.17.0 |
| options | The data options of cascade | [Option](#Option)\[] | - |  |
| placeholder | The input placeholder | string | `Please select` |  |
| placement | Use preset popup align config from builtinPlacements | `bottomLeft` `bottomRight` `topLeft` `topRight` | `bottomLeft` | 4.17.0 |
| showSearch | Whether show search input in single mode | boolean \| [Object](#showSearch) | false |  |
| size | The input size | `large` \| `middle` \| `small` | - |  |
| status | Set validation status | 'error' \| 'warning' | - | 4.19.0 |
| style | The additional style | CSSProperties | - |  |
| suffixIcon | The custom suffix icon | ReactNode | - |  |
| value | The selected value | string\[] \| number\[] | - |  |
| onChange | Callback when finishing cascader select | (value, selectedOptions) => void | - |  |
| onDropdownVisibleChange | Callback when popup shown or hidden | (value) => void | - | 4.17.0 |
| multiple | Support multiple or not | boolean | - | 4.17.0 |
| showCheckedStrategy | The way show selected item in box. ** `SHOW_CHILD`: ** just show child treeNode. **`Cascader.SHOW_PARENT`:** just show parent treeNode (when all child treeNode under the parent treeNode are checked) | `Cascader.SHOW_PARENT` \| `Cascader.SHOW_CHILD` | `Cascader.SHOW_PARENT` | 4.20.0 |
| removeIcon | The custom remove icon | ReactNode | - |  |
| searchValue | Set search value，Need work with `showSearch` | string | - | 4.17.0 |
| onSearch | The callback function triggered when input changed | (search: string) => void | - | 4.17.0 |
| dropdownMenuColumnStyle | The style of the drop-down menu column | CSSProperties | - |  |
| loadingIcon | The apparence of lazy loading (now is useless) | ReactNode | - |  |

### showSearch

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| filter | The function will receive two arguments, inputValue and option, if the function returns true, the option will be included in the filtered set; Otherwise, it will be excluded | function(inputValue, path): boolean | - |  |
| limit | Set the count of filtered items | number \| false | 50 |  |
| matchInputWidth | Whether the width of list matches input, ([how it looks](https://github.com/ant-design/ant-design/issues/25779)) | boolean | true |  |
| render | Used to render filtered options | function(inputValue, path): ReactNode | - |  |
| sort | Used to sort filtered options | function(a, b, inputValue) | - |  |

### Option

```typescript
interface Option {
  value: string | number;
  label?: React.ReactNode;
  disabled?: boolean;
  children?: Option[];
  // Determines if this is a leaf node(effective when `loadData` is specified).
  // `false` will force trade TreeNode as a parent node.
  // Show expand icon even if the current node has no children.
  isLeaf?: boolean;
}
```

## Methods

| Name    | Description  | Version |
| ------- | ------------ | ------- |
| blur()  | Remove focus |         |
| focus() | Get focus    |         |
