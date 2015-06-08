# Dropdown

- category: Components
- chinese: 下拉菜单

---

下拉菜单

## 何时使用

需要点击一个触点出现一个菜单时使用

## API

属性如下

| 成员     | 说明           | 类型             | 默认值       |
|----------|----------------|------------------|--------------|
| animation    | 动画名称           | String ("slide-up")    | 无           |
| trigger    | 触发下来行为           | "click" or "mouse"    | 无           |
| overlay  | 菜单节点       | React.Element    | 无           |


菜单可由 antd.Menu 取得，可设置 onClick 回调，菜单还包括菜单项 antd.Menu.Item，分割线 antd.Menu.Divider

注意： Menu.Item 必须设置唯一的 key 属性
