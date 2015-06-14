# Dropdown

- category: Components
- chinese: 下拉菜单
- order: 6

---

向下弹出的列表。

## 何时使用

当页面元素过多时，用此组件可以收纳元素。点击或移入触点，会出现一个下拉菜单。可在列表中进行选择，并执行相应的命令。

## API

属性如下

| 成员        | 说明           | 类型               | 默认值       |
|-------------|----------------|--------------------|--------------|
| animation   | 动画名称       | String             | slide-up     |
| trigger     | 触发下来行为   | "click" or "hover" | hover        |
| overlay     | 菜单节点       | React.Element      | 无           |


菜单可由 `antd.Menu` 取得，可设置 `onClick` 回调，菜单还包括菜单项 `antd.Menu.Item`，分割线 `antd.Menu.Divider`。

> 注意： Menu.Item 必须设置唯一的 key 属性。
