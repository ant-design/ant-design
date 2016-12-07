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
| position | 指定侧边栏位置，可选 `left/right` | String | `left` |
| collapsible | 是否可收起 | Boolean | false  |
| defaultCollapsed | 是否默认收起 | Boolean | false  |
| collapsed | 当前收起状态 | Boolean | - |
| onCollapse | 展开-收起时的回调函数，仅当 `collapsible:true` 时生效 | (collapsed) => {} | - |
| hideTrigger | 是否隐藏默认 trigger，仅当 `collapsible:true` 时生效 | Boolean | false |
| width | 宽度 | Number | 200 |
| collapsedWidth | 收缩宽度，仅当 `collapsible:true` 时生效 | Number | 64 |
