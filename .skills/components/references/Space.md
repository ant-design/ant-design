# Space — 间距

## 功能概述

设置组件之间的间距。

## 应用场景

- 避免组件紧贴在一起，拉开统一的空间。
- 适合行内元素的水平间距。
- 可以设置各种水平对齐方式。
- 需要表单组件之间紧凑连接且合并边框时，使用 Space.Compact（自 `antd@4.24.0` 版本开始提供该组件）。
- ### 与 Flex 组件的区别 {#difference-with-flex-component}。
- Space 为内联元素提供间距，其本身会为每一个子元素添加包裹元素用于内联对齐。适用于行、列中多个子元素的等距排列。
- Flex 为块级元素提供间距，其本身不会添加包裹元素。适用于垂直或水平方向上的子元素布局，并提供了更多的灵活性和控制能力。

## 输入字段

### Space 属性

#### 必填

- 无必填属性。

#### 可选

- `align`: `start` | `end` |`center` |`baseline`，对齐方式，版本 4.2.0。
- `classNames`: Record<[SemanticDOM](#semantic-dom), string> | (info: { props: SpaceProps })=> Record<[SemanticDOM](#semantic-dom), string>，用于自定义组件内部各语义化结构的 class，支持对象或函数。
- `~~direction~~`: `vertical` | `horizontal`，间距方向，默认 `horizontal`，版本 4.1.0。
- `orientation`: `vertical` | `horizontal`，间距方向，默认 `horizontal`。
- `size`: [Size](#size) | [Size\[\]](#size)，间距大小，默认 `small`，版本 4.1.0 | Array: 4.9.0。
- `~~split~~`: ReactNode，设置分隔符, 请使用 `separator` 替换，版本 4.7.0。
- `separator`: ReactNode，设置分隔符。
- `styles`: Record<[SemanticDOM](#semantic-dom), CSSProperties> | (info: { props: SpaceProps })=> Record<[SemanticDOM](#semantic-dom), CSSProperties>，用于自定义组件内部各语义化结构的行内 style，支持对象或函数。
- `vertical`: boolean，是否垂直，和 `orientation` 同时配置以 `orientation` 优先，默认 false。
- `wrap`: boolean，是否自动换行，仅在 `horizontal` 时有效，默认 false，版本 4.9.0。

### Space.Compact 属性

#### 必填

- 无必填属性。

#### 可选

- `block`: boolean，将宽度调整为父元素宽度的选项，默认 false，版本 4.24.0。
- `~~direction~~`: `vertical` | `horizontal`，指定排列方向，默认 `horizontal`，版本 4.24.0。
- `orientation`: `vertical` | `horizontal`，指定排列方向，默认 `horizontal`。
- `size`: `large` | `middle` | `small`，子组件大小，默认 `middle`，版本 4.24.0。
- `vertical`: boolean，是否垂直，和 `orientation` 同时配置以 `orientation` 优先，默认 false。

### Space.Addon 属性

#### 必填

- 无必填属性。

#### 可选

- `children`: ReactNode，自定义内容，版本 5.29.0。

## 方法

无公开方法。

## 使用建议

按钮组使用 Space 或 Space.Compact；垂直列表使用 `direction="vertical"`；表单 inline 布局使用 Space。

## 示例代码

```tsx
import { Button, Divider, Input, Space } from 'antd';

const App: React.FC = () => (
  <>
    <Space>
      <Button type="primary">Button</Button>
      <Button>Default</Button>
      <Button type="dashed">Dashed</Button>
    </Space>

    <Space direction="vertical" style={{ width: '100%' }}>
      <Button block>Button 1</Button>
      <Button block>Button 2</Button>
    </Space>

    <Space split={<Divider type="vertical" />}>
      <span>Text</span>
      <span>Text</span>
      <span>Text</span>
    </Space>

    <Space.Compact>
      <Input placeholder="Input" style={{ width: '50%' }} />
      <Button type="primary">Submit</Button>
    </Space.Compact>
  </>
);
```

## 返回结果

渲染一组带间距的子组件。
