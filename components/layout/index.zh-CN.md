---
category: Components
subtitle: 布局
type: Layout
cols: 1
title: Layout
---

可协助进行页面级整体布局。

> 注意：采用 flex 布局实现，请注意浏览器兼容性问题。

## API

```jsx
<Layout>
  <Header>header</Header>
  <Layout>
  	<Sider>left sidebar</Sider>
  	<Content>main content</Content>
  	<Sider right>right sidebar</Sider>
  </Layout>
  <Footer>footer</Footer>
</Layout>
```

### Layout

布局容器。

| 参数      | 说明                                      | 类型         | 默认值 |
|----------|------------------------------------------|-------------|-------|
| style | 指定样式 | Object | - |

> `Layout.Header` `Layout.Footer` `Layout.Content` API 与 `Layout` 相同

### Layout.Sider

侧边栏。

| 参数      | 说明                                     | 类型       | 默认值 |
|----------|-----------------------------------------|------------|-------|
| style | 指定样式 | Object | - |
| right | 指定为右侧边栏 | Boolean | false    |
| flexible | 是否可收起 | Boolean | false  |
| collapsed | 是否默认收起 | Boolean | false |
| onSwitch | 展开-收起时的回调函数，仅当 `flexible:true` 时生效 | (collapsed) => {} | - |
| trigger | 自定义 trigger，仅当 `flexible:true` 时生效 | React.Node | `<Icon type="left" />` 或 `<Icon type="right" />` |
| width | 宽度 | string（"n%" 或 "npx"） | 20% |
| collapsedWidth | 收缩宽度，仅当 `flexible:true` 时生效 | string（"n%" 或 "npx"） | 6% |
