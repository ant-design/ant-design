---
category: Components
group: 数据录入
title: Input
subtitle: 输入框
description: 通过鼠标或键盘输入内容，是最基础的表单域的包装。
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*Y3R0RowXHlAAAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*sBqqTatJ-AkAAAAAAAAAAAAADrJ8AQ/original
demo:
  cols: 2
---

## 何时使用

- 需要用户输入表单域内容时。
- 提供组合型输入框，带搜索的输入框，还可以进行大小选择。

## 代码演示

<!-- prettier-ignore -->
<code src="./demo/basic.tsx">基本使用</code>
<code src="./demo/size.tsx">三种大小</code>
<code src="./demo/variant.tsx" version="5.13.0">变体</code>
<code src="./demo/filled-debug.tsx" debug>面性变体 Debug</code>
<code src="./demo/addon.tsx">前置/后置标签</code>
<code src="./demo/compact-style.tsx">紧凑模式</code>
<code src="./demo/group.tsx" debug>输入框组合</code>
<code src="./demo/search-input.tsx">搜索框</code>
<code src="./demo/search-input-loading.tsx">搜索框 loading</code>
<code src="./demo/textarea.tsx">文本域</code>
<code src="./demo/autosize-textarea.tsx">适应文本高度的文本域</code>
<code src="./demo/otp.tsx" version="5.16.0">一次性密码框</code>
<code src="./demo/tooltip.tsx">输入时格式化展示</code>
<code src="./demo/presuffix.tsx">前缀和后缀</code>
<code src="./demo/password-input.tsx">密码框</code>
<code src="./demo/allowClear.tsx">带移除图标</code>
<code src="./demo/show-count.tsx">带字数提示</code>
<code src="./demo/advance-count.tsx" version=">= 5.10.0">定制计数能力</code>
<code src="./demo/status.tsx">自定义状态</code>
<code src="./demo/focus.tsx">聚焦</code>
<code src="./demo/borderless-debug.tsx" debug>Style Debug</code>
<code src="./demo/align.tsx" debug>文本对齐</code>
<code src="./demo/textarea-resize.tsx" debug>文本域</code>
<code src="./demo/debug-addon.tsx" debug>debug 前置/后置标签</code>
<code src="./demo/component-token.tsx" debug>debug token</code>

## API

通用属性参考：[通用属性](/docs/react/common-props)

