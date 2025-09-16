---
category: Components
group: 布局
title: Splitter
subtitle: 分隔面板
description: 自由切分指定区域
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*f0SISaETY0wAAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*y92yRYhObU8AAAAAAAAAAAAADrJ8AQ/original
demo:
  cols: 1
tag: 5.21.0
---

## 何时使用 {#when-to-use}

- 可以水平或垂直地分隔区域。
- 当需要自由拖拽调整各区域大小。
- 当需要指定区域的最大最小宽高时。

## 代码演示

<!-- prettier-ignore -->
<code src="./demo/size.tsx">基本用法</code>
<code src="./demo/control.tsx">受控模式</code>
<code src="./demo/vertical.tsx">垂直方向</code>
<code src="./demo/collapsible.tsx">可折叠</code>
<code src="./demo/collapsibleIcon.tsx" version="5.27.0">可折叠图标显示</code>
<code src="./demo/multiple.tsx">多面板</code>
<code src="./demo/group.tsx">复杂组合</code>
<code src="./demo/lazy.tsx" version="5.23.0">延迟渲染模式</code>
<code src="./demo/customize.tsx" version="6.0.0">自定义样式</code>
<code src="./demo/style-class.tsx" version="6.0.0">自定义各种语义结构的样式和类</code>
<code src="./demo/nested-in-tabs.tsx" debug>标签页中嵌套</code>
<code src="./demo/debug.tsx" debug>调试</code>
<code src="./demo/size-mix.tsx" debug>尺寸混合</code>

## API

通用属性参考：[通用属性](/docs/react/common-props)

> Splitter 组件需要通过子元素计算面板大小，因而其子元素仅支持 `Splitter.Panel`。

### Splitter

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| classNames | 用于自定义组件内部各语义化结构的 class，支持对象或函数 | Record<[SemanticDOM](#semantic-dom), string> \| (info: { props })=> Record<[SemanticDOM](#semantic-dom), string> | - |  |
| collapsibleIcon | 折叠图标 | `{start?: ReactNode; end?: ReactNode}` | - | 6.0.0 |
| draggerIcon | 拖拽图标 | `ReactNode` | - | 6.0.0 |
| ~~layout~~ | 布局方向 | `horizontal` \| `vertical` | `horizontal` | - |
| lazy | 延迟渲染模式 | `boolean` | `false` | 5.23.0 |
| orientation | 布局方向 | `horizontal` \| `vertical` | `horizontal` | - |
| styles | 用于自定义组件内部各语义化结构的行内 style，支持对象或函数 | Record<[SemanticDOM](#semantic-dom), CSSProperties> \| (info: { props })=> Record<[SemanticDOM](#semantic-dom), CSSProperties> | - |  |
| vertical | 排列方向，与 `orientation` 同时存在，以 `orientation` 优先 | boolean | `false` |  |
| onResize | 面板大小变化回调 | `(sizes: number[]) => void` | - | - |
| onResizeEnd | 拖拽结束回调 | `(sizes: number[]) => void` | - | - |
| onResizeStart | 开始拖拽之前回调 | `(sizes: number[]) => void` | - | - |

### Panel

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| collapsible | 快速折叠 | `boolean \| { start?: boolean; end?: boolean; showCollapsibleIcon?: boolean \| 'auto' }` | `false` | showCollapsibleIcon: 5.27.0 |
| defaultSize | 初始面板大小，支持数字 px 或者文字 '百分比%' 类型 | `number \| string` | - | - |
| max | 最大阈值，支持数字 px 或者文字 '百分比%' 类型 | `number \| string` | - | - |
| min | 最小阈值，支持数字 px 或者文字 '百分比%' 类型 | `number \| string` | - | - |
| resizable | 是否开启拖拽伸缩 | `boolean` | `true` | - |
| size | 受控面板大小，支持数字 px 或者文字 '百分比%' 类型 | `number \| string` | - | - |

## Semantic DOM

<code src="./demo/_semantic.tsx" simplify="true"></code>

## 主题变量（Design Token）

<ComponentTokenTable component='Splitter'></ComponentTokenTable>
