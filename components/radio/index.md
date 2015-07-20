# Radio

- category: Components
- chinese: 单选框
- order: 2

---

## 何时使用

- 用于在多个备选项中选中单个状态。
- 和 Select 的区别是，Radio 所有选项默认可见，方便用户在比较中选择，因此选项不宜过多。


## API

### Radio
单选框。

| 参数           | 说明                                     | 类型       |  必选值 | 默认值 |
|----------------|------------------------------------------|------------|---------|--------|
| checked        | 指定当前是否选中                         | boolean    |  false   | false  |
| defaultChecked | 初始是否选中 | boolean | false | false |
| value          | 组合时根据此项判定checked | -- |true | null|

### RadioGroup

单选框组合；

| 参数           | 说明                                     | 类型       |  必选值 | 默认值 |
|----------------|------------------------------------------|------------|---------|--------|
| onChange       | 变化时回调函数，组合时必须 | Function(e:Event) | false | null |
