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

## 何时使用

- 可以水平或垂直地分隔区域。
- 当需要自由拖拽调整各区域大小。
- 当需要指定区域的最大最小宽高时。

## 代码演示

<!-- prettier-ignore -->
<code src="./demo/size.tsx">基本用法</code>
<code src="./demo/control.tsx">受控模式</code>
<code src="./demo/vertical.tsx">垂直方向</code>
<code src="./demo/collapsible.tsx">可折叠</code>
<code src="./demo/multiple.tsx">多面板</code>
<code src="./demo/group.tsx">复杂组合</code>
<code src="./demo/nested-in-tabs.tsx" debug>标签页中嵌套</code>
<code src="./demo/lazy.tsx" version="5.23.0">延迟渲染模式</code>
<code src="./demo/debug.tsx" debug>调试</code>

## API

通用属性参考：[通用属性](/docs/react/common-props)

> Splitter 组件需要通过子元素计算面板大小，因而其子元素仅支持 `Splitter.Panel`。

### Splitter

| 参数          | 说明             | 类型                        | 默认值       | 版本   |
| ------------- | ---------------- | --------------------------- | ------------ | ------ |
| layout        | 布局方向         | `horizontal` \| `vertical`  | `horizontal` | -      |
| onResizeStart | 开始拖拽之前回调 | `(sizes: number[]) => void` | -            | -      |
| onResize      | 面板大小变化回调 | `(sizes: number[]) => void` | -            | -      |
| onResizeEnd   | 拖拽结束回调     | `(sizes: number[]) => void` | -            | -      |
| lazy          | 延迟渲染模式     | `boolean`                   | `false`      | 5.23.0 |

### Panel

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| defaultSize | 初始面板大小，支持数字 px 或者文字 '百分比%' 类型 | `number \| string` | - | - |
| min | 最小阈值，支持数字 px 或者文字 '百分比%' 类型 | `number \| string` | - | - |
| max | 最大阈值，支持数字 px 或者文字 '百分比%' 类型 | `number \| string` | - | - |
| size | 受控面板大小，支持数字 px 或者文字 '百分比%' 类型 | `number \| string` | - | - |
| collapsible | 快速折叠 | `boolean \| { start?: boolean; end?: boolean }` | `false` | - |
| resizable | 是否开启拖拽伸缩 | `boolean` | `true` | - |

## 主题变量（Design Token）

<ComponentTokenTable component='Splitter'></ComponentTokenTable>
