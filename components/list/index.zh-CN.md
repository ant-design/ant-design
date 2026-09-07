---
category: Components
group: 数据展示
title: List
subtitle: 列表
description: 最基础的列表展示，可承载文字、列表、图片、段落。
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*EYuhSpw1iSwAAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*tBzwQ7raKX8AAAAAAAAAAAAADrJ8AQ/original
tag: DEPRECATED
---

## 何时使用 {#when-to-use}

最基础的列表展示，可承载文字、列表、图片、段落，常用于后台数据展示页面。

<!-- prettier-ignore -->
:::warning{title=废弃提示}
List 组件已经进入废弃阶段，将于下个 major 版本移除，请改用 [Listy](/components/listy-cn)，迁移方式参见 [如何从 List 迁移？](#faq-migrate-from-list)。
:::

## 代码演示 {#examples}

<!-- prettier-ignore -->
<code src="./demo/simple.tsx">简单列表</code>
<code src="./demo/basic.tsx">基础列表</code>
<code src="./demo/loadmore.tsx">加载更多</code>
<code src="./demo/vertical.tsx">竖排列表样式</code>
<code src="./demo/pagination.tsx">分页设置</code>
<code src="./demo/grid.tsx">栅格列表</code>
<code src="./demo/grid-test.tsx" debug>测试栅格列表</code>
<code src="./demo/responsive.tsx">响应式的栅格列表</code>
<code src="./demo/infinite-load.tsx">滚动加载</code>
<code src="./demo/drag-sorting.tsx">拖拽排序</code>
<code src="./demo/drag-sorting-handler.tsx">拖拽排序（拖拽手柄）</code>
<code src="./demo/grid-drag-sorting.tsx">栅格拖拽排序</code>
<code src="./demo/grid-drag-sorting-handler.tsx">栅格拖拽排序（拖拽手柄）</code>
<code src="./demo/virtual-list.tsx">滚动加载无限长列表</code>
<code src="./demo/component-token.tsx" debug>自定义组件 token</code>
<code src="./demo/spin-debug.tsx" debug>Spin 加载状态调试</code>

## API

通用属性参考：[通用属性](/docs/react/common-props)

另外我们封装了 [ProList](https://procomponents.ant.design/components/list)，在 `antd` List 之上扩展了更多便捷易用的功能，比如多选，展开等功能，使用体验贴近 Table，欢迎尝试使用。

### List

| 参数 | 说明 | 类型 | 默认值 | 版本 | [全局配置](/components/config-provider-cn#component-config) |
| --- | --- | --- | --- | --- | --- |
| bordered | 是否展示边框 | boolean | false |  | × |
| dataSource | 列表数据源 | any\[] | - |  | × |
| footer | 列表底部 | ReactNode | - |  | × |
| grid | 列表栅格配置 | [object](#list-grid-props) | - |  | × |
| header | 列表头部 | ReactNode | - |  | × |
| itemLayout | 设置 `List.Item` 布局，设置成 `vertical` 则竖直样式显示，默认横排 | `horizontal` \| `vertical` | `horizontal` |  | × |
| loading | 当卡片内容还在加载中时，可以用 `loading` 展示一个占位 | boolean \| [object](/components/spin-cn#api) ([更多](https://github.com/ant-design/ant-design/issues/8659)) | false |  | × |
| loadMore | 加载更多 | ReactNode | - |  | × |
| locale | 默认文案设置，目前包括空数据文案 | object | {emptyText: `暂无数据`} |  | × |
| pagination | 对应的 `pagination` 配置，设置 false 不显示 | boolean \| object | false |  | × |
| renderItem | 当使用 dataSource 时，可以用 `renderItem` 自定义渲染列表项 | (item: T, index: number) => ReactNode | - |  | × |
| rowKey | 当 `renderItem` 自定义渲染列表项有效时，自定义每一行的 `key` 的获取方式 | `keyof` T \| (item: T) => `React.Key` | `"key"` |  | × |
| size | list 的尺寸 | `default` \| `large` \| `small` | `default` |  | × |
| split | 是否展示分割线 | boolean | true |  | × |

### pagination

分页的配置项。

| 参数     | 说明               | 类型                         | 默认值   |
| -------- | ------------------ | ---------------------------- | -------- |
| position | 指定分页显示的位置 | `top` \| `bottom` \| `both`  | `bottom` |
| align    | 指定分页对齐的位置 | `start` \| `center` \| `end` | `end`    |

更多配置项，请查看 [`Pagination`](/components/pagination-cn)。

### List grid props

| 参数   | 说明                 | 类型   | 默认值 | 版本  |
| ------ | -------------------- | ------ | ------ | ----- |
| column | 列数                 | number | -      |       |
| gutter | 栅格间隔             | number | 0      |       |
| xs     | `<576px` 展示的列数  | number | -      |       |
| sm     | `≥576px` 展示的列数  | number | -      |       |
| md     | `≥768px` 展示的列数  | number | -      |       |
| lg     | `≥992px` 展示的列数  | number | -      |       |
| xl     | `≥1200px` 展示的列数 | number | -      |       |
| xxl    | `≥1600px` 展示的列数 | number | -      |       |
| xxxl   | `≥1920px` 展示的列数 | number | -      | 6.3.0 |

### List.Item

| 参数 | 说明 | 类型 | 默认值 | 版本 | [全局配置](/components/config-provider-cn#component-config) |
| --- | --- | --- | --- | --- | --- |
| actions | 列表操作组，根据 `itemLayout` 的不同，位置在卡片底部或者最右侧 | Array&lt;ReactNode> | - |  | × |
| classNames | 语义化结构 className | [`Record<actions \| extra, string>`](#semantic-dom) | - | 5.18.0 | 5.18.0 |
| extra | 额外内容，通常用在 `itemLayout` 为 `vertical` 的情况下，展示右侧内容; `horizontal` 展示在列表元素最右侧 | ReactNode | - |  | × |
| styles | 语义化结构 style | [`Record<actions \| extra, CSSProperties>`](#semantic-dom) | - | 5.18.0 | 5.18.0 |

### List.Item.Meta

| 参数        | 说明               | 类型      | 默认值 | 版本 |
| ----------- | ------------------ | --------- | ------ | ---- |
| avatar      | 列表元素的图标     | ReactNode | -      |      |
| description | 列表元素的描述内容 | ReactNode | -      |      |
| title       | 列表元素的标题     | ReactNode | -      |      |

## Semantic DOM

<code src="./demo/_semantic.tsx" simplify="true"></code>

## 主题变量（Design Token）{#design-token}

<ComponentTokenTable component="List"></ComponentTokenTable>

## FAQ {#faq}

### List 组件废弃后，有替代方案吗？ {#faq-listy-replacement}

有，请使用 `antd@6.6.0` 起提供的 [Listy](/components/listy-cn) 组件，它是 List 的继任者，内置了虚拟滚动、分组吸顶、程序化滚动等能力。并且支持灵活的自定义渲染方式，致力于满足不同场景下的列表需求。

### 如何从 List 迁移？ {#faq-migrate-from-list}

列表在不同场景下的表现形式各有不同，因此很难给出一份逐条对应的迁移指南。但得益于 Listy 提供的自定义渲染能力，List 中那些预设结构现在都可以在 `itemRender` 里用普通 JSX 重新组合。

对应关系如下：

- **数据与渲染**：`dataSource` 对应 `items`，`renderItem` 对应 `itemRender`；`rowKey` 含义不变，但在 Listy 中为必填且不再默认取 `key` 字段，原先依赖默认值的需显式传 `rowKey="key"`。列表数据量较大时无需借助第三方依赖，配合 `height` 开启 `virtual` 即可实现虚拟滚动。
- **行内的预设结构**：`List.Item`、`List.Item.Meta`、`actions`、`extra` 等均可在 `itemRender` 中自行组合。
- **列表外的结构**：`header` 与 `footer` 直接写在 Listy 外层，`loading` 用 [Spin](/components/spin-cn) 包裹，`pagination` 自行切片后传入 `items` 并搭配 [Pagination](/components/pagination-cn) 使用，`loadMore` 可参考[无限加载](/components/listy-cn#listy-demo-infinite)示例。
- **样式相关**：`bordered`、`split`、`size` 通过语义化 DOM 的 `classNames`、`styles` 与主题变量调整；`grid` 场景不建议迁移到 Listy，请直接使用 [Row / Col](/components/grid-cn) 搭配 [Card](/components/card-cn) 实现卡片墙布局。
