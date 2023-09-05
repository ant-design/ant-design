---
category: Components
subtitle: 弹性布局
group: 布局
title: Flex
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*SMzgSJZE_AwAAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*8yArQ43EGccAAAAAAAAAAAAADrJ8AQ/original
tag: New
---

弹性布局。自 `5.9.0` 版本开始提供该组件。

## 何时使用

- 适合设置元素之间的间距。
- 适合设置各种水平、垂直对齐方式。

## 代码演示

<!-- prettier-ignore -->
<code src="./demo/basic.tsx">基本布局</code>
<code src="./demo/align.tsx">对齐方式</code>
<code src="./demo/wrap.tsx">自动换行</code>
<code src="./demo/combination.tsx">组合使用</code>

## API

> 自 `antd@5.9.0` 版本开始提供该组件。

通用属性参考：[通用属性](/docs/react/common-props)

| 属性 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| style | 自定义样式 | React.CSSProperties | - |  |
| className | 自定义类名 | string | - |  |
| direction | 定义flex主轴的方向 | 参考 [flex-direction](https://developer.mozilla.org/zh-CN/docs/Web/CSS/flex-direction) | row |  |
| wrap | 设置元素单行显示还是多行显示 | 参考 [flex-wrap](https://developer.mozilla.org/zh-CN/docs/Web/CSS/flex-wrap) | nowrap |  |
| justify | 设置元素在主轴方向上的对齐方式 | 参考 [justify-content](https://developer.mozilla.org/zh-CN/docs/Web/CSS/justify-content) | normal |  |
| align | 设置元素在交叉轴方向上的对齐方式 | 参考 [align-items](https://developer.mozilla.org/zh-CN/docs/Web/CSS/align-items) | normal |  |
| flex | flex CSS 简写属性 | 参考 [flex](https://developer.mozilla.org/zh-CN/docs/Web/CSS/flex) | normal |  |
| gap | 设置网格之间的间隙 | `small` \| `middle` \| `large` \| `string` \| `number` | - |  |
| component | 自定义元素类型 | React.ComponentType | `div` |  |

## Design Token

<ComponentTokenTable component="Flex"></ComponentTokenTable>
