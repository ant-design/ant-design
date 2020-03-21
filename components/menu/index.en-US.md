---
category: Components
cols: 1
type: Navigation
title: Menu
---

A versatile menu for navigation.

## When To Use

Navigation is an important part of any website, as a good navigation setup allows users to move around the site quickly and efficiently. Ant Design offers top and side navigation options. Top navigation provides all the categories and functions of the website. Side navigation provides the multi-level structure of the website.

More layouts with navigation: [Layout](/components/layout).

## API

```jsx
<Menu>
  <Menu.Item>Menu</Menu.Item>
  <SubMenu title="SubMenu">
    <Menu.Item>SubMenuItem</Menu.Item>
  </SubMenu>
</Menu>
```

### Menu

| Param | Description | Type | Default value | Version |
| --- | --- | --- | --- | --- |
| defaultOpenKeys | Array with the keys of default opened sub menus | string\[] |  |  |
| defaultSelectedKeys | Array with the keys of default selected menu items | string\[] |  |  |
| forceSubMenuRender | Render submenu into DOM before it becomes visible | boolean | false |  |
| inlineCollapsed | Specifies the collapsed status when menu is inline mode | boolean | - |  |
| inlineIndent | Indent (in pixels) of inline menu items on each level | number | 24 |  |
| mode | Type of menu; `vertical`, `horizontal`, or `inline` | `vertical` \| `horizontal` \| `inline` | `vertical` |  |
| multiple | Allows selection of multiple items | boolean | false |  |
| openKeys | Array with the keys of currently opened sub-menus | string\[] |  |  |
| selectable | Allows selecting menu items | boolean | true |  |
| selectedKeys | Array with the keys of currently selected menu items | string\[] |  |  |
| style | Style of the root node | object |  |  |
| subMenuCloseDelay | Delay time to hide submenu when mouse leaves (in seconds) | number | 0.1 |  |
| subMenuOpenDelay | Delay time to show submenu when mouse enters, (in seconds) | number | 0 |  |
| theme | Color theme of the menu | `light` \| `dark` | `light` |  |
| onClick | Called when a menu item is clicked | function({ item, key, keyPath, domEvent }) | - |  |
| onDeselect | Called when a menu item is deselected (multiple mode only) | function({ item, key, keyPath, selectedKeys, domEvent }) | - |  |
| onOpenChange | Called when sub-menus are opened or closed | function(openKeys: string\[]) | noop |  |
| onSelect | Called when a menu item is selected | function({ item, key, keyPath, selectedKeys, domEvent }) | none |  |
| overflowedIndicator | Customized icon when menu is collapsed | ReactNode | - |  |

> More options in [rc-menu](https://github.com/react-component/menu#api)

### Menu.Item

| Param    | Description                          | Type    | Default value | Version |
| -------- | ------------------------------------ | ------- | ------------- | ------- |
| disabled | Whether menu item is disabled        | boolean | false         |         |
| key      | Unique ID of the menu item           | string  |               |         |
| title    | Set display title for collapsed item | string  |               |         |

### Menu.SubMenu

| Param | Description | Type | Default value | Version |
| --- | --- | --- | --- | --- |
| popupClassName | Sub-menu class name | string |  |  |
| children | Sub-menus or sub-menu items | Array&lt;MenuItem\|SubMenu> |  |  |
| disabled | Whether sub-menu is disabled | boolean | false |  |
| key | Unique ID of the sub-menu | string |  |  |
| title | Title of the sub-menu | string\|ReactNode |  |  |
| onTitleClick | Callback executed when the sub-menu title is clicked | function({ key, domEvent }) |  |  |

### Menu.ItemGroup

| Param    | Description        | Type              | Default value | Version |
| -------- | ------------------ | ----------------- | ------------- | ------- |
| children | sub-menu items     | MenuItem\[]       |               |         |
| title    | title of the group | string\|ReactNode |               |         |

### Menu.Divider

Divider line in between menu items, only used in vertical popup Menu or Dropdown Menu.
