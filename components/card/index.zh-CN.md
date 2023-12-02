---
category: Components
group: 数据展示
title: Card
subtitle: 卡片
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*VXtCTp93KPAAAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*a-8zR6rrupgAAAAAAAAAAAAADrJ8AQ/original
---

通用卡片容器。

## 何时使用

最基础的卡片容器，可承载文字、列表、图片、段落，常用于后台概览页面。

## 代码演示

<!-- prettier-ignore -->
<code src="./demo/basic.tsx">典型卡片</code>
<code src="./demo/border-less.tsx" background="grey">无边框</code>
<code src="./demo/simple.tsx">简洁卡片</code>
<code src="./demo/flexible-content.tsx">更灵活的内容展示</code>
<code src="./demo/in-column.tsx" background="grey">栅格卡片</code>
<code src="./demo/loading.tsx">预加载的卡片</code>
<code src="./demo/grid-card.tsx">网格型内嵌卡片</code>
<code src="./demo/inner.tsx">内部卡片</code>
<code src="./demo/tabs.tsx">带页签的卡片</code>
<code src="./demo/meta.tsx">支持更多内容配置</code>
<code src="./demo/component-token.tsx" debug>组件 Token</code>

## API

通用属性参考：[通用属性](/docs/react/common-props)

```jsx
<Card title="卡片标题">卡片内容</Card>
```

### Card

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| actions | 卡片操作组，位置在卡片底部 | Array&lt;ReactNode> | - |  |
| activeTabKey | 当前激活页签的 key | string | - |  |
| bodyStyle | 内容区域自定义样式 | CSSProperties | - |  |
| bordered | 是否有边框 | boolean | true |  |
| cover | 卡片封面 | ReactNode | - |  |
| defaultActiveTabKey | 初始化选中页签的 key，如果没有设置 activeTabKey | string | `第一个页签` |  |
| extra | 卡片右上角的操作区域 | ReactNode | - |  |
| headStyle | 自定义标题区域样式 | CSSProperties | - |  |
| hoverable | 鼠标移过时可浮起 | boolean | false |  |
| loading | 当卡片内容还在加载中时，可以用 loading 展示一个占位 | boolean | false |  |
| size | card 的尺寸 | `default` \| `small` | `default` |  |
| tabBarExtraContent | tab bar 上额外的元素 | ReactNode | - |  |
| tabList | 页签标题列表 | [TabItemType](/components/tabs#tabitemtype)[] | - |  |
| tabProps | [Tabs](/components/tabs-cn#tabs) | - | - |  |
| title | 卡片标题 | ReactNode | - |  |
| type | 卡片类型，可设置为 `inner` 或 不设置 | string | - |  |
| onTabChange | 页签切换的回调 | (key) => void | - |  |

### Card.Grid

| 参数      | 说明                   | 类型          | 默认值 | 版本 |
| --------- | ---------------------- | ------------- | ------ | ---- |
| className | 网格容器类名           | string        | -      |      |
| hoverable | 鼠标移过时可浮起       | boolean       | true   |      |
| style     | 定义网格容器类名的样式 | CSSProperties | -      |      |

### Card.Meta

| 参数        | 说明               | 类型          | 默认值 | 版本 |
| ----------- | ------------------ | ------------- | ------ | ---- |
| avatar      | 头像/图标          | ReactNode     | -      |      |
| className   | 容器类名           | string        | -      |      |
| description | 描述内容           | ReactNode     | -      |      |
| style       | 定义容器类名的样式 | CSSProperties | -      |      |
| title       | 标题内容           | ReactNode     | -      |      |

## 主题变量（Design Token）

<ComponentTokenTable component="Card"></ComponentTokenTable>
