# Divider — 分割线

## 功能概述

区隔内容的分割线。

## 应用场景

- 对不同章节的文本段落进行分割。
- 对行内文字/链接进行分割，例如表格的操作列。

## 输入字段

### Divider 属性

#### 必填

- 无必填属性。

#### 可选

- `children`: ReactNode，嵌套的标题。
- `className`: string，分割线样式类。
- `classNames`: Record<[SemanticDOM](#semantic-dom), string> | (info: { props })=> Record<[SemanticDOM](#semantic-dom), string>，用于自定义组件内部各语义化结构的 class，支持对象或函数。
- `dashed`: boolean，是否虚线，默认 false。
- `orientation`: `horizontal` | `vertical`，水平或垂直类型，默认 `horizontal`。
- `~~orientationMargin~~`: string | number，标题和最近 left/right 边框之间的距离，去除了分割线，同时 `titlePlacement` 不能为 `center`。如果传入 `string` 类型的数字且不带单位，默认单位是 px。
- `plain`: boolean，文字是否显示为普通正文样式，默认 false，版本 4.2.0。
- `style`: CSSProperties，分割线样式对象。
- `styles`: Record<[SemanticDOM](#semantic-dom), CSSProperties> | (info: { props })=> Record<[SemanticDOM](#semantic-dom), CSSProperties>，用于自定义组件内部各语义化结构的行内 style，支持对象或函数。
- `size`: `small` | `middle` | `large`，间距大小，仅对水平布局有效，版本 5.25.0。
- `titlePlacement`: `start` | `end` | `center`，分割线标题的位置，默认 `center`。
- `~~type~~`: `horizontal` | `vertical`，水平还是垂直类型，默认 `horizontal`。
- `variant`: `dashed` | `dotted` | `solid`，分割线是虚线、点线还是实线，默认 solid，版本 5.20.0。
- `vertical`: boolean，是否垂直，和 orientation 同时配置以 orientation 优先，默认 false。

## 方法

无公开方法。

## 使用建议

段落分割使用水平分割线；行内分割使用垂直分割线；带标题时设置 `orientation`。

## 示例代码

```tsx
import { Divider } from 'antd';

const App: React.FC = () => (
  <>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    <Divider />
    <p>Sed ut perspiciatis unde omnis iste natus error sit.</p>
    <Divider dashed />
    <p>At vero eos et accusamus et iusto odio dignissimos.</p>

    <Divider>Text</Divider>
    <Divider orientation="left">Left Text</Divider>
    <Divider orientation="right">Right Text</Divider>
    <Divider orientation="left" plain>
      Plain Text
    </Divider>

    <p>
      Text
      <Divider type="vertical" />
      Link
      <Divider type="vertical" />
      Link
    </p>
  </>
);
```

## 返回结果

渲染一条分割线，用于分隔内容。
