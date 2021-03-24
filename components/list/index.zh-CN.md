---
category: Components
type: 数据展示
title: List
subtitle: 列表
cols: 1
cover: https://gw.alipayobjects.com/zos/alicdn/5FrZKStG_/List.svg
---

通用列表。

## 何时使用

最基础的列表展示，可承载文字、列表、图片、段落，常用于后台数据展示页面。

## API

另外我们封装了 [ProList](https://prolist.ant.design/)，在 `antd` List 之上扩展了更多便捷易用的功能，比如多选，展开等功能，使用体验贴近 Table，欢迎尝试使用。

### List

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| bordered | 是否展示边框 | boolean | false |  |
| dataSource | 列表数据源 | any\[] | - |  |
| footer | 列表底部 | ReactNode | - |  |
| grid | 列表栅格配置 | [object](#List-grid-props) | - |  |
| header | 列表头部 | ReactNode | - |  |
| itemLayout | 设置 `List.Item` 布局, 设置成 `vertical` 则竖直样式显示, 默认横排 | string | - |  |
| loading | 当卡片内容还在加载中时，可以用 `loading` 展示一个占位 | boolean \| [object](/components/spin/#API) ([更多](https://github.com/ant-design/ant-design/issues/8659)) | false |  |
| loadMore | 加载更多 | ReactNode | - |  |
| locale | 默认文案设置，目前包括空数据文案 | object | {emptyText: `暂无数据`} |  |
| pagination | 对应的 `pagination` 配置, 设置 false 不显示 | boolean \| object | false |  |
| renderItem | 当使用 dataSource 时，可以用 `renderItem` 自定义渲染列表项 | (item) => ReactNode | - |  |
| rowKey | 当 `renderItem` 自定义渲染列表项有效时，自定义每一行的 `key` 的获取方式 | ((item: T) => string) | `list-item-${index}` |  |
| size | list 的尺寸 | `default` \| `large` \| `small` | `default` |  |
| split | 是否展示分割线 | boolean | true |  |

### pagination

分页的配置项。

| 参数     | 说明               | 类型                        | 默认值   |
| -------- | ------------------ | --------------------------- | -------- |
| position | 指定分页显示的位置 | `top` \| `bottom` \| `both` | `bottom` |

更多配置项，请查看 [`Pagination`](/components/pagination/)。

### List grid props

| 参数   | 说明                 | 类型   | 默认值 | 版本 |
| ------ | -------------------- | ------ | ------ | ---- |
| column | 列数                 | number | -      |      |
| gutter | 栅格间隔             | number | 0      |      |
| xs     | `<576px` 展示的列数  | number | -      |      |
| sm     | `≥576px` 展示的列数  | number | -      |      |
| md     | `≥768px` 展示的列数  | number | -      |      |
| lg     | `≥992px` 展示的列数  | number | -      |      |
| xl     | `≥1200px` 展示的列数 | number | -      |      |
| xxl    | `≥1600px` 展示的列数 | number | -      |      |

### List.Item

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| actions | 列表操作组，根据 `itemLayout` 的不同, 位置在卡片底部或者最右侧 | Array&lt;ReactNode> | - |  |
| extra | 额外内容, 通常用在 `itemLayout` 为 `vertical` 的情况下, 展示右侧内容; `horizontal` 展示在列表元素最右侧 | ReactNode | - |  |

### List.Item.Meta

| 参数        | 说明               | 类型      | 默认值 | 版本 |
| ----------- | ------------------ | --------- | ------ | ---- |
| avatar      | 列表元素的图标     | ReactNode | -      |      |
| description | 列表元素的描述内容 | ReactNode | -      |      |
| title       | 列表元素的标题     | ReactNode | -      |      |
