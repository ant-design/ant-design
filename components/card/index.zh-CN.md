---
category: Components
type: 数据展示
title: Card
subtitle: 卡片
cols: 1
---

通用卡片容器。

## 何时使用

最基础的卡片容器，可承载文字、列表、图片、段落，常用于后台概览页面。

## API

```html
<Card title="卡片标题">卡片内容</Card>
```

### Card

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| actions | 卡片操作组，位置在卡片底部 | Array&lt;ReactNode> | - | 3.0.0 |
| activeTabKey | 当前激活页签的 key | string | - | 3.3.0 |
| headStyle | 自定义标题区域样式 | object | - | 3.8.0 |
| bodyStyle | 内容区域自定义样式 | object | - | 3.0.0 |
| bordered | 是否有边框 | boolean | true | 3.0.0 |
| cover | 卡片封面 | ReactNode | - | 3.0.0 |
| defaultActiveTabKey | 初始化选中页签的 key，如果没有设置 activeTabKey | string | 第一个页签 | 3.3.0 |
| extra | 卡片右上角的操作区域 | string\|ReactNode | - | 3.0.0 |
| hoverable | 鼠标移过时可浮起 | boolean | false | 3.0.0 |
| loading | 当卡片内容还在加载中时，可以用 loading 展示一个占位 | boolean | false | 3.0.0 |
| tabList | 页签标题列表 | Array&lt;{key: string, tab: ReactNode}> | - | 3.0.0 |
| size | card 的尺寸 | `default` \| `small` | `default` | 3.12.0 |
| title | 卡片标题 | string\|ReactNode | - | 3.0.0 |
| type | 卡片类型，可设置为 `inner` 或 不设置 | string | - | 3.0.0 |
| onTabChange | 页签切换的回调 | (key) => void | - | 3.0.0 |

### Card.Grid

| Property  | Description            | Type   | Default | 版本  |
| --------- | ---------------------- | ------ | ------- | ----- |
| className | 网格容器类名           | string | -       | 3.0.0 |
| style     | 定义网格容器类名的样式 | object | -       | 3.0.0 |

### Card.Meta

| Property    | Description        | Type      | Default | 版本  |
| ----------- | ------------------ | --------- | ------- | ----- |
| avatar      | 头像/图标          | ReactNode | -       | 3.0.0 |
| className   | 容器类名           | string    | -       | 3.0.0 |
| description | 描述内容           | ReactNode | -       | 3.0.0 |
| style       | 定义容器类名的样式 | object    | -       | 3.0.0 |
| title       | 标题内容           | ReactNode | -       | 3.0.0 |
