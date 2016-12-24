---
category: Components
type: Layout
cols: 1
title: Layout
---

When you are handling the overall layout of a page, this component might be helpfull.

## Outline

- `Layout` —— The layout wrapper, in which `Header` `Sider` `Content` `Footer` or `Layout` itself can be nested.
- `Header` —— The top layout with default style.
- `Sider` —— The sidebar with default style and basic functions.
- `Content` —— The content layout with default style.
- `Footer` —— The bottom layout with default style.

> Base on `flex layout`, please pay attention to the [compatibility](http://caniuse.com/#search=flex).

## API

```jsx
<Layout>
  <Header>header</Header>
  <Layout>
    <Sider>left sidebar</Sider>
    <Content>main content</Content>
    <Sider position="right">right sidebar</Sider>
  </Layout>
  <Footer>footer</Footer>
</Layout>
```

### Layout

The wrapper.

Property | Description | Type | Default
-----|-----|-----|------
style | to custom the styles | Object | -

> API of `Layout.Header` `Layout.Footer` `Layout.Content` is the same with `Layout`.

### Layout.Sider

The sidebar.

Property | Description | Type | Default
-----|-----|-----|------
position | to set the position of the sidebar, options: `left/right` | String | `left`
collapsible | whether can be collapsed | Boolean | false
defaultCollapsed | to set the initial status | Boolean | false  |
collapsed | to set the current status | Boolean | -
onCollapse | the callback function, can be executed when you switch the sidebar, available only `collapsible: true` | (collapsed) => {}  | -
| trigger | specify the customized trigger, set to null to hide the trigger | React.ReactNode or null | - |
trigger | hide the default trigger or not, available only `collapsible: true` | React.ReactNode or null | -
width | width of the sidebar | Number | 200
collapsedWidth | width of the collapsed sidebar, available only `collapsible: true` | Number | 64
style | to custom the styles | Object | -
