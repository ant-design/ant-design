# Transfer

- category: Components
- chinese: 穿梭框
- type: 表单

---

双栏选择框

## 何时使用

- 需要表示开关状态/两种状态之间的切换时；
- 和 `switch`的区别是，切换 `switch` 会直接触发状态改变，而 `checkbox` 一般用于状态标记，需要和提交操作配合。

## API

### Checkbox

| 参数      | 说明                                     | 类型       |  可选值 |默认值 |
|-----------|------------------------------------------|------------|-------|--------|
|  dataSource | 指定当前是否选中 | boolean  |   | false    |
|  defaultChecked | 初始是否选中 | boolean |  | false |
|  onChange | 变化时回调函数 | Function(e:Event) |  |  | |
