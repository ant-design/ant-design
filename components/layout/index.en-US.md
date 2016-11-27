---
category: Components
type: Layout
cols: 1
title: Layout
---

When you are handling the overall layout of a page, this component might be helpfull.

> Base on `flex layout`, please pay attension to the compatibility.

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

The wrapper.

Property | Description | Type | Default
-----|-----|-----|------
style | to custom the styles | Object | -

> API of `Layout.Header` `Layout.Footer` `Layout.Content` is the same with `Layout`.

### Layout.Sider

The sidebar.

Property | Description | Type | Default
-----|-----|-----|------
style | to custom the styles | Object | -
right | right sidebar or not | Boolean | false
flexible | whether can be flexible | Boolean | false
collapsed | default status | Boolean | false
onSwitch | the callback function, can be executed when you switch the sidebar, available only `flexible: true` | (collapsed) => {}  | -
trigger | customized trigger, available only `flexible: true` | React.ReactNode | -
width | width of the sidebar | string("n%" or "npx") | 20%
collapsedWidth | width of the collapsed sidebar, available only `flexible: true` | string("n%" or "npx") | 6%
