---
category: Components
cols: 1
type: Navigation
title: Menu
subtitle: 导航菜单
---

为页面和功能提供导航的菜单列表。

## 何时使用

导航菜单是一个网站的灵魂，用户依赖导航在各个页面中进行跳转。一般分为顶部导航和侧边导航，顶部导航提供全局性的类目和功能，侧边导航提供多级结构来收纳和排列网站架构。

更多布局和导航的范例可以参考：[常用布局](/docs/spec/layout)。

```html
<Menu>
  <Menu.Item>菜单项</Menu.Item>
  <SubMenu title="子菜单">
    <Menu.Item>子菜单项</Menu.Item>
  </SubMenu>
</Menu>
```

## API

### Menu props

| 参数     | 说明           | 类型     | 默认值       |
|----------|---------------|----------|--------------|
| theme    | 主题颜色 | string: `light` `dark` | `light` |
| mode | 菜单类型，现在支持垂直、水平、和内嵌模式三种 | string: `vertical` `horizontal` `inline` | `vertical` |
| selectedKeys | 当前选中的菜单项 key 数组 | string[] |      |
| defaultSelectedKeys | 初始选中的菜单项 key 数组 | string[] |      |
| openKeys | 当前展开的 SubMenu 菜单项 key 数组 | string[] |  |
| defaultOpenKeys | 初始展开的 SubMenu 菜单项 key 数组 |  |      |
| onOpenChange | SubMenu 展开/关闭的回调 | Function(openKeys: string[]) | noop |
| onSelect | 被选中时调 | Function({ item, key, selectedKeys }) | 无   |
| onDeselect | 取消选中时调用，仅在 multiple 生效 | Function({ item, key, selectedKeys }) | - |
| onClick | 点击 menuitem 调用此函数，参数为 {item, key, keyPath} | function | - |
| style | 根节点样式 | object | |
| inlineIndent | inline 模式的菜单缩进宽度 | number | 24 |
| multiple | 是否允许多选 | boolean | false |

> More options in [rc-menu](https://github.com/react-component/menu#api)

### Menu.Item props

| 参数     | 说明           | 类型     | 默认值       |
|----------|----------------|----------|--------------|
| disabled    | 是否禁用 | boolean   |  false  |
| key   | item 的唯一标志 |  string |  |

### Menu.SubMenu props

| 参数     | 说明           | 类型     | 默认值       |
|----------|----------------|----------|--------------|
| disabled    | 是否禁用 | boolean   |  false  |
| key | 唯一标志 |  string |  |
| title    | 子菜单项值 | string\|ReactNode |    |
| children | 子菜单的菜单项 | Array<MenuItem\|SubMenu> |  |
| onTitleClick | 点击子菜单标题 | Function({ eventKey, domEvent }) |  |

### Menu.ItemGroup props

| 参数     | 说明           | 类型     | 默认值       |
|----------|----------------|----------|--------------|
| title    | 分组标题       | string\|ReactNode |    |
| children | 分组的菜单项    | MenuItem[] |  |

### Menu.Divider

菜单项分割线，只用在弹出菜单内。
