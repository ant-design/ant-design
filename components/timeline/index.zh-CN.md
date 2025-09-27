---
category: Components
group: 数据展示
title: Timeline
subtitle: 时间轴
description: 垂直展示的时间流信息。
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*FkTySqNt3sYAAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*yIl9S4hAIBcAAAAAAAAAAAAADrJ8AQ/original
demo:
  cols: 2
---

## 何时使用 {#when-to-use}

- 当有一系列信息需按时间排列时，可正序和倒序。
- 需要有一条时间轴进行视觉上的串联时。

## 代码演示

<!-- prettier-ignore -->
<code src="./demo/basic.tsx">基本用法</code>
<code src="./demo/variant.tsx">变体样式</code>
<code src="./demo/pending.tsx">等待及排序</code>
<code src="./demo/pending-legacy.tsx" debug>最后一个及排序</code>
<code src="./demo/alternate.tsx">交替展现</code>
<code src="./demo/horizontal.tsx">水平布局</code>
<code src="./demo/horizontal-debug.tsx" debug>水平布局</code>
<code src="./demo/custom.tsx">自定义时间轴点</code>
<code src="./demo/end.tsx">另一侧时间轴点</code>
<code src="./demo/title.tsx">标题</code>
<code src="./demo/title-span.tsx">标题占比</code>
<code src="./demo/semantic.tsx">语义化自定义</code>
<code src="./demo/style-class.tsx" version="6.0.0">自定义各种语义结构的样式和类</code>
<code src="./demo/component-token.tsx" debug>组件 Token</code>

## API

通用属性参考：[通用属性](/docs/react/common-props)

### Timeline

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| classNames | 用于自定义组件内部各语义化结构的 class，支持对象或函数 | Record<[SemanticDOM](#semantic-dom), string> \| (info: { props })=> Record<[SemanticDOM](#semantic-dom), string> | - |  |
| items | 选项配置 | [Items](#Items)[] | - |  |
| mode | 通过设置 `mode` 可以改变时间轴和内容的相对位置 | `start` \| `alternate` \| `end` | `start` |  |
| orientation | 设置时间轴的方向 | `vertical` \| `horizontal` | `vertical` |  |
| ~~pending~~ | 指定最后一个幽灵节点是否存在或内容，请使用 `item.loading` 代替 | ReactNode | false |  |
| ~~pendingDot~~ | 当最后一个幽灵节点存在時，指定其时间图点，请使用 `item.icon` 代替 | ReactNode | &lt;LoadingOutlined /&gt; |  |
| reverse | 节点排序 | boolean | false |  |
| styles | 用于自定义组件内部各语义化结构的行内 style，支持对象或函数 | Record<[SemanticDOM](#semantic-dom), CSSProperties> \| (info: { props })=> Record<[SemanticDOM](#semantic-dom), CSSProperties> | - |  |
| titleSpan | 设置标题占比空间，为到 dot 中心点距离 <InlinePopover previewURL="https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*1NJISa7bpqgAAAAAR5AAAAgAerJ8AQ/original"></InlinePopover> | number \| string | 12 |  |
| variant | 设置样式变体 | `filled` \| `outlined` | `outlined` |  |

### Items

时间轴的每一个节点。

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| color | 指定圆圈颜色 `blue`、`red`、`green`、`gray`，或自定义的色值 | string | `blue` |
| content | 设置内容 | ReactNode | - |
| ~~children~~ | 设置内容，请使用 `content` 替换 | ReactNode | - |
| ~~dot~~ | 自定义时间轴点，请使用 `icon` 替换 | ReactNode | - |
| icon | 自定义节点图标 | ReactNode | - |
| ~~label~~ | 设置标签，请使用 `title` 替换 | ReactNode | - |
| loading | 设置加载状态 | boolean | false |
| placement | 自定义节点位置 | `start` \| `end` | - |
| ~~position~~ | 自定义节点位置，请使用 `placement` 替换 | `start` \| `end` | - |
| title | 设置标题 | ReactNode | - |

## Semantic DOM

### Timeline

<code src="./demo/_semantic.tsx" simplify="true"></code>

### Timeline Items

<code src="./demo/_semantic_items.tsx" simplify="true"></code>

## 主题变量（Design Token）

<ComponentTokenTable component="Timeline"></ComponentTokenTable>
