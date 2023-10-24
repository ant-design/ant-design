---
category: Components
title: Divider
subtitle: 分割线
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*7sMiTbzvaDoAAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*KPSEQ74PLg4AAAAAAAAAAAAADrJ8AQ/original
demo:
  cols: 2
group:
  title: 布局
  order: 2
---

区隔内容的分割线。

## 何时使用

- 对不同章节的文本段落进行分割。
- 对行内文字/链接进行分割，例如表格的操作列。

## 代码演示

<!-- prettier-ignore -->
<code src="./demo/horizontal.tsx">水平分割线</code>
<code src="./demo/with-text.tsx">带文字的分割线</code>
<code src="./demo/plain.tsx">分割文字使用正文样式</code>
<code src="./demo/vertical.tsx">垂直分割线</code>
<code src="./demo/customize-style.tsx" debug>样式自定义</code>
<code src="./demo/component-token.tsx" debug>组件 Token</code>

## API

通用属性参考：[通用属性](/docs/react/common-props)

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| children | 嵌套的标题 | ReactNode | - |  |
| className | 分割线样式类 | string | - |  |
| dashed | 是否虚线 | boolean | false |  |
| orientation | 分割线标题的位置 | `left` \| `right` \| `center` | `center` |  |
| orientationMargin | 标题和最近 left/right 边框之间的距离，去除了分割线，同时 `orientation` 必须为 `left` 或 `right`。如果传入 `string` 类型的数字且不带单位，默认单位是 px | string \| number | - |  |
| plain | 文字是否显示为普通正文样式 | boolean | false | 4.2.0 |
| style | 分割线样式对象 | CSSProperties | - |  |
| type | 水平还是垂直类型 | `horizontal` \| `vertical` | `horizontal` |  |

## 主题变量（Design Token）

<ComponentTokenTable component="Divider"></ComponentTokenTable>
