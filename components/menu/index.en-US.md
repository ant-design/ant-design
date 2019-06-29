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

| Param | Description | Type | Default value | Version Added |
| --- | --- | --- | --- | --- |
| defaultOpenKeys | array with the keys of default opened sub menus | string\[] |  | 3.0.0 |
| defaultSelectedKeys | array with the keys of default selected menu items | string\[] |  | 3.0.0 |
| forceSubMenuRender | render submenu into DOM before it shows | boolean | false | 3.0.0 |
| inlineCollapsed | specifies the collapsed status when menu is inline mode | boolean | - | 3.0.0 |
| inlineIndent | indent px of inline menu item on each level | number | 24 | 3.0.0 |
| mode | type of the menu; `vertical`, `horizontal`, and `inline` modes are supported | string: `vertical` \| `horizontal` \| `inline` | `vertical` | 3.0.0 |
| multiple | Allow selection of multiple items | boolean | false | 3.0.0 |
| openKeys | array with the keys of currently opened sub menus | string\[] |  | 3.0.0 |
| selectable | allow selecting menu items | boolean | true | 3.0.0 |
| selectedKeys | array with the keys of currently selected menu items | string\[] |  | 3.0.0 |
| style | style of the root node | object |  | 3.0.0 |
| subMenuCloseDelay | delay time to hide submenu when mouse leave, unit: second | number | 0.1 | 3.0.0 |
| subMenuOpenDelay | delay time to show submenu when mouse enter, unit: second | number | 0 | 3.0.0 |
| theme | color theme of the menu | string: `light` `dark` | `light` | 3.0.0 |
| onClick | callback executed when a menu item is clicked | function({ item, key, keyPath, domEvent }) | - | 3.0.0 |
| onDeselect | callback executed when a menu item is deselected, only supported for multiple mode | function({ item, key, keyPath, selectedKeys, domEvent }) | - | 3.0.0 |
| onOpenChange | called when open/close sub menu | function(openKeys: string\[]) | noop | 3.0.0 |
| onSelect | callback executed when a menu item is selected | function({ item, key, keyPath, selectedKeys, domEvent }) | none | 3.0.0 |
| overflowedIndicator | Customized icon when menu collapsed | ReactNode | - | 3.16.0 |

> More options in [rc-menu](https://github.com/react-component/menu#api)

### Menu.Item

| Param    | Description                          | Type    | Default value | Version Added |
| -------- | ------------------------------------ | ------- | ------------- | ------------- |
| disabled | whether menu item is disabled or not | boolean | false         | 3.0.0         |
| key      | unique id of the menu item           | string  |               | 3.0.0         |
| title    | set display title for collapsed item | string  |               | 3.11.0        |

### Menu.SubMenu

| Param | Description | Type | Default value | Version Added |
| --- | --- | --- | --- | --- |
| children | sub menus or sub menu items | Array&lt;MenuItem\|SubMenu> |  | 3.0.0 |
| disabled | whether sub menu is disabled or not | boolean | false | 3.0.0 |
| key | unique id of the sub menu | string |  | 3.0.0 |
| title | title of the sub menu | string\|ReactNode |  | 3.0.0 |
| onTitleClick | callback executed when the sub menu title is clicked | function({ key, domEvent }) |  | 3.0.0 |

### Menu.ItemGroup

| Param    | Description        | Type              | Default value | Version Added |
| -------- | ------------------ | ----------------- | ------------- | ------------- |
| children | sub menu items     | MenuItem\[]       |               | 3.0.0         |
| title    | title of the group | string\|ReactNode |               | 3.0.0         |

### Menu.Divider

Divider line in between menu items, only used in vertical popup Menu or Dropdown Menu.
