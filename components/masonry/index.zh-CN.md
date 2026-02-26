---
category: Components
subtitle: 瀑布流
group: 布局
title: Masonry
cover: https://mdn.alipayobjects.com/huamei_iwk9zp/afts/img/A*cELTRrM5HpAAAAAAOGAAAAgAegCCAQ/original
coverDark: https://mdn.alipayobjects.com/huamei_iwk9zp/afts/img/A*2CxJRYJmfbIAAAAAPqAAAAgAegCCAQ/original
demo:
  cols: 1
tag: 6.0.0
---

瀑布流布局组件，用于展示不同高度的内容。

## 何时使用

- 展示不规则高度的图片或卡片时
- 需要按照列数均匀分布内容时
- 需要响应式调整列数时

## 代码演示 {#examples}

<!-- prettier-ignore -->
<code src="./demo/basic.tsx">基础用法</code>
<code src="./demo/responsive.tsx">响应式</code>
<code src="./demo/image.tsx">图片</code>
<code src="./demo/dynamic.tsx">动态更新</code>
<code src="./demo/virtual.tsx">虚拟滚动</code>
<code src="./demo/virtual-dynamic.tsx">虚拟滚动与动态加载</code>
<code src="./demo/style-class.tsx">自定义语义结构的样式和类</code>
<code src="./demo/fresh.tsx" debug>持续更新</code>

## API

通用属性参考：[通用属性](/docs/react/common-props)

### Masonry

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| classNames | 用于自定义组件内部各语义化结构的 class，支持对象或函数 | Record<[SemanticDOM](#semantic-dom), string> \| (info: { props })=> Record<[SemanticDOM](#semantic-dom), string> | - |  |
| columns | 列数，可以是固定值或响应式配置 | `number \| { xs?: number; sm?: number; md?: number }` | `3` |  |
| fresh | 是否持续监听子项尺寸变化 | `boolean` | `false` |  |
| gutter | 间距，可以是固定值、响应式配置或水平垂直间距配置 | [Gap](#gap) \| \[[Gap](#gap), [Gap](#gap)\] | `0` |  |
| items | 瀑布流项 | [MasonryItem](#masonryitem)[] | - |  |
| itemRender | 自定义项渲染 | `(item: MasonryItem) => React.ReactNode` | - |  |
| styles | 语义化结构 style，支持对象和函数形式 | Record<[SemanticDOM](#semantic-dom), CSSProperties> \| ((info: { props }) => Record<[SemanticDOM](#semantic-dom), CSSProperties>) | - |  |
| virtual | 启用虚拟滚动以支持大数据量渲染 | [VirtualConfig](#virtualconfig) | - |  |
| onLayoutChange | 列排序回调 | `({ key: React.Key; column: number }[]) => void` | - |  |
| onScrollEnd | 滚动到底部时的回调（用于无限加载，需配合 virtual 使用） | `() => void` | - |  |

### MasonryItem

| 参数     | 说明                                             | 类型                 | 默认值 |
| -------- | ------------------------------------------------ | -------------------- | ------ |
| children | 自定义展示内容，相对 `itemRender` 具有更高优先级 | `React.ReactNode`    | -      |
| column   | 自定义所在列                                     | `number`             | -      |
| data     | 自定义存储数据                                   | `T`                  | -      |
| height   | 高度                                             | `number`             | -      |
| key      | 唯一标识                                         | `string` \| `number` | -      |

### Gap

Gap 是项之间的间距，可以是固定值，也可以是响应式配置。

```ts
type Gap = undefined | number | Partial<Record<'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl', number>>;
```

### VirtualConfig

虚拟滚动配置。启用后，只渲染可视区域内的元素，大幅提升大数据量场景下的性能。

| 参数       | 说明                                 | 类型     | 默认值            |
| ---------- | ------------------------------------ | -------- | ----------------- |
| height     | 容器高度，单位为像素（必填）         | `number` | -                 |
| itemHeight | 预估的项目高度，用于位置计算（必填） | `number` | -                 |
| buffer     | 可视区域外额外渲染的项目数量         | `number` | `columnCount * 2` |

## Semantic DOM

<code src="./demo/_semantic.tsx" simplify="true"></code>

## Design Token

<ComponentTokenTable component="Masonry"></ComponentTokenTable>
