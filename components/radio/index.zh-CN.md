---
category: Components
subtitle: 单选框
type: Data Entry
title: Radio
---

单选框。

## 何时使用

- 用于在多个备选项中选中单个状态。
- 和 Select 的区别是，Radio 所有选项默认可见，方便用户在比较中选择，因此选项不宜过多。

## API

### Radio

| 参数           | 说明                                     | 类型       |  可选值 | 默认值 |
|----------------|------------------------------------------|------------|---------|--------|
| checked        | 指定当前是否选中                         | boolean    |         | false  |
| defaultChecked | 初始是否选中                             | boolean    |         | false  |
| value          | 根据 value 进行比较，判断是否选中        | any     |         | 无     |

### RadioGroup

单选框组合，用于包裹一组 `Radio`。

| 参数           | 说明                             | 类型              | 可选值 | 默认值 |
|----------------|----------------------------------|-------------------|--------|--------|
| onChange       | 选项变化时的回调函数             | Function(e:Event) | 无     | 无     |
| value          | 用于设置当前选中的值             | any            | 无     | 无     |
| defaultValue   | 默认选中的值                     | any            | 无     | 无     |
| size           | 大小，只对按钮样式生效           | string            | `large` `default` `small` | `default` |
