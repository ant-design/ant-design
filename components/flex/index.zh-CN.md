---
category: Components
subtitle: 弹性布局
group: 布局
title: Flex
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*SMzgSJZE_AwAAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*8yArQ43EGccAAAAAAAAAAAAADrJ8AQ/original
tag: New
---

弹性布局。自 `5.10.0` 版本开始提供该组件。

## 何时使用

- 适合设置元素之间的间距。
- 适合设置各种水平、垂直对齐方式。

### 与 Space 组件的区别

- Space 为内联元素提供间距，其本身会为每一个子元素添加包裹元素用于内联对齐。适用于行、列中多个子元素的等距排列。
- Flex 为块级元素提供间距，其本身不会添加包裹元素。适用于垂直或水平方向上的子元素布局，并提供了更多的灵活性和控制能力。

## 代码演示

<!-- prettier-ignore -->
<code src="./demo/basic.tsx">基本布局</code>
<code src="./demo/align.tsx">对齐方式</code>
<code src="./demo/gap.tsx">设置间隙</code>
<code src="./demo/wrap.tsx">自动换行</code>
<code src="./demo/combination.tsx">组合使用</code>
<code src="./demo/debug.tsx" debug>调试专用</code>

## API

> 自 `antd@5.10.0` 版本开始提供该组件。Flex 组件默认行为在水平模式下，为向上对齐，在垂直模式下，为拉伸对齐，你可以通过属性进行调整。

通用属性参考：[通用属性](/docs/react/common-props)

| 属性 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| vertical | flex 主轴的方向是否垂直，使用 `flex-direction: column` | boolean | `false` |
| wrap | 设置元素单行显示还是多行显示 | 参考 [flex-wrap](https://developer.mozilla.org/zh-CN/docs/Web/CSS/flex-wrap) | nowrap |  |
| justify | 设置元素在主轴方向上的对齐方式 | 参考 [justify-content](https://developer.mozilla.org/zh-CN/docs/Web/CSS/justify-content) | normal |  |
| align | 设置元素在交叉轴方向上的对齐方式 | 参考 [align-items](https://developer.mozilla.org/zh-CN/docs/Web/CSS/align-items) | normal |  |
| flex | flex CSS 简写属性 | 参考 [flex](https://developer.mozilla.org/zh-CN/docs/Web/CSS/flex) | normal |  |
| gap | 设置网格之间的间隙 | `small` \| `middle` \| `large` \| string \| number | - |  |
| component | 自定义元素类型 | React.ComponentType | `div` |  |

## Design Token

<ComponentTokenTable component="Flex"></ComponentTokenTable>
