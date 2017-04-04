---
category: Components
subtitle: 输入框
type: Data Entry
title: Input
---

通过鼠标或键盘输入内容，是最基础的表单域的包装。

## 何时使用

- 需要用户输入表单域内容时。
- 提供组合型输入框，带搜索的输入框，还可以进行大小选择。

## API

### Input

| 参数      | 说明                                     | 类型       | 默认值 |
|-----------|-----------------------------------------|------------|-------|--------|
| type | 声明 input 类型，同原生 input 标签的 type 属性。另外提供 `type="textarea"`。 | string  | `text` |
| id | 输入框的 id | string | |
| value | 输入框内容 | string | |
| defaultValue | 输入框默认内容 | string | |
| size | 控件大小。注：标准表单内的输入框大小限制为 `large`。可选 `large` `default` `small` | string | `default` |
| disabled | 是否禁用状态，默认为 false | boolean | false |
| addonBefore | 带标签的 input，设置前置标签 | string\|ReactNode | |
| addonAfter | 带标签的 input，设置后置标签 | string\|ReactNode | |
| prefix | 带有前缀图标的 input | string\|ReactNode | |
| suffix | 带有后缀图标的 input | string\|ReactNode | |
| onPressEnter | 按下回车的回调 | function(e) | |
| autosize | 自适应内容高度，只对 `type="textarea"` 有效，可设置为 `true|false` 或对象：`{ minRows: 2, maxRows: 6 }` | boolean\|object | false |

> 如果 `Input` 在 `Form.Item` 内，并且 `Form.Item` 设置了 `id` 和 `options` 属性，则 `value` `defaultValue` 和 `id` 属性会被自动设置。

Input 的其他属性和 React 自带的 [input](https://facebook.github.io/react/docs/events.html#supported-events) 一致。

#### Input.Search

`Added in 2.5.0`

| 参数      | 说明                                     | 类型       | 默认值 |
|-----------|-----------------------------------------|-----------|-------|
| onSearch | 点击搜索或按下回车键时的回调                 | function(value) |  |

其余属性和 Input 一致。

#### Input.Group

| 参数      | 说明                                     | 类型         | 默认值 |
|-----------|-----------------------------------------|-------------|-------|
|  size | `Input.Group` 中所有的 `Input` 的大小，可选 `large` `default` `small` | string | `default` |
|  compact | 是否用紧凑模式 | boolean | false |


```html
<Input.Group>
  <Input />
  <Input />
</Input.Group>
```
