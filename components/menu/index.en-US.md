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
<menu>
  <Menu.Item>Menu</Menu.Item>
  <SubMenu title="SubMenu">
    <Menu.Item>SubMenuItem</Menu.Item>
  </SubMenu>
</menu>
```

### Menu

| Param | Description | Type | Default value | Version |
| --- | --- | --- | --- | --- |
| defaultOpenKeys | array with the keys of default opened sub menus | string\[] |  |  |
| defaultSelectedKeys | array with the keys of default selected menu items | string\[] |  |  |
| forceSubMenuRender | render submenu into DOM before it shows | boolean | false |  |
| inlineCollapsed | specifies the collapsed status when menu is inline mode | boolean | - |  |
| inlineIndent | indent px of inline menu item on each level | number | 24 |  |
| mode | type of the menu; `vertical`, `horizontal`, and `inline` modes are supported | string: `vertical` \| `horizontal` \| `inline` | `vertical` |  |
| multiple | Allow selection of multiple items | boolean | false |  |
| openKeys | array with the keys of currently opened sub menus | string\[] |  |  |
| selectable | allow selecting menu items | boolean | true |  |
| selectedKeys | array with the keys of currently selected menu items | string\[] |  |  |
| style | style of the root node | object |  |  |
| subMenuCloseDelay | delay time to hide submenu when mouse leave, unit: second | number | 0.1 |  |
| subMenuOpenDelay | delay time to show submenu when mouse enter, unit: second | number | 0 |  |
| theme | color theme of the menu | string: `light` `dark` | `light` |  |
| onClick | callback executed when a menu item is clicked | function({ item, key, keyPath, domEvent }) | - |  |
| onDeselect | callback executed when a menu item is deselected, only supported for multiple mode | function({ item, key, keyPath, selectedKeys, domEvent }) | - |  |
| onOpenChange | called when open/close sub menu | function(openKeys: string\[]) | noop |  |
| onSelect | callback executed when a menu item is selected | function({ item, key, keyPath, selectedKeys, domEvent }) | none |  |
| overflowedIndicator | Customized icon when menu collapsed | ReactNode | - | 3.16.0 |

> More options in [rc-menu](https://github.com/react-component/menu#api)

### Menu.Item

| Param    | Description                          | Type    | Default value | Version |
| -------- | ------------------------------------ | ------- | ------------- | ------- |
| disabled | whether menu item is disabled or not | boolean | false         |         |
| key      | unique id of the menu item           | string  |               |         |
| title    | set display title for collapsed item | string  |               | 3.11.0  |

### Menu.SubMenu

| Param | Description | Type | Default value | Version |
| --- | --- | --- | --- | --- |
| popupClassName | sub menu class name | string |  | 3.22.0 |
| children | sub menus or sub menu items | Array&lt;MenuItem\|SubMenu> |  |  |
| disabled | whether sub menu is disabled or not | boolean | false |  |
| key | unique id of the sub menu | string |  |  |
| title | title of the sub menu | string\|ReactNode |  |  |
| onTitleClick | callback executed when the sub menu title is clicked | function({ key, domEvent }) |  |  |

### Menu.ItemGroup

| Param    | Description        | Type              | Default value | Version |
| -------- | ------------------ | ----------------- | ------------- | ------- |
| children | sub menu items     | MenuItem\[]       |               |         |
| title    | title of the group | string\|ReactNode |               |         |

### Menu.Divider

Divider line in between menu items, only used in vertical popup Menu or Dropdown Menu.
