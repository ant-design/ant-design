# Menu

- category: Components
- chinese: 导航菜单
- cols: 1
- type: 导航

---

为页面和功能提供导航的菜单列表。

## 何时使用

导航菜单是一个网站的灵魂，用户依赖导航在各个页面中进行跳转。一般分为顶部导航和侧边导航，顶部导航提供全局性的类目和功能，侧边导航提供多级结构来收纳和排列网站架构。

更多布局和导航的范例可以参考：[常用布局](/spec/layout)。

```html
<Menu>
  <MenuItem>菜单项</MenuItem>
  <SubMenu title="子菜单">
    <MenuItem>子菜单项</MenuItem>
  </SubMenu>
</Menu>
```

## API

### Menu props

| 参数     | 说明           | 类型     | 默认值       |
|----------|----------------|----------|--------------|
| theme    | 主题颜色 | enum: `light` `dark` | 'light' |
| mode    | 菜单类型 | enum: `vertical` `horizontal` `inline` | vertical |
| selectedKeys | 当前选中的菜单项 key 数组 |  |      |
| defaultSelectedKeys | 初始选中的菜单项 key 数组 |  |      |
| openKeys | 当前展开的菜单项 key 数组 |  |      |
| defaultOpenKeys | 初始展开的菜单项 key 数组 |  |      |
| onSelect | 被选中时调用，参数 {item, key, selectedKeys} 对象 | function | 无   |
| onDeselect | 取消选中时调用，参数 {item, key, selectedKeys} 对象，仅在 multiple 生效 | function | 无   |
| onClick | 点击 menuitem 调用此函数，参数为 {item, key} | function | 无 |
| style | 根节点样式 | object | | |

### Menu.Item props

| 参数     | 说明           | 类型     | 默认值       |
|----------|----------------|----------|--------------|
| disabled    | 是否禁用 | Boolean   |  false  |
| key   | item 的唯一标志 |  String |  | |

### Menu.SubMenu props

| 参数     | 说明           | 类型     | 默认值       |
|----------|----------------|----------|--------------|
| title    | 子菜单项值 | String or React.Element   |    |
| children | 子菜单的菜单项 | (MenuItem or SubMenu)[] |  | |

### Menu.ItemGroup props

| 参数     | 说明           | 类型     | 默认值       |
|----------|----------------|----------|--------------|
| title    | 分组标题       | String or React.Element |    |
| children | 分组的菜单项    | MenuItem[] |  | |
