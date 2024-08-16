---
category: Components
group: 布局
title: Splitter
subtitle: 分隔面板
description: 分割面板用于隔离区域，展示多个内容。
demo:
  cols: 2
tag: 5.21.0
---

## 何时使用

需要展示多个内容，并且希望用户可以自由调整每个内容的大小。

- Splitter 组件需要通过子元素计算面板大小，因而其子元素仅支持 `Splitter.Panel`。

## 代码演示

<!-- prettier-ignore -->
<code src="./demo/basic.tsx">基本用法</code>
<code src="./demo/size.tsx">面板大小控制</code>
<code src="./demo/collapsible.tsx">快捷折叠</code>
<code src="./demo/layout.tsx">布局切换</code>
<code src="./demo/multiple.tsx">多面板</code>
<code src="./demo/group.tsx">复杂组合</code>
<code src="./demo/debug.tsx" debug>测试</code>

## API

通用属性参考：[通用属性](/docs/react/common-props)

### Splitter

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| layout | 布局方向 | `horizontal` \| `vertical` | `horizontal` | - |
| style | 容器样式 | `css-properties` | - | - |
| onResizeStart | 开始拖拽之前回调 | `(sizes: number[], index:number) => void` | - | - |
| onResize | 面板大小变化回调 | `(sizes: number[], index:number) => void` | - | - |
| onResizeEnd | 拖拽结束回调 | `(sizes: number[], index:number) => void` | - | - |

### Panel

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| min | 最小阈值 `1-100 \| '10%' \| '200px'` | `number \| string` | - | - |
| max | 最大阈值 `1-100 \| '10%' \| '200px'` | `number \| string` | - | - |
| size | 受控面板大小 `1-100 \| '10%' \| '200px'` | `number \| string` | - | - |
| defaultSize | 初始面板大小 `1-100 \| '10%' \| '200px'` | `number \| string` | 50 | - |
| collapsible | 快速折叠,使用此属性时对应面板将忽略`min｜max`限制 | `boolean \| { prev?: boolean; next?: boolean }` | `false` | - |
| resizable | 是否开启拖拽伸缩 | `boolean` | `true` | - |

## 主题变量（Design Token）

<ComponentTokenTable component='Splitter'></ComponentTokenTable>
