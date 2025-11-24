---
category: Components
title: Divider
subtitle: 分割线
description: 区隔内容的分割线。
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*7sMiTbzvaDoAAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*KPSEQ74PLg4AAAAAAAAAAAAADrJ8AQ/original
demo:
  cols: 2
group:
  title: 布局
  order: 2
---

## 何时使用 {#when-to-use}

- 对不同章节的文本段落进行分割。
- 对行内文字/链接进行分割，例如表格的操作列。

## 代码演示

<!-- prettier-ignore -->
<code src="./demo/horizontal.tsx">水平分割线</code>
<code src="./demo/with-text.tsx">带文字的分割线</code>
<code src="./demo/size.tsx" version="5.25.0">设置分割线的间距大小</code>
<code src="./demo/plain.tsx">分割文字使用正文样式</code>
<code src="./demo/vertical.tsx">垂直分割线</code>
<code src="./demo/customize-style.tsx" debug>样式自定义</code>
<code src="./demo/component-token.tsx" debug>组件 Token</code>
<code src="./demo/variant.tsx">变体</code>
<code src="./demo/style-class.tsx" version="6.0.0">自定义语义结构的样式和类</code>

## API

通用属性参考：[通用属性](/docs/react/common-props)

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| children | 嵌套的标题 | ReactNode | - |  |
| className | 分割线样式类 | string | - |  |
| classNames | 用于自定义组件内部各语义化结构的 class，支持对象或函数 | Record<[SemanticDOM](#semantic-dom), string> \| (info: { props })=> Record<[SemanticDOM](#semantic-dom), string> | - |  |
| dashed | 是否虚线 | boolean | false |  |
| orientation | 水平或垂直类型 | `horizontal` \| `vertical` | `horizontal` | - |
| ~~orientationMargin~~ | 标题和最近 left/right 边框之间的距离，去除了分割线，同时 `titlePlacement` 不能为 `center`。如果传入 `string` 类型的数字且不带单位，默认单位是 px | string \| number | - |  |
| plain | 文字是否显示为普通正文样式 | boolean | false | 4.2.0 |
| style | 分割线样式对象 | CSSProperties | - |  |
| styles | 用于自定义组件内部各语义化结构的行内 style，支持对象或函数 | Record<[SemanticDOM](#semantic-dom), CSSProperties> \| (info: { props })=> Record<[SemanticDOM](#semantic-dom), CSSProperties> | - |  |
| size | 间距大小，仅对水平布局有效 | `small` \| `middle` \| `large` | - | 5.25.0 |
| titlePlacement | 分割线标题的位置 | `start` \| `end` \| `center` | `center` | - |
| ~~type~~ | 水平还是垂直类型 | `horizontal` \| `vertical` | `horizontal` | - |
| variant | 分割线是虚线、点线还是实线 | `dashed` \| `dotted` \| `solid` | solid | 5.20.0 |
| vertical | 是否垂直，和 orientation 同时配置以 orientation 优先 | boolean | false | - |

## Semantic DOM

<code src="./demo/_semantic.tsx" simplify="true"></code>

## 主题变量（Design Token）

<ComponentTokenTable component="Divider"></ComponentTokenTable>
