---
category: Components
cols: 1
type: Navigation
title: Menu
cover: https://gw.alipayobjects.com/zos/alicdn/3XZcjGpvK/Menu.svg
---

A versatile menu for navigation.

## When To Use

Navigation is an important part of any website, as a good navigation setup allows users to move around the site quickly and efficiently. Ant Design offers two navigation options: top and side. Top navigation provides all the categories and functions of the website. Side navigation provides the multi-level structure of the website.

More layouts with navigation: [Layout](/components/layout).

## Notes for developers

- Menu is rendered as a `ul` element, so it only supports [`li` and `script-supporting` elements](https://html.spec.whatwg.org/multipage/grouping-content.html#the-ul-element) as children nodes。Your customized node should be wrapped by `Menu.Item`.
- Menu needs to collect its node structure, so its children should be `Menu.*` or encapsulated HOCs.

### Usage upgrade after 4.20.0

```__react
import Alert from '../alert';
ReactDOM.render(<Alert message="After version 4.20.0, we provide a simpler usage <Menu items={[...]} /> with better performance and potential of writing simpler code style in your applications. Meanwhile, we deprecated the old usage in browser console, we will remove it in antd 5.0." />, mountNode);
```

```jsx
// works when >=4.20.0, recommended ✅
const items = [
  { label: 'item 1', key: 'item-1' }, // remember to pass the key prop
  { label: 'item 2', key: 'item-2' }, // which is required
  {
    label: 'sub menu',
    key: 'submenu',
    children: [{ label: 'item 3', key: 'submenu-item-1' }],
  },
];
return <Menu items={items} />;

// works when <4.20.0, deprecated when >=4.20.0 🙅🏻‍♀️
<Menu>
  <Menu.Item>item 1</Menu.Item>
  <Menu.Item>item 2</Menu.Item>
  <Menu.SubMenu title="sub menu">
    <Menu.Item>item 3</Menu.Item>
  </Menu.SubMenu>
</Menu>;
```

The legacy demo code for version `<4.20.0` could be found at [https://github.com/ant-design/ant-design/tree/4.19.5/components/menu/demo](https://github.com/ant-design/ant-design/tree/4.19.5/components/menu/demo).

## API

### Menu

| Param | Description | Type | Default value | Version |
| --- | --- | --- | --- | --- |
| defaultOpenKeys | Array with the keys of default opened sub menus | string\[] | - |  |
| defaultSelectedKeys | Array with the keys of default selected menu items | string\[] | - |  |
| expandIcon | custom expand icon of submenu | ReactNode \| `(props: SubMenuProps & { isSubMenu: boolean }) => ReactNode` | - | 4.9.0 |
| forceSubMenuRender | Render submenu into DOM before it becomes visible | boolean | false |  |
| inlineCollapsed | Specifies the collapsed status when menu is inline mode | boolean | - |  |
| inlineIndent | Indent (in pixels) of inline menu items on each level | number | 24 |  |
| items | Menu item content | [ItemType\[\]](#ItemType) | - | 4.20.0 |
| mode | Type of menu | `vertical` \| `horizontal` \| `inline` | `vertical` |  |
| multiple | Allows selection of multiple items | boolean | false |  |
| openKeys | Array with the keys of currently opened sub-menus | string\[] | - |  |
| overflowedIndicator | Customized the ellipsis icon when menu is collapsed horizontally | ReactNode | `<EllipsisOutlined />` |  |
| selectable | Allows selecting menu items | boolean | true |  |
| selectedKeys | Array with the keys of currently selected menu items | string\[] | - |  |
| style | Style of the root node | CSSProperties | - |  |
| subMenuCloseDelay | Delay time to hide submenu when mouse leaves (in seconds) | number | 0.1 |  |
| subMenuOpenDelay | Delay time to show submenu when mouse enters, (in seconds) | number | 0 |  |
| theme | Color theme of the menu | `light` \| `dark` | `light` |  |
| triggerSubMenuAction | Which action can trigger submenu open/close | `hover` \| `click` | `hover` |  |
| onClick | Called when a menu item is clicked | function({ item, key, keyPath, domEvent }) | - |  |
| onDeselect | Called when a menu item is deselected (multiple mode only) | function({ item, key, keyPath, selectedKeys, domEvent }) | - |  |
| onOpenChange | Called when sub-menus are opened or closed | function(openKeys: string\[]) | - |  |
| onSelect | Called when a menu item is selected | function({ item, key, keyPath, selectedKeys, domEvent }) | - |  |

> More options in [rc-menu](https://github.com/react-component/menu#api)

### ItemType

> type ItemType = [MenuItemType](#MenuItemType) | [SubMenuType](#SubMenuType) | [MenuItemGroupType](#MenuItemGroupType) | [MenuDividerType](#MenuDividerType);

#### MenuItemType

| Param    | Description                          | Type      | Default value | Version |
| -------- | ------------------------------------ | --------- | ------------- | ------- |
| danger   | Display the danger style             | boolean   | false         |         |
| disabled | Whether menu item is disabled        | boolean   | false         |         |
| icon     | The icon of the menu item            | ReactNode | -             |         |
| key      | Unique ID of the menu item           | string    | -             |         |
| label    | Menu label                           | ReactNode | -             |         |
| title    | Set display title for collapsed item | string    | -             |         |

> Note: `icon` is a newly added prop in `4.2.0`. For previous versions, please use the following method to define the icon.
>
> ```jsx
> <Menu.Item>
>   <PieChartOutlined />
>   <span>Option 1</span>
> </Menu.Item>
> <Menu.SubMenu
>   title={
>     <>
>       <PieChartOutlined />
>       <span>Option 2</span>
>     </>
>   }
> >
>   ...
> </Menu.SubMenu>
> ```

#### SubMenuType

| Param | Description | Type | Default value | Version |
| --- | --- | --- | --- | --- | --- |
| children | Sub-menus or sub-menu items | [ItemType\[\]](#ItemType) | - |  |
| disabled | Whether sub-menu is disabled | boolean | false |  |
| icon | Icon of sub menu | ReactNode | - |  |
| key | Unique ID of the sub-menu | string | - |  |
| label | Menu label | ReactNode | - |  |
| popupClassName | Sub-menu class name, not working when `mode="inline"` | string | - |  |
| popupOffset | Sub-menu offset, not working when `mode="inline"` | \[number, number] | - |  |
| theme | Color theme of the SubMenu (inherits from Menu by default) |  | `light` \| `dark` | - |  |
| onTitleClick | Callback executed when the sub-menu title is clicked | function({ key, domEvent }) | - |  |

#### MenuItemGroupType

Define `type` as `group` to make as group:

```ts
const groupItem = {
  type: 'group', // Must have
  label: 'My Group',
  children: [],
};
```

| Param    | Description            | Type        | Default value | Version |
| -------- | ---------------------- | ----------- | ------------- | ------- |
| children | Sub-menu items         | MenuItem\[] | -             |         |
| label    | The title of the group | ReactNode   | -             |         |

#### MenuDividerType

Divider line in between menu items, only used in vertical popup Menu or Dropdown Menu. Need define the `type` as `divider`：

```ts
const dividerItem = {
  type: 'divider', // Must have
};
```

| Param  | Description            | Type    | Default value | Version |
| ------ | ---------------------- | ------- | ------------- | ------- |
| dashed | Whether line is dashed | boolean | false         |         |

## FAQ

### Why will Menu's children be rendered twice?

Menu collects structure info with [twice-render](https://github.com/react-component/menu/blob/f4684514096d6b7123339cbe72e7b0f68db0bce2/src/Menu.tsx#L543) to support HOC usage. Merging into one render may cause the logic to become much more complex. Contributions to help improve the collection logic are welcomed.

### Why Menu do not responsive collapse in Flex layout?

Menu will render fully item in flex layout and then collapse it. You need tell flex not consider Menu width to enable responsive ([online demo](https://codesandbox.io/s/ding-bu-dao-hang-antd-4-21-7-forked-5e3imy?file=/demo.js)):

```jsx
<div style={{ flex }}>
  <div style={{ ... }}>Some Content</div>
  <Menu style={{ minWidth: 0, flex: "auto" }} />
</div>
```
