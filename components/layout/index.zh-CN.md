---
category: Components
subtitle: 布局
type: Layout
cols: 1
title: Layout
---

可协助进行页面级整体布局。

## 概述

- `Layout`：布局容器，其下可嵌套 `Header` `Sider` `Content` `Footer` 或 `Layout` 本身。
- `Header`：顶部布局，自带默认样式。
- `Sider`：侧边栏，自带默认样式及基本功能。
- `Content`：内容部分，自带默认样式。
- `Footer`：底部布局，自带默认样式。

> 注意：采用 flex 布局实现，请注意[浏览器兼容性](http://caniuse.com/#search=flex)问题。

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

| 参数      | 说明                                      | 类型         | 默认值 |
|----------|------------------------------------------|-------------|-------|
| style | 指定样式 | object | - |
| className | 容器 className | string | - |

> `Layout.Header` `Layout.Footer` `Layout.Content` API 与 `Layout` 相同

### Layout.Sider

侧边栏。

| 参数      | 说明                                     | 类型       | 默认值 |
|----------|-----------------------------------------|------------|-------|
| collapsible | 是否可收起 | boolean | false  |
| defaultCollapsed | 是否默认收起 | boolean | false  |
| collapsed | 当前收起状态 | boolean | - |
| onCollapse | 展开-收起时的回调函数，仅当 `collapsible:true` 时生效 | (collapsed) => {} | - |
| trigger | 自定义 trigger，设置为 null 时隐藏 trigger | string\|ReactNode | - |
| width | 宽度 | number\|string | 200 |
| collapsedWidth | 收缩宽度，仅当 `collapsible:true` 时生效 | number | 64 |
| style | 指定样式 | object | - |
| className | 容器 className | string | - |
