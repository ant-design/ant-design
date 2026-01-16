# Button — 按钮

## 功能概述

按钮用于开始一个即时操作。

## 应用场景

- 标记了一个（或封装一组）操作命令，响应用户点击行为，触发相应的业务逻辑。
- 在 Ant Design 中我们提供了五种按钮。
- 🔵 主按钮：用于主行动点，一个操作区域只能有一个主按钮。
- ⚪️ 默认按钮：用于没有主次之分的一组行动点。
- 😶 虚线按钮：常用于添加操作。
- 🔤 文本按钮：用于最次级的行动点。
- 🔗 链接按钮：一般用于链接，即导航至某位置。
- 以及四种状态属性与上面配合使用。
- ⚠️ 危险：删除/移动/修改权限等危险操作，一般需要二次确认。
- 👻 幽灵：用于背景色比较复杂的地方，常用在首页/产品页等展示场景。
- 🚫 禁用：行动点不可用的时候，一般需要文案解释。
- 🔃 加载中：用于异步操作等待反馈的时候，也可以避免多次提交。

## 输入字段

### type 属性

#### 必填

- 无必填属性。

#### 可选

- `autoInsertSpace`: boolean，我们默认提供两个汉字之间的空格，可以设置 `autoInsertSpace` 为 `false` 关闭，默认 `true`，版本 5.17.0。
- `block`: boolean，将按钮宽度调整为其父宽度的选项，默认 false。
- `classNames`: Record<[SemanticDOM](#semantic-dom), string> | (info: { props })=> Record<[SemanticDOM](#semantic-dom), string>，用于自定义组件内部各语义化结构的 class，支持对象或函数。
- `color`: `default` | `primary` | `danger` | [PresetColors](#presetcolors)，设置按钮的颜色，版本 `default`、`primary` 和 `danger`: 5.21.0, `PresetColors`: 5.23.0。
- `danger`: boolean，语法糖，设置危险按钮。当设置 `color` 时会以后者为准，默认 false。
- `disabled`: boolean，设置按钮失效状态，默认 false。
- `ghost`: boolean，幽灵属性，使按钮背景透明，默认 false。
- `href`: string，点击跳转的地址，指定此属性 button 的行为和 a 链接一致。
- `htmlType`: `submit` | `reset` | `button`，设置 `button` 原生的 `type` 值，可选值请参考 [HTML 标准](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/button#type)，默认 `button`。
- `icon`: ReactNode，设置按钮的图标组件。
- `~~iconPosition~~`: `start` | `end`，设置按钮图标组件的位置,请使用 `iconPlacement` 替换，默认 `start`，版本 5.17.0。
- `iconPlacement`: `start` | `end`，设置按钮图标组件的位置，默认 `start`。
- `loading`: boolean | { delay: number, icon: ReactNode }，设置按钮载入状态，默认 false，版本 icon: 5.23.0。
- `shape`: `default` | `circle` | `round`，设置按钮形状，默认 `default`。
- `size`: `large` | `middle` | `small`，设置按钮大小，默认 `middle`。
- `styles`: Record<[SemanticDOM](#semantic-dom), CSSProperties> | (info: { props })=> Record<[SemanticDOM](#semantic-dom), CSSProperties>，用于自定义组件内部各语义化结构的行内 style，支持对象或函数。
- `target`: string，相当于 a 链接的 target 属性，href 存在时生效。
- `type`: `primary` | `dashed` | `link` | `text` | `default`，语法糖，设置按钮类型。当设置 `variant` 与 `color` 时以后者为准，默认 `default`。
- `onClick`: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void，点击按钮时的回调。
- `variant`: `outlined` | `dashed` | `solid` | `filled` | `text` | `link`，设置按钮的变体，版本 5.21.0。

## 方法

无公开方法。

## 使用建议

优先使用 `type="primary"` 作为主操作按钮，每个页面建议只有一个主按钮；危险操作使用 `danger` 属性；加载中状态使用 `loading` 防止重复提交。

## 示例代码

```tsx
import { Button, Flex } from 'antd';

const App: React.FC = () => (
  <Flex gap="small" wrap>
    <Button type="primary">Primary</Button>
    <Button>Default</Button>
    <Button type="dashed">Dashed</Button>
    <Button type="text">Text</Button>
    <Button type="link">Link</Button>
  </Flex>
);
```

## 返回结果

渲染一个可交互的按钮元素，支持点击事件和各种视觉状态。
