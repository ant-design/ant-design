---
category: Components
type: Data Display
title: List 
subtitle: 列表
cols: 1
---

通用列表。

## 何时使用

最基础的列表展示，可承载文字、列表、图片、段落，常用于后台数据展示页面。

## API

### List

| 参数     | 说明           | 类型     | 默认值       |
|----------|----------------|----------|--------------|
| bordered | 是否展示边框 | boolean   |  false  |
| loading | 当卡片内容还在加载中时，可以用 loading 展示一个占位 | boolean   |  false  |
| itemLayout | 设置 List.Item 布局, 设置成 vertical 则竖直样式显示, 默认横排 | string | - |
| showLoadMore    | 是否显示加载更多按钮 | boolean   |  false  |
| loadingMore  | 是否显示加载更多按钮的 loading 状态 | boolean   |  false  |
| onMoreClick    | 点击 more 按钮的回调 | function   | - |
| pagination | 对应的 pagination 配置, 设置 false 不显示 | boolean \| object   |  false  |
| grid | 列表栅格 | object   |  -  |

### List grid props
| 参数     | 说明           | 类型     | 默认值       |
---------|-------------|------|---------
| gutter | 栅格间隔 | number | 0 |
| column | 列数 | number | - |
| xs | `<768px` 展示的列数 | number   |  -  |
| sm | `≥768px` 展示的列数  | number   |  -  |
| md | `≥992px` 展示的列数  | number   |  -  |
| lg | `≥1200px` 展示的列数  | number   |  -  |
| xl | `≥1600px` 展示的列数  | number   |  -  |

### List.Item

| 参数     | 说明           | 类型     | 默认值       |
---------|-------------|------|---------
| extra | 额外内容, 通常用在 itemLayout 为 vertical 的情况下, 展示右侧内容; horizontal 展示在列表元素最右侧 | string\|ReactNode |  -  |
| actions | 列表操作组，根据 itemLayout 的不同, 位置在卡片底部或者最右侧 | Array<ReactNode> |  -  |

### List.Item.Meta

| 参数     | 说明           | 类型     | 默认值       |
---------|-------------|------|---------
| avatar | 列表元素的图标 | ReactNode |  -  |
| title | 列表元素的标题 | string\|ReactNode |  -  |
| description | 列表元素的描述内容 | string\|ReactNode |  -  |
