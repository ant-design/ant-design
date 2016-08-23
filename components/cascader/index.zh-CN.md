---
category: Components
type: Form Controls
title: Cascader
subtitle: 级联选择
---

级联选择框。


## 何时使用

- 需要从一组相关联的数据集合进行选择，例如省市区，公司层级，事物分类等。
- 从一个较大的数据集合中进行选择时，用多级分类进行分隔，方便选择。
- 比起 Select 组件，可以在同一个浮层中完成选择，有较好的体验。

## API

```html
<Cascader options={options} onChange={onChange} />
```

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| options | 可选项数据源 | Object | - |
| defaultValue | 默认的选中项 | Array  |[] |
| value | 指定选中项 | Array  | - |
| onChange | 选择完成后的回调 | `function(value, selectedOptions)` | - |
| displayRender | 选择后展示的渲染函数 | `function(label, selectedOptions)` | `label => label.join(' / ')` |
| style | 自定义样式 | String | - |
| className | 自定义类名 | String | - |
| popupClassName | 自定义浮层类名 | String | - |
| popupPlacement | 浮层预设位置：`bottomLeft` `bottomRight` `topLeft` `topRight` | Enum | `bottomLeft` |
| placeholder | 输入框占位文本 | String | '请选择' |
| size | 输入框大小，可选 `large` `default` `small` | String | `default` |
| disabled | 禁用 | Boolean | false |
| allowClear | 是否支持清除 | Boolean | true |
| expandTrigger | 次级菜单的展开方式，可选 'click' 和 'hover' | String | 'click' |
| changeOnSelect | 当此项为 true 时，点选每级菜单选项值都会发生变化，具体见上面的演示 | Boolean | false |
| showSearch | 在选择框中显示搜索框 | Boolean | false |
| notFoundContent | 当下拉列表为空时显示的内容 | String | 'Not Found' |
| filterOption | 接收 `inputValue` `path` 两个参数，当 `path` 符合筛选条件时，应返回 true，反之则返回 false。 | `function(inputValue, path): boolean` | |
| renderFilteredOption | 用于渲染 filter 后的选项 | `function(inputValue, path): React.ReactNode` | |
| sortFilteredOption | 用于排序 filter 后的选项 | `function(a, b, inputValue)` | |
| searchResultListWidth | 用于设置搜索结果列表的宽度，默认与输入框同宽 | number | |
