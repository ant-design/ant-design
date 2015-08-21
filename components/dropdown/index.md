# Dropdown

- category: Components
- chinese: 下拉菜单
- order: 13

---

向下弹出的列表。

## 何时使用

当页面上的操作命令过多时，用此组件可以收纳操作元素。点击或移入触点，会出现一个下拉菜单。可在列表中进行选择，并执行相应的命令。

## API

属性如下

| 成员        | 说明             | 类型               | 默认值       |
|-------------|------------------|--------------------|--------------|
| trigger     | 触发下拉的行为   | "click" or "hover" | hover        |
| overlay     | 菜单节点         | React.Element      | 无           |
| onSelect    | 选择后的回调     | function(e) {}     | 无           |


菜单可由 `antd.Menu` 取得，可设置 `onSelect` 回调，菜单还包括菜单项 `antd.Menu.Item`，分割线 `antd.Menu.Divider`。

> 注意： Menu.Item 必须设置唯一的 key 属性。