### Input

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| addonAfter | 带标签的 input，设置后置标签 | ReactNode | - |  |
| addonBefore | 带标签的 input，设置前置标签 | ReactNode | - |  |
| allowClear | 可以点击清除图标删除内容 | boolean \| { clearIcon: ReactNode } | - |  |
| ~~bordered~~ | 是否有边框 | boolean | true | 4.5.0 |
| classNames | 语义化结构 class | Record<[SemanticDOM](#input-1), string> | - | 5.4.0 |
| count | 字符计数配置 | [CountConfig](#countconfig) | - | 5.10.0 |
| defaultValue | 输入框默认内容 | string | - |  |
| disabled | 是否禁用状态，默认为 false | boolean | false |  |
| id | 输入框的 id | string | - |  |
| maxLength | 最大长度 | number | - |  |
| prefix | 带有前缀图标的 input | ReactNode | - |  |
| showCount | 是否展示字数 | boolean \| { formatter: (info: { value: string, count: number, maxLength?: number }) => ReactNode } | false | 4.18.0 info.value: 4.23.0 |
| status | 设置校验状态 | 'error' \| 'warning' | - | 4.19.0 |
| styles | 语义化结构 style | Record<[SemanticDOM](#input-1), CSSProperties> | - | 5.4.0 |
| size | 控件大小。注：标准表单内的输入框大小限制为 `middle` | `large` \| `middle` \| `small` | - |  |
| suffix | 带有后缀图标的 input | ReactNode | - |  |
| type | 声明 input 类型，同原生 input 标签的 type 属性，见：[MDN](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/input#属性)(请直接使用 `Input.TextArea` 代替 `type="textarea"`) | string | `text` |  |
| value | 输入框内容 | string | - |  |
| variant | 形态变体 | `outlined` \| `borderless` \| `filled` | `outlined` | 5.13.0 |
| onChange | 输入框内容变化时的回调 | function(e) | - |  |
| onPressEnter | 按下回车的回调 | function(e) | - |  |
| onClear | 按下清除按钮的回调 | () => void | - | 5.20.0 |

> 如果 `Input` 在 `Form.Item` 内，并且 `Form.Item` 设置了 `id` 属性，则 `value` `defaultValue` 和 `id` 属性会被自动设置。

Input 的其他属性和 React 自带的 [input](https://reactjs.org/docs/dom-elements.html#all-supported-html-attributes) 一致。

#### CountConfig

```tsx
interface CountConfig {
  // 最大字符数，不同于原生 `maxLength`，超出后标红但不会截断
  max?: number;
  // 自定义字符计数，例如标准 emoji 长度大于 1，可以自定义计数策略将其改为 1
  strategy?: (value: string) => number;
  // 同 `showCount`
  show?: boolean | ((args: { value: string; count: number; maxLength?: number }) => ReactNode);
  // 当字符数超出 `count.max` 时的自定义裁剪逻辑，不配置时不进行裁剪
  exceedFormatter?: (value: string, config: { max: number }) => string;
}
```

### Input.TextArea

同 Input 属性，外加：

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| autoSize | 自适应内容高度，可设置为 true \| false 或对象：{ minRows: 2, maxRows: 6 } | boolean \| object | false |  |
| classNames | 语义化结构 class | Record<[SemanticDOM](#inputtextarea-1), string> | - | 5.4.0 |
| styles | 语义化结构 style | Record<[SemanticDOM](#inputtextarea-1), CSSProperties> | - | 5.4.0 |

`Input.TextArea` 的其他属性和浏览器自带的 [textarea](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea) 一致。

### Input.Search

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| enterButton | 是否有确认按钮，可设为按钮文字。该属性会与 `addonAfter` 冲突。 | ReactNode | false |
| loading | 搜索 loading | boolean | false |
| onSearch | 点击搜索图标、清除图标，或按下回车键时的回调 | function(value, event, { source: "input" \| "clear" }) | - |

其余属性和 Input 一致。

### Input.Password

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| iconRender | 自定义切换按钮 | (visible) => ReactNode | (visible) => (visible ? &lt;EyeOutlined /> : &lt;EyeInvisibleOutlined />) | 4.3.0 |
| visibilityToggle | 是否显示切换按钮或者控制密码显隐 | boolean \| [VisibilityToggle](#visibilitytoggle) | true |  |

### Input.OTP

`5.16.0` 新增。

> 开发者注意事项：
>
> 当 `mask` 属性的类型为 string 时，我们强烈推荐接收单个字符或单个 emoji，如果传入多个字符或多个 emoji，则会在控制台抛出警告。

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| defaultValue | 默认值 | string | - |  |
| disabled | 是否禁用 | boolean | false |  |
| formatter | 格式化展示，留空字段会被 ` ` 填充 | (value: string) => string | - |  |
| mask | 自定义展示，和 `formatter` 的区别是不会修改原始值 | boolean \| string | `false` | `5.17.0` |
| length | 输入元素数量 | number | 6 |  |
| status | 设置校验状态 | 'error' \| 'warning' | - |  |
| size | 输入框大小 | `small` \| `middle` \| `large` | `middle` |  |
| variant | 形态变体 | `outlined` \| `borderless` \| `filled` | `outlined` |  |
| value | 输入框内容 | string | - |  |
| onChange | 当输入框内容全部填充时触发回调 | (value: string) => void | - |  |
| onInput | 输入值变化时触发的回调 | (value: string[]) => void | - | `5.22.0` |

#### VisibilityToggle

| Property        | Description          | Type              | Default | Version |
| --------------- | -------------------- | ----------------- | ------- | ------- |
| visible         | 用于手动控制密码显隐 | boolean           | false   | 4.24    |
| onVisibleChange | 显隐密码的回调       | (visible) => void | -       | 4.24    |

#### Input Methods

| 名称 | 说明 | 参数 | 版本 |
| --- | --- | --- | --- |
| blur | 取消焦点 | - |  |
| focus | 获取焦点 | (option?: { preventScroll?: boolean, cursor?: 'start' \| 'end' \| 'all' }) | option - 4.10.0 |

### Semantic DOM

#### Input

<code src="./demo/_semantic_input.tsx" simplify="true"></code>

#### Input.TextArea

<code src="./demo/_semantic_textarea.tsx" simplify="true"></code>

## 主题变量（Design Token）

<ComponentTokenTable component="Input"></ComponentTokenTable>

## FAQ

### 为什么我动态改变 `prefix/suffix/showCount` 时，Input 会失去焦点？

当 Input 动态添加或者删除 `prefix/suffix/showCount` 时，React 会重新创建 DOM 结构而新的 input 是没有焦点的。你可以预设一个空的 `<span />` 来保持 DOM 结构不变：

```jsx
const suffix = condition ? <Icon type="smile" /> : <span />;

<Input suffix={suffix} />;
```

### 为何 TextArea 受控时，`value` 可以超过 `maxLength`？

受控时，组件应该按照受控内容展示。以防止在表单组件内使用时显示值和提交值不同的问题。
