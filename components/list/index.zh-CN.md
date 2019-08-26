---
category: Components
type: 数据展示
title: List
subtitle: 列表
cols: 1
---

通用列表。

## 何时使用

最基础的列表展示，可承载文字、列表、图片、段落，常用于后台数据展示页面。

## API

### List

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| bordered | 是否展示边框 | boolean | false |  |
| footer | 列表底部 | string\|ReactNode | - |  |
| grid | 列表栅格配置 | object | - |  |
| header | 列表头部 | string\|ReactNode | - |  |
| headerExtra | 列表头部下方的附加区域 | string\|ReactNode | - | FIXME |
| itemLayout | 设置 `List.Item` 布局, 设置成 `vertical` 则竖直样式显示, 默认横排 | string | - |  |
| loading | 当卡片内容还在加载中时，可以用 `loading` 展示一个占位 | boolean\|[object](https://ant.design/components/spin-cn/#API) ([更多](https://github.com/ant-design/ant-design/issues/8659)) | false |  |
| loadMore | 加载更多 | string\|ReactNode | - |  |
| locale | 默认文案设置，目前包括空数据文案 | object | emptyText: '暂无数据' | 3.4.2 |
| pagination | 对应的 `pagination` 配置, 设置 `false` 不显示 | boolean\|object | false |  |
| size | list 的尺寸 | `default` \| `middle` \| `small` | `default` |  |
| split | 是否展示分割线 | boolean | true |  |
| dataSource | 列表数据源 | any[] | - | 3.20.1 |
| renderItem | 当使用 dataSource 时，可以用 `renderItem` 自定义渲染列表项 | `item => ReactNode` | - | 3.20.1 |
| defaultExpandAllItems | 初始时，是否展开所有列表项 | boolean | false | FIXME |
| defaultExpandedItemKeys | 默认展开的列表项 | string\[] | - | FIXME |
| expandedItemKeys | 展开的列表项，控制属性 | string\[] | - | FIXME |
| expandedItemRender | 列表项额外的展开内容 | Function(item, index, indent, expanded):ReactNode | - | FIXME |
| expandIcon | 自定义展开图标 | Function(props):ReactNode | - | FIXME |
| expandItemByClick | 通过点击来展开列表项 | boolean | `false` | FIXME |
| onExpand | 点击展开图标时触发 | Function(expanded, item) |  | FIXME |
| onExpandedItemsChange | 展开的列表项变化时触发 | Function(expandedItems) |  | FIXME |
| onExpandedItemsChange | 展开的列表项变化时触发 | Function(expandedItems) |  | FIXME |
| itemSelection | 列表项是否可选择，[配置项](#itemSelection) | object | null | FIXME |

### itemSelection

选择功能的配置。

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| getCheckboxProps | 选择框的默认属性配置 | Function(item) | - | FIXME |
| hideDefaultSelections | 自定义选择项时去掉『全选』『反选』两个默认选项 | boolean | false | FIXME |
| selectedItemKeys | 指定选中项的 key 数组，需要和 onChange 进行配合 | string\[]\|number[] | \[] | FIXME |
| selections | 自定义选择项 [配置项](#selection), 设为 `true` 时使用默认选择项 | object\[]\|boolean | true | FIXME |
| type | 多选/单选，`checkbox` or `radio` | string | `checkbox` | FIXME |
| onChange | 选中项发生变化时的回调 | Function(selectedItemKeys, selectedItems) | - | FIXME |
| onSelect | 用户手动选择/取消选择某项的回调 | Function(record, selected, selectedItems, nativeEvent) | - | FIXME |
| onSelectAll | 用户手动选择/取消选择所有项的回调 | Function(selected, selectedItems, changeItems) | - | FIXME |
| onSelectInvert | 用户手动选择反选的回调 | Function(selectedItems) | - | FIXME |

### selection

| 参数     | 说明                       | 类型                         | 默认值 | 版本 |
| -------- | -------------------------- | ---------------------------- | ------ | ---- |
| key      | React 需要的 key，建议设置 | string                       | -      |      |
| text     | 选择项显示的文字           | string\|React.ReactNode      | -      |      |
| onSelect | 选择项点击回调             | Function(changeableItemKeys) | -      |      |

### pagination

分页的配置项。

| 参数     | 说明               | 类型                        | 默认值   |
| -------- | ------------------ | --------------------------- | -------- |
| position | 指定分页显示的位置 | 'top' \| 'bottom' \| 'both' | 'bottom' | 3.6.0 |

更多配置项，请查看 [`Pagination`](/components/pagination/)。

### List grid props

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| column | 列数，[可选值](https://github.com/ant-design/ant-design/blob/a7f17b4cdebbca07b3b9ce5698de61e772d46237/components/list/index.tsx#L16) | number | - |  |
| gutter | 栅格间隔 | number | 0 |  |
| xs | `<576px` 展示的列数 | number | - |  |
| sm | `≥576px` 展示的列数 | number | - |  |
| md | `≥768px` 展示的列数 | number | - |  |
| lg | `≥992px` 展示的列数 | number | - |  |
| xl | `≥1200px` 展示的列数 | number | - |  |
| xxl | `≥1600px` 展示的列数 | number | - |  |

### List.Item

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| actions | 列表操作组，根据 `itemLayout` 的不同, 位置在卡片底部或者最右侧 | Array&lt;ReactNode> | - |  |
| extra | 额外内容, 通常用在 `itemLayout` 为 `vertical` 的情况下, 展示右侧内容; `horizontal` 展示在列表元素最右侧 | string\|ReactNode | - |  |

### List.Item.Meta

| 参数        | 说明               | 类型              | 默认值 | 版本 |
| ----------- | ------------------ | ----------------- | ------ | ---- |
| avatar      | 列表元素的图标     | ReactNode         | -      |      |
| description | 列表元素的描述内容 | string\|ReactNode | -      |      |
| title       | 列表元素的标题     | string\|ReactNode | -      |      |
