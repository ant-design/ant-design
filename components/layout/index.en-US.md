---
category: Components
type: Layout
cols: 1
title: Layout
---

When you are handling the overall layout of a page, this component might be helpfull.

## Overview

- `Layout`: The layout wrapper, in which `Header` `Sider` `Content` `Footer` or `Layout` itself can be nested.
- `Header`: The top layout with default style.
- `Sider`: The sidebar with default style and basic functions.
- `Content`: The content layout with default style.
- `Footer`: The bottom layout with default style.

> Base on `flex layout`, please pay attention to the [compatibility](http://caniuse.com/#search=flex).

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

The wrapper.

Property | Description | Type | Default
-----|-----|-----|------
style | to custom the styles | object | -
className | container className | string | -

> API of `Layout.Header` `Layout.Footer` `Layout.Content` is the same with `Layout`.

### Layout.Sider

The sidebar.

Property | Description | Type | Default
-----|-----|-----|------
collapsible | whether can be collapsed | boolean | false
defaultCollapsed | to set the initial status | boolean | false  |
collapsed | to set the current status | boolean | -
onCollapse | the callback function, can be executed when you switch the sidebar, available only `collapsible: true` | (collapsed) => {}  | -
trigger | specify the customized trigger, set to null to hide the trigger | string\|ReactNode| - |
width | width of the sidebar | number\|string | 200
collapsedWidth | width of the collapsed sidebar, available only `collapsible: true` | number | 64
style | to custom the styles | object | -
className | container className | string | -
