---
category: Components
cols: 1
type: Navigation
title: Menu
---

Menu list of Navigation.

## When To Use

Navigation menu is important for a website, it helps users jump from one site section to another quickly. Mostly, it includes top navigation and side navigation. Top navigation provides all the category and functions of the website. Side navigation provides the Multi-level structure of the website.

More layouts with navigation: [layout](/components/layout).

## API

```html
<Menu>
  <Menu.Item>Menu</Menu.Item>
  <SubMenu title="SubMenu">
    <Menu.Item>SubMenuItem</Menu.Item>
  </SubMenu>
</Menu>
```

### Menu

| Param    | Description   | Type     | Default value       |
|----------|---------------|----------|--------------|
| theme    | color theme of the menu | string: `light` `dark` | `light` |
| mode | type of the menu; `vertical`, `horizontal`, and `inline` modes are supported | string: `vertical` \| `horizontal` \| `inline` | `vertical` |
| selectable | allow selecting menu items | boolean | true |
| selectedKeys | array with the keys of currently selected menu items | string[] |      |
| defaultSelectedKeys | array with the keys of default selected menu items | string[] |      |
| openKeys | array with the keys of currently opened sub menus | string[] |  |
| defaultOpenKeys | array with the keys of default opened sub menus |  |      |
| onOpenChange | called when open/close sub menu | function(openKeys: string[]) | noop |
| onSelect | callback executed when a menu item is selected | function({ item, key, selectedKeys }) | none   |
| onDeselect | callback executed when a menu item is deselected, only supported for multiple mode | function({ item, key, selectedKeys }) | - |
| onClick | callback executed when a menu item is clicked | function({ item, key, keyPath }) | - |
| style | style of the root node | object | |
| inlineIndent | indent px of inline menu item on each level | number | 24 |
| multiple | Allow selection of multiple items | boolean | false |
| inlineCollapsed | specifies the collapsed status when menu is inline mode | boolean | - |
| selectable | Allow to be selected | boolean | true |

> More options in [rc-menu](https://github.com/react-component/menu#api)

### Menu.Item

| Param    | Description    | Type     | Default value       |
|----------|----------------|----------|--------------|
| disabled    | whether menu item is disabled or not | boolean   |  false  |
| key   | unique id of the menu item |  string |  |

### Menu.SubMenu

| Param    | Description    | Type     | Default value       |
|----------|----------------|----------|--------------|
| disabled    | whether sub menu is disabled or not | boolean   |  false  |
| key   | unique id of the sub menu |  string |  |
| title    | title of the sub menu | string\|ReactNode   |    |
| children | sub menus or sub menu items | Array<MenuItem\|SubMenu> |  |
| onTitleClick | callback executed when the sub menu title is clicked | function({ key, domEvent }) |  |

### Menu.ItemGroup

| Param    | Description    | Type     | Default value       |
|----------|----------------|----------|--------------|
| title    | title of the group       | string\|ReactNode |    |
| children | sub menu items    | MenuItem[] |  |

### Menu.Divider

Divider line in between menu items, only used in vertical popup Menu or Dropdown Menu.
