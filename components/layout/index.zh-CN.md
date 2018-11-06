---
category: Components
subtitle: 布局
type: 布局
cols: 1
title: Layout
---

协助进行页面级整体布局。

## 设计规则

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

布局容器。

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| className | 容器 className | string | - |
| hasSider | 表示子元素里有 Sider，一般不用指定。可用于服务端渲染时避免样式闪动 | boolean | - |
| style | 指定样式 | object | - |

> `Layout.Header` `Layout.Footer` `Layout.Content` API 与 `Layout` 相同

### Layout.Sider

侧边栏。

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| breakpoint | 触发响应式布局的[断点](/components/grid#api) | Enum { 'xs', 'sm', 'md', 'lg', 'xl', 'xxl' } | - |
| className | 容器 className | string | - |
| collapsed | 当前收起状态 | boolean | - |
| collapsedWidth | 收缩宽度，设置为 0 会出现特殊 trigger | number | 64 |
| collapsible | 是否可收起 | boolean | false |
| defaultCollapsed | 是否默认收起 | boolean | false |
| reverseArrow | 翻转折叠提示箭头的方向，当 Sider 在右边时可以使用 | boolean | false |
| style | 指定样式 | object | - |
| theme | 主题颜色 | string: `light` `dark` | `dark` |
| trigger | 自定义 trigger，设置为 null 时隐藏 trigger | string\|ReactNode | - |
| width | 宽度 | number\|string | 200 |
| onCollapse | 展开-收起时的回调函数，有点击 trigger 以及响应式反馈两种方式可以触发 | (collapsed, type) => {} | - |
| onBreakpoint | 触发响应式布局[断点](/components/grid#api)时的回调 | (broken) => {} | - |

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
