---
category: Components
subtitle: 输入框
type: 数据录入
title: Input
cover: https://gw.alipayobjects.com/zos/alicdn/xS9YEJhfe/Input.svg
---

通过鼠标或键盘输入内容，是最基础的表单域的包装。

## 何时使用

- 需要用户输入表单域内容时。
- 提供组合型输入框，带搜索的输入框，还可以进行大小选择。

## API

### Input

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| addonAfter | 带标签的 input，设置后置标签 | string \| ReactNode | - |  |
| addonBefore | 带标签的 input，设置前置标签 | string \| ReactNode | - |  |
| defaultValue | 输入框默认内容 | string | - |  |
| disabled | 是否禁用状态，默认为 false | boolean | false |  |
| id | 输入框的 id | string | - |  |
| maxLength | 最大长度 | number | - |  |
| prefix | 带有前缀图标的 input | string \| ReactNode | - |  |
| size | 控件大小。注：标准表单内的输入框大小限制为 `large` | `large` \| `middle` \| `small` | - |  |
| suffix | 带有后缀图标的 input | string \| ReactNode | - |  |
| type | 声明 input 类型，同原生 input 标签的 type 属性，见：[MDN](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/input#属性)(请直接使用 `Input.TextArea` 代替 `type="textarea"`) | string | `text` |  |
| value | 输入框内容 | string | - |  |
| onChange | 输入框内容变化时的回调 | function(e) | - |  |
| onPressEnter | 按下回车的回调 | function(e) | - |  |
| allowClear | 可以点击清除图标删除内容 | boolean | - |  |
| bordered | 是否有边框 | boolean | true | 4.5.0 |

> 如果 `Input` 在 `Form.Item` 内，并且 `Form.Item` 设置了 `id` 和 `options` 属性，则 `value` `defaultValue` 和 `id` 属性会被自动设置。

Input 的其他属性和 React 自带的 [input](https://facebook.github.io/react/docs/events.html#supported-events) 一致。

### Input.TextArea

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| autoSize | 自适应内容高度，可设置为 true \| false 或对象：{ minRows: 2, maxRows: 6 } | boolean \| object | false |  |
| defaultValue | 输入框默认内容 | string | - |  |
| value | 输入框内容 | string | - |  |
| onPressEnter | 按下回车的回调 | function(e) | - |  |
| allowClear | 可以点击清除图标删除内容 | boolean | false |  |
| onResize | resize 回调 | function({ width, height }) | - |  |
| bordered | 是否有边框 | boolean | true | 4.5.0 |

`Input.TextArea` 的其他属性和浏览器自带的 [textarea](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea) 一致。

#### Input.Search

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| enterButton | 是否有确认按钮，可设为按钮文字。该属性会与 `addonAfter` 冲突。 | boolean \| ReactNode | false |
| onSearch | 点击搜索或按下回车键时的回调 | function(value, event) | - |
| loading | 搜索 loading | boolean | false |

其余属性和 Input 一致。

#### Input.Group

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| compact | 是否用紧凑模式 | boolean | false |
| size | `Input.Group` 中所有的 `Input` 的大小，可选 `large` `default` `small` | string | `default` |

```jsx
<Input.Group>
  <input />
  <input />
</Input.Group>
```

#### Input.Password

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| visibilityToggle | 是否显示切换按钮 | boolean | true |  |
| iconRender | 自定义切换按钮 | (visible) => ReactNode | (visible) => (visible ? &lt;EyeOutlined /> : &lt;EyeInvisibleOutlined />) | 4.3.0 |

## FAQ

### 为什么我动态改变 `prefix/suffix` 时，Input 会失去焦点？

当 Input 动态添加或者删除 `prefix/suffix` 时，React 会重新创建 DOM 结构而新的 input 是没有焦点的。你可以预设一个空的 `<span />` 来保持 DOM 结构不变：

```jsx
const suffix = condition ? <Icon type="smile" /> : <span />;

<Input suffix={suffix} />;
```
