# Menu

- category: Components
- chinese: 导航菜单

---

为页面和功能提供导航的菜单列表。

## 何时使用

导航菜单是一个网站的灵魂，用户依赖导航在各个页面中进行跳转。一般分为顶部导航和侧边导航，顶部导航提供全局性的类目和功能，侧边导航提供多级结构来收纳和排列网站架构。

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
| horizontal    | 是否横向菜单 | boolean   |  false  |
| vertical    | 是否侧向菜单 | boolean   |  false  |
| multiple   | 支持多选 |   | false |
| selectedKeys | 选中的菜单项 key 数组 |  |      |
| onSelect | 被选中时调用，参数为选中的 menuitem key 值 | function | 无   |
| onDeselect | 取消选中时调用，参数为选中的 menuitem key 值，仅在multiple生效 | function | 无   |
| onClick | 点击 menuitem 调用此函数，参数为点击的 menuitem key 值 | function | 无 |
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
| align    | 子菜单的对齐配置 | object   | {points:['lt','rt']} 弹出子菜单的 left top 和子菜单项的 right top 对齐   |
| children   | (MenuItem or SubMenu)[] |  子菜单的菜单项 | | |
