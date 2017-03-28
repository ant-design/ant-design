---
category: Components
type: Layout
cols: 1
title: Layout
---

Handling the overall layout of a page.

## Specification

### Size

The first level of the navigation is placed near by a logo inclined left, and the secondary menu is placed inclined right.

- Top Navigation (almost systems): the height of the first level navigation `64px`, the second level of navigation `48px`。
- Top Navigation(contents page): the height of the first level navigation `80px`, the second level of navigation `56px`。
- Calculation formula of a top navigation:`48+8n`.
- Calculation formula a aside navigation:`200+8n`.

### Interaction rules

- The first level navigation and the last level navigation should be distincted by visualization;
- The current item should have the highest priority of visualization;
- When the current navigation item is collapsed, the stlye of the current navigation item will be applied to the parent level of it;
- The left side navigation bar support for both the according and the expanding style, you can choose the one of it case by case.

## Visualization rules

 Style of a navigation should conform to the level of it.

- **Emphasis by colorblock**

  When background color is a deep color, you can use this pattern for the parent level navigation item of current page.

- **The highlight match stick**

  When background color is a light color, you can use this pattern for the current page navigation item, we recommed to use it for the last item of the navigation path.

- **Hightlighted font**

  From the visualization aspect, hightlighted font is stronger than colorblock, this pattern is often used for the parent level of the current item.

- **Enlarge the size of the font**

  `12px`、`14px` is a standard font size of navigations，14 is used for the first and the second level of the navigation. You can choose a approprigate font size in terms of the level of your navigation.

## Component Overview

- `Layout`: The layout wrapper, in which `Header` `Sider` `Content` `Footer` or `Layout` itself can be nested, and can be placed in any parent container.
- `Header`: The top layout with default style, in which any element can be nested, and must be placed in `Layout`.
- `Sider`: The sidebar with default style and basic functions, in which any element can be nested, and must be placed in `Layout`.
- `Content`: The content layout with default style, in which any element can be nested, and must be placed in `Layout`.
- `Footer`: The bottom layout with default style, in which any element can be nested, and must be placed in `Layout`.

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
onCollapse | the callback function, can be executed by clicking the trigger or activating the responsive layout | (collapsed, type) => {}  | -
trigger | specify the customized trigger, set to null to hide the trigger | string\|ReactNode| - |
width | width of the sidebar | number\|string | 200
collapsedWidth | width of the collapsed sidebar, by setting to `0` a special trigger will appear | number | 64
breakpoint | breakpoint of the responsive layout | Enum { 'xs', 'sm', 'md', 'lg', 'xl' } | - |
style | to custom the styles | object | -
className | container className | string | -

> Note: If you want to wrap the `Sider`, do not forget to add this setting to the customized component: `__ANT_LAYOUT_SIDER = true`. e.g.

```jsx
const CustomizedSider = (props) => <Sider {...props} />
CustomizedSider.__ANT_LAYOUT_SIDER = true;
...
<CustomizedSider>Sider Content</CustomizedSider>
```
