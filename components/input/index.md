---
category: Components
chinese: 输入框
type: Form Control
english: Input
---

通过鼠标或键盘输入内容，是最基础的表单域的包装。

## 何时使用

- 需要用户输入表单域内容时。
- 提供组合型输入框，带搜索的输入框，还可以进行大小选择。



## API

### Input

| 参数      | 说明                                     | 类型       |  可选值 | 默认值 |
|-----------|------------------------------------------|------------|-------|--------|
| type | 【必须】声明 input 类型，同原生 input 标签的 type 属性 | string  |   | 'text'    |
| id | id | number 或 string |  |   |
| value | value 值 | any |  | |
| defaultValue | 设置初始默认值 | any |  |  |
| size | 控件大小，默认值为 default 。注：标准表单内的输入框大小限制为 large。 | string | {'large','default','small'} |  'default' |
| disabled | 是否禁用状态，默认为 false | bool |  |  false |
| addonBefore | 带标签的 input，设置前置标签 | node |  |   |
| addonAfter | 带标签的 input，设置后置标签 | node |  |   |
| onPressEnter | 按下回车的回调 | function(e) |  |  |

> 如果 `Input` 在 `Form.Item` 内，并且 `Form.Item` 设置了 `id` 和 `options` 属性，则 `value` `defaultValue` 和 `id` 属性会被自动设置。

#### Input.Group

| 参数      | 说明                                     | 类型       |  可选值 | 默认值 |
|-----------|------------------------------------------|------------|-------|--------|
|  size | `Input.Group` 中所有的 `Input` 的大小 | string | {'large','default','small'} |  'default' |

```html
<Input.Group className={string}>
  <Input />
  <Input />
</Input.Group>
```