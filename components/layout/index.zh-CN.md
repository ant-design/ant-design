---
category: Components
group: 布局
title: Layout
subtitle: 布局
description: 协助进行页面级整体布局。
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*4i58ToAcxaYAAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*HdS6Q5vUCDcAAAAAAAAAAAAADrJ8AQ/original
---

## 设计规则

### 尺寸

一级导航项偏左靠近 logo 放置，辅助菜单偏右放置。

- 顶部导航（大部分系统）：一级导航高度 `64px`，二级导航 `48px`。
- 顶部导航（展示类页面）：一级导航高度 `80px`，二级导航 `56px`。
- 顶部导航高度的范围计算公式为：`48+8n`。
- 侧边导航宽度的范围计算公式：`200+8n`。

### 交互

- 一级导航和末级的导航需要在可视化的层面被强调出来；
- 当前项应该在呈现上优先级最高；
- 当导航收起的时候，当前项的样式自动赋予给它的上一个层级；
- 左侧导航栏的收放交互同时支持手风琴和全展开的样式，根据业务的要求进行适当的选择。

### 视觉

导航样式上需要根据信息层级合理的选择样式：

- **大色块强调**

  建议用于底色为深色系时，当前页面父级的导航项。

- **高亮火柴棍**

  当导航栏底色为浅色系时使用，可用于当前页面对应导航项，建议尽量在导航路径的最终项使用。

- **字体高亮变色**

  从可视化层面，字体高亮的视觉强化力度低于大色块，通常在当前项的上一级使用。

- **字体放大**

  `12px`、`14px` 是导航的标准字号，14 号字体用在一、二级导航中。字号可以考虑导航项的等级做相应选择。

## 组件概述

- `Layout`：布局容器，其下可嵌套 `Header` `Sider` `Content` `Footer` 或 `Layout` 本身，可以放在任何父容器中。
- `Header`：顶部布局，自带默认样式，其下可嵌套任何元素，只能放在 `Layout` 中。
- `Sider`：侧边栏，自带默认样式及基本功能，其下可嵌套任何元素，只能放在 `Layout` 中。
- `Content`：内容部分，自带默认样式，其下可嵌套任何元素，只能放在 `Layout` 中。
- `Footer`：底部布局，自带默认样式，其下可嵌套任何元素，只能放在 `Layout` 中。

> 注意：采用 flex 布局实现，请注意[浏览器兼容性](http://caniuse.com/#search=flex)问题。

## 代码演示

<!-- prettier-ignore -->
<code src="./demo/basic.tsx">基本结构</code>
<code src="./demo/top.tsx" compact background="grey">上中下布局</code>
<code src="./demo/top-side.tsx" compact background="grey">顶部-侧边布局</code>
<code src="./demo/top-side-2.tsx" compact background="grey">顶部-侧边布局-通栏</code>
<code src="./demo/side.tsx" iframe="360">侧边布局</code>
<code src="./demo/custom-trigger.tsx" compact background="grey">自定义触发器</code>
<code src="./demo/responsive.tsx" compact background="grey">响应式布局</code>
<code src="./demo/fixed.tsx" iframe="360">固定头部</code>
<code src="./demo/fixed-sider.tsx" iframe="360">固定侧边栏</code>
<code src="./demo/custom-trigger-debug.tsx" compact background="grey" debug>自定义触发器 Debug</code>
<code src="./demo/component-token.tsx" compact background="grey" debug>组件 Token</code>

## API

```jsx
<Layout>
  <Header>header</Header>
  <Layout>
    <Sider>left sidebar</Sider>
    <Content>main content</Content>
    <Sider>right sidebar</Sider>
  </Layout>
  <Footer>footer</Footer>
</Layout>
```

### Layout

通用属性参考：[通用属性](/docs/react/common-props)

布局容器。

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| className | 容器 className | string | - |
| hasSider | 表示子元素里有 Sider，一般不用指定。可用于服务端渲染时避免样式闪动 | boolean | - |
| style | 指定样式 | CSSProperties | - |

### Layout.Sider

侧边栏。

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| breakpoint | 触发响应式布局的[断点](/components/grid-cn#col) | `xs` \| `sm` \| `md` \| `lg` \| `xl` \| `xxl` | - |
| className | 容器 className | string | - |
| collapsed | 当前收起状态 | boolean | - |
| collapsedWidth | 收缩宽度，设置为 0 会出现特殊 trigger | number | 80 |
| collapsible | 是否可收起 | boolean | false |
| defaultCollapsed | 是否默认收起 | boolean | false |
| reverseArrow | 翻转折叠提示箭头的方向，当 Sider 在右边时可以使用 | boolean | false |
| style | 指定样式 | CSSProperties | - |
| theme | 主题颜色 | `light` \| `dark` | `dark` |
| trigger | 自定义 trigger，设置为 null 时隐藏 trigger | ReactNode | - |
| width | 宽度 | number \| string | 200 |
| zeroWidthTriggerStyle | 指定当 `collapsedWidth` 为 0 时出现的特殊 trigger 的样式 | object | - |
| onBreakpoint | 触发响应式布局[断点](/components/grid-cn#api)时的回调 | (broken) => {} | - |
| onCollapse | 展开-收起时的回调函数，有点击 trigger 以及响应式反馈两种方式可以触发 | (collapsed, type) => {} | - |

#### breakpoint width

```js
{
  xs: '480px',
  sm: '576px',
  md: '768px',
  lg: '992px',
  xl: '1200px',
  xxl: '1600px',
}
```

## 主题变量（Design Token）

<ComponentTokenTable component="Layout"></ComponentTokenTable>
