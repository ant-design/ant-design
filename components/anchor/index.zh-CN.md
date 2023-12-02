---
category: Components
title: Anchor
subtitle: 锚点
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*TBTSR4PyVmkAAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*JGb3RIzyOCkAAAAAAAAAAAAADrJ8AQ/original
demo:
group:
  title: 导航
  order: 3
---

用于跳转到页面指定位置。

## 何时使用

需要展现当前页面上可供跳转的锚点链接，以及快速在锚点之间跳转。

> 开发者注意事项：
>
> 自 `4.24.0` 起，由于组件从 class 重构成 FC，之前一些获取 `ref` 并调用内部实例方法的写法都会失效

## 代码演示

<!-- prettier-ignore -->
<code src="./demo/basic.tsx" iframe="200">基本</code>
<code src="./demo/horizontal.tsx" iframe="200">横向 Anchor</code>
<code src="./demo/static.tsx">静态位置</code>
<code src="./demo/onClick.tsx">自定义 onClick 事件</code>
<code src="./demo/customizeHighlight.tsx">自定义锚点高亮</code>
<code src="./demo/targetOffset.tsx" iframe="200">设置锚点滚动偏移量</code>
<code src="./demo/onChange.tsx">监听锚点链接改变</code>
<code src="./demo/replace.tsx" iframe="200">替换历史中的 href</code>
<code src="./demo/legacy-anchor.tsx" debug>废弃的 JSX 示例</code>
<code src="./demo/component-token.tsx" iframe="800" debug>组件 Token</code>

## API

通用属性参考：[通用属性](/docs/react/common-props)

### Anchor Props

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| affix | 固定模式 | boolean | true |  |
| bounds | 锚点区域边界 | number | 5 |  |
| getContainer | 指定滚动的容器 | () => HTMLElement | () => window |  |
| getCurrentAnchor | 自定义高亮的锚点 | (activeLink: string) => string | - |  |
| offsetTop | 距离窗口顶部达到指定偏移量后触发 | number |  |  |
| showInkInFixed | `affix={false}` 时是否显示小方块 | boolean | false |  |
| targetOffset | 锚点滚动偏移量，默认与 offsetTop 相同，[例子](#components-anchor-demo-targetoffset) | number | - |  |
| onChange | 监听锚点链接改变 | (currentActiveLink: string) => void | - |  |
| onClick | `click` 事件的 handler | (e: MouseEvent, link: object) => void | - |  |
| items | 数据化配置选项内容，支持通过 children 嵌套 | { key, href, title, target, children }\[] [具体见](#anchoritem) | - | 5.1.0 |
| direction | 设置导航方向 | `vertical` \| `horizontal` | `vertical` | 5.2.0 |
| replace | 替换浏览器历史记录中项目的 href 而不是推送它 | boolean | false | 5.7.0 |

### AnchorItem

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| key | 唯一标志 | string \| number | - |  |
| href | 锚点链接 | string | - |  |
| target | 该属性指定在何处显示链接的资源 | string | - |  |
| title | 文字内容 | ReactNode | - |  |
| children | 嵌套的 Anchor Link，`注意：水平方向该属性不支持` | [AnchorItem](#anchoritem)\[] | - |  |
| replace | 替换浏览器历史记录中的项目 href 而不是推送它 | boolean | false | 5.7.0 |

### Link Props

建议使用 items 形式。

| 参数   | 说明                           | 类型      | 默认值 | 版本 |
| ------ | ------------------------------ | --------- | ------ | ---- |
| href   | 锚点链接                       | string    | -      |      |
| target | 该属性指定在何处显示链接的资源 | string    | -      |      |
| title  | 文字内容                       | ReactNode | -      |      |

## 主题变量（Design Token）

<ComponentTokenTable component="Anchor"></ComponentTokenTable>
