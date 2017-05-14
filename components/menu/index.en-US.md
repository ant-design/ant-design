---
category: Components
cols: 1
type: Navigation
title: Menu
---

Menu list of Navigation.

## When To Use

Navigation menu is important for a website, it helps users jump from one site section to another quickly. Mostly, it includes top navigation and side navigation. Top navigation provides all the category and functions of the website. Side navigation provides the Multi-level structure of the website.

More layout and samples: [layout](/docs/spec/layout).

```html
<Menu>
  <Menu.Item>Menu</Menu.Item>
  <SubMenu title="SubMenu">
    <Menu.Item>SubMenuItem</Menu.Item>
  </SubMenu>
</Menu>
```

## API

### Menu props

| Param    | Description   | Type     | Default value       |
|----------|---------------|----------|--------------|
| theme    | color of the theme | string: `light` `dark` | `light` |
| mode | type of the menu; vertical, horizontal, and inline modes are supported | string: vertical horizontal inline | vertical |
| selectable | allow selecting menu items | boolean | true |
| selectedKeys | array with the keys of currently selected menu items | string[] |      |
| defaultSelectedKeys | array with the keys of default selected menu items | string[] |      |
| openKeys | array with the keys of currently opened sub menus | string[] |  |
| defaultOpenKeys | array with the keys of default opened sub menus |  |      |
| onOpenChange | called when open/close sub menu | Function(openKeys: string[]) | noop |
| onSelect | callback of the selected item | Function({ item, key, selectedKeys }) | none   |
| onDeselect | callback of the deselected item, only supported for multiple mode | Function({ item, key, selectedKeys }) | - |
| onClick | callback of the clicked menu item, params: {item, key, keyPath} | function | - |
| style | style of the root node | object | |
| inlineIndent | indent px of inline menu item on each level | number | 24 |
| multiple | Allow select multiple item | boolean | false |

> More options in [rc-menu](https://github.com/react-component/menu#api)

### Menu.Item props

| Param    | Description    | Type     | Default value       |
|----------|----------------|----------|--------------|
| disabled    | disabled or not | boolean   |  false  |
| key   | unique id of the menu item |  string |  |

### Menu.SubMenu props

| Param    | Description    | Type     | Default value       |
|----------|----------------|----------|--------------|
| disabled    | disabled or not | boolean   |  false  |
| key   | unique id of the menu item |  string |  |
| title    | title of the sub menu | string\|ReactNode   |    |
| children | sub menus or sub menu items | Array<MenuItem\|SubMenu> |  |
| onTitleClick | callback of the clicked sub menu title | Function({ eventKey, domEvent }) |  |

### Menu.ItemGroup props

| Param    | Description    | Type     | Default value       |
|----------|----------------|----------|--------------|
| title    | title of the group       | string\|ReactNode |    |
| children | sub menu items    | MenuItem[] |  |

### Menu.Divider

divider line in between menu items, only used in vertical popup Menu or Dropdown Menu.
