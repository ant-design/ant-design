---
category: Components
subtitle: 输入框
type: 数据录入
title: Input
---

通过鼠标或键盘输入内容，是最基础的表单域的包装。

## 何时使用

- 需要用户输入表单域内容时。
- 提供组合型输入框，带搜索的输入框，还可以进行大小选择。

## API

### Input

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| addonAfter | 带标签的 input，设置后置标签 | string\|ReactNode |  | 3.0.0 |
| addonBefore | 带标签的 input，设置前置标签 | string\|ReactNode |  | 3.0.0 |
| defaultValue | 输入框默认内容 | string |  | 3.0.0 |
| disabled | 是否禁用状态，默认为 false | boolean | false | 3.0.0 |
| id | 输入框的 id | string |  | 3.0.0 |
| prefix | 带有前缀图标的 input | string\|ReactNode |  | 3.0.0 |
| size | 控件大小。注：标准表单内的输入框大小限制为 `large`。可选 `large` `default` `small` | string | `default` | 3.0.0 |
| suffix | 带有后缀图标的 input | string\|ReactNode |  | 3.0.0 |
| type | 声明 input 类型，同原生 input 标签的 type 属性，见：[MDN](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/input#属性)(请直接使用 `Input.TextArea` 代替 `type="textarea"`)。 | string | `text` | 3.0.0 |
| value | 输入框内容 | string |  | 3.0.0 |
| onChange | 输入框内容变化时的回调 | function(e) |  | 3.9.3 |
| onPressEnter | 按下回车的回调 | function(e) |  | 3.0.0 |
| allowClear | 可以点击清除图标删除内容 | boolean |  | 3.12.0 |

> 如果 `Input` 在 `Form.Item` 内，并且 `Form.Item` 设置了 `id` 和 `options` 属性，则 `value` `defaultValue` 和 `id` 属性会被自动设置。

Input 的其他属性和 React 自带的 [input](https://facebook.github.io/react/docs/events.html#supported-events) 一致。

### Input.TextArea

> `2.12` 后新增的组件，旧版请使用 `Input[type=textarea]`。

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| autosize | 自适应内容高度，可设置为 `true|false` 或对象：`{ minRows: 2, maxRows: 6 }` | boolean\|object | false | 3.0.0 |
| defaultValue | 输入框默认内容 | string |  | 3.0.0 |
| value | 输入框内容 | string |  | 3.0.0 |
| onPressEnter | 按下回车的回调 | function(e) |  | 3.0.0 |

`Input.TextArea` 的其他属性和浏览器自带的 [textarea](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea) 一致。

#### Input.Search

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| enterButton | 是否有确认按钮，可设为按钮文字。该属性会与 addon 冲突。 | boolean\|ReactNode | false | 3.0.0 |
| onSearch | 点击搜索或按下回车键时的回调 | function(value, event) |  | 3.0.0 |

其余属性和 Input 一致。

#### Input.Group

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| compact | 是否用紧凑模式 | boolean | false | 3.0.0 |
| size | `Input.Group` 中所有的 `Input` 的大小，可选 `large` `default` `small` | string | `default` | 3.0.0 |

```html
<Input.Group>
  <input />
  <input />
</Input.Group>
```

#### Input.Password (3.12.0 中新增)

| 参数             | 说明             | 类型    | 默认值 | 版本   |
| ---------------- | ---------------- | ------- | ------ | ------ |
| visibilityToggle | 是否显示切换按钮 | boolean | true   | 3.12.2 |

## FAQ

### 为什么我动态改变 `prefix/suffix` 时，Input 会失去焦点？

当 Input 动态添加或者删除 `prefix/suffix` 时，React 会重新创建 DOM 结构而新的 input 是没有焦点的。你可以预设一个空的 `<span />` 来保持 DOM 结构不变：

```jsx
const suffix = condition ? <Icon type="smile" /> : <span />;

<Input suffix={suffix} />;
```
