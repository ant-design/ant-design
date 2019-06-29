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
| bordered | 是否展示边框 | boolean | false | 3.0.0 |
| footer | 列表底部 | string\|ReactNode | - | 3.0.0 |
| grid | 列表栅格配置 | object | - | 3.0.0 |
| header | 列表头部 | string\|ReactNode | - | 3.0.0 |
| itemLayout | 设置 `List.Item` 布局, 设置成 `vertical` 则竖直样式显示, 默认横排 | string | - | 3.0.0 |
| loading | 当卡片内容还在加载中时，可以用 `loading` 展示一个占位 | boolean\|[object](https://ant.design/components/spin-cn/#API) ([更多](https://github.com/ant-design/ant-design/issues/8659)) | false | 3.0.0 |
| loadMore | 加载更多 | string\|ReactNode | - | 3.0.0 |
| locale | 默认文案设置，目前包括空数据文案 | object | emptyText: '暂无数据' | 3.4.2 |
| pagination | 对应的 `pagination` 配置, 设置 `false` 不显示 | boolean\|object | false | 3.0.0 |
| size | list 的尺寸 | `default` \| `middle` \| `small` | `default` | 3.0.0 |
| split | 是否展示分割线 | boolean | true | 3.0.0 |
| dataSource | 列表数据源 | any[] | - | 3.20.1 |
| renderItem | 当使用 dataSource 时，可以用 `renderItem` 自定义渲染列表项 | `item => ReactNode` | - | 3.20.1 |

### pagination

分页的配置项。

| 参数     | 说明               | 类型                        | 默认值   |
| -------- | ------------------ | --------------------------- | -------- |
| position | 指定分页显示的位置 | 'top' \| 'bottom' \| 'both' | 'bottom' | 3.6.0 |

更多配置项，请查看 [`Pagination`](/components/pagination/)。

### List grid props

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| column | 列数，[可选值](https://github.com/ant-design/ant-design/blob/a7f17b4cdebbca07b3b9ce5698de61e772d46237/components/list/index.tsx#L16) | number | - | 3.0.0 |
| gutter | 栅格间隔 | number | 0 | 3.0.0 |
| xs | `<576px` 展示的列数 | number | - | 3.0.0 |
| sm | `≥576px` 展示的列数 | number | - | 3.0.0 |
| md | `≥768px` 展示的列数 | number | - | 3.0.0 |
| lg | `≥992px` 展示的列数 | number | - | 3.0.0 |
| xl | `≥1200px` 展示的列数 | number | - | 3.0.0 |
| xxl | `≥1600px` 展示的列数 | number | - | 3.0.0 |

### List.Item

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| actions | 列表操作组，根据 `itemLayout` 的不同, 位置在卡片底部或者最右侧 | Array&lt;ReactNode> | - | 3.0.0 |
| extra | 额外内容, 通常用在 `itemLayout` 为 `vertical` 的情况下, 展示右侧内容; `horizontal` 展示在列表元素最右侧 | string\|ReactNode | - | 3.0.0 |

### List.Item.Meta

| 参数        | 说明               | 类型              | 默认值 | 版本  |
| ----------- | ------------------ | ----------------- | ------ | ----- |
| avatar      | 列表元素的图标     | ReactNode         | -      | 3.0.0 |
| description | 列表元素的描述内容 | string\|ReactNode | -      | 3.0.0 |
| title       | 列表元素的标题     | string\|ReactNode | -      | 3.0.0 |
