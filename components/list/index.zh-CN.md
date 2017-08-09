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
| bordered | 展示边框, 设置 dashed 可展示对应类型 | string \| boolean   |  false  |
| loading | 当卡片内容还在加载中时，可以用 loading 展示一个占位 | boolean   |  false  |
| layout | 布局, 设置 vertical 则显示竖直类型展示列表, 默认为横向 | string |  -  |
| showLoadMore    | 是否显示加载更多按钮 | boolean   |  false  |
| loadingMore  | 是否显示加载更多按钮的 loading 状态 | boolean   |  false  |
| onMoreClick    | 点击 more 按钮的回掉 | function   | - |
| pagination | 对应的 pagination 配置, 设置 false 不显示 | boolean \| object   |  false  |

### List.Item

| 参数     | 说明           | 类型     | 默认值       |
---------|-------------|------|---------
| extra | 额外内容, 通常用在 layout 为 vertical 的情况下, 展示右侧内容 | string\|ReactNode |  -  |

### List.Item.Meta

| 参数     | 说明           | 类型     | 默认值       |
---------|-------------|------|---------
| avatar | 列表元素的图标 | ReactNode |  -  |
| title | 列表元素的标题 | string\|ReactNode |  -  |
| description | 列表元素的描述内容 | string\|ReactNode |  -  |

### List.Item.Action
| 参数     | 说明           | 类型     | 默认值       |
---------|-------------|------|---------
| actions | 如果此参数存在, 那么会将其中的数据转换成符合标准 ant design 设计的 action 样式元素 | Array |  -  |

### List.Item.Action actions props

| 参数     | 说明           | 类型     | 默认值          |
|----------|----------------|----------|-----------------|
| icon    | icon 图标           | string| -  |
| text      |  文案   |  string  | -               |
| onClick      | 点击回掉  |  function  | -  |
