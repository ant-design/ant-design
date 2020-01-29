---
category: Components
type: Layout
cols: 1
title: Layout
---

Handling the overall layout of a page.

## Specification

### Size

The first level navigation is inclined left near a logo, and the secondary menu is inclined right.

- Top Navigation: the height of the first level navigation `64px`, the second level navigation `48px`.
- Top Navigation (for landing pages): the height of the first level navigation `80px`, the second level navigation `56px`.
- Calculation formula of a top navigation: `48+8n`.
- Calculation formula of an aside navigation: `200+8n`.

### Interaction rules

- The first level navigation and the last level navigation should be distinguishable by visualization;
- The current item should have the highest priority of visualization;
- When the current navigation item is collapsed, the style of the current navigation item is applied to its parent level;
- The left side navigation bar has support for both the accordion and expanding styles; you can choose the one that fits your case the best.

## Visualization rules

Style of a navigation should conform to its level.

- **Emphasis by colorblock**

  When background color is a deep color, you can use this pattern for the parent level navigation item of the current page.

- **The highlight match stick**

  When background color is a light color, you can use this pattern for the current page navigation item; we recommend using it for the last item of the navigation path.

- **Highlighted font**

  From the visualization aspect, a highlighted font is stronger than colorblock; this pattern is often used for the parent level of the current item.

- **Enlarge the size of the font**

  `12px`, `14px` is a standard font size of navigations, `14px` is used for the first and the second level of the navigation. You can choose an appropriate font size regarding the level of your navigation.

## Component Overview

- `Layout`: The layout wrapper, in which `Header` `Sider` `Content` `Footer` or `Layout` itself can be nested, and can be placed in any parent container.
- `Header`: The top layout with the default style, in which any element can be nested, and must be placed in `Layout`.
- `Sider`: The sidebar with default style and basic functions, in which any element can be nested, and must be placed in `Layout`.
- `Content`: The content layout with the default style, in which any element can be nested, and must be placed in `Layout`.
- `Footer`: The bottom layout with the default style, in which any element can be nested, and must be placed in `Layout`.

> Based on `flex layout`, please pay attention to the [compatibility](http://caniuse.com/#search=flex).

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

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| className | container className | string | - |  |
| hasSider | whether contain Sider in children, don't have to assign it normally. Useful in ssr avoid style flickering | boolean | - | 3.2.0 |
| style | to customize the styles | object | - |  |

> APIs of `Layout.Header` `Layout.Footer` `Layout.Content` are the same as that of `Layout`.

### Layout.Sider

The sidebar.

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| breakpoint | [breakpoints](/components/grid#Col) of the responsive layout | Enum { 'xs', 'sm', 'md', 'lg', 'xl', 'xxl' } | - |  |
| className | container className | string | - |  |
| collapsed | to set the current status | boolean | - |  |
| collapsedWidth | width of the collapsed sidebar, by setting to `0` a special trigger will appear | number | 80 |  |
| collapsible | whether can be collapsed | boolean | false |  |
| defaultCollapsed | to set the initial status | boolean | false |  |
| reverseArrow | reverse direction of arrow, for a sider that expands from the right | boolean | false |  |
| style | to customize the styles | object | - |  |
| theme | color theme of the sidebar | string: `light` `dark` | `dark` | 3.6.0 |
| trigger | specify the customized trigger, set to null to hide the trigger | string\|ReactNode | - |  |
| width | width of the sidebar | number\|string | 200 |  |
| onCollapse | the callback function, executed by clicking the trigger or activating the responsive layout | (collapsed, type) => {} | - |  |
| onBreakpoint | the callback function, executed when [breakpoints](/components/grid#API) changed | (broken) => {} | - | 3.7.0 |
| zeroWidthTriggerStyle | to customize the styles of the special trigger that appears when `collapsedWidth` is 0 | object | - | 3.24.0 |

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
