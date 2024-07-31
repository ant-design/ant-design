---
category: Components
group: 布局
title: Splitter
subtitle: 分隔面板
description: 分割面板用于隔离区域，展示多个内容。
demo:
  cols: 2
---

## 何时使用

需要展示多个内容，并且希望用户可以自由调整每个内容的大小。

## 代码演示

<!-- prettier-ignore -->
<code src="./demo/basic.tsx">基本用法</code>
<code src="./demo/multiple.tsx">组合布局</code>
<code src="./demo/group.tsx">复杂布局</code>

## API

通用属性参考：[通用属性](/docs/react/common-props)

### Splitter

| Props         | Descriptions     | Type                        | Default      |
| ------------- | ---------------- | --------------------------- | ------------ |
| layout        | 布局方向         | `horizontal` \| `vertical`  | `horizontal` |
| items         | 面板配置         | `SplitterItem`              | -            |
| style         | 容器样式         | `css-properties`            | -            |
| onResizeStart | 开始拖拽之前回调 | `(sizes: number[]) => void` | -            |
| onResize      | 面板大小变化回调 | `(sizes: number[]) => void` | -            |
| onResizeEnd   | 拖拽结束回调     | `(sizes: number[]) => void` | -            |

### SplitterItem

| Props       | Descriptions                                  | Type               | Default |
| ----------- | --------------------------------------------- | ------------------ | ------- |
| collapsible | 快速折叠 `collapsible=true`时将忽略`min``max` | `boolean`          | `false` |
| min         | 最小阈值 `1-100 \| '10%' \| '200px'`          | `number \| string` | -       |
| max         | 最大阈值 `1-100 \| '10%' \| '200px'`          | `number \| string` | -       |
| size        | 受控面板大小 `1-100 \| '10%' \| '200px'`      | `number`           | -       |
| defaultSize | 初始面板大小 `1-100 \| '10%' \| '200px'`      | `number`           | -       |
| content     | 当前面板的内容                                | `ReactNode`        | -       |
| resizable   | 是否支持拖拽伸缩                              | `boolean`          | `true`  |

## 主题变量（Design Token）

<ComponentTokenTable component='Splitter'></ComponentTokenTable>
