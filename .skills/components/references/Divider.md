# Divider — 分割线

## 功能概述

区隔内容的分割线。用于对不同章节的文本段落进行分割或对行内文字/链接进行分割。

## 输入字段

### 必填

无必填属性。

### 可选

- `children`: ReactNode，分割线中的文字内容。
- `type`: string，分割线类型，可选 `horizontal` | `vertical`，默认 `horizontal`。
- `orientation`: string，分割线标题位置，可选 `left` | `right` | `center`，默认 `center`。
- `orientationMargin`: string | number，标题和分割线之间的间距。
- `dashed`: boolean，虚线样式，默认 `false`。
- `plain`: boolean，文字普通样式（无加粗），默认 `false`。
- `variant`: string，分割线样式（5.20.0+），可选 `solid` | `dashed` | `dotted`，默认 `solid`。
- `className`: string，类名。
- `style`: CSSProperties，样式。

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

    {/* 带文字 */}
    <Divider>Text</Divider>
    <Divider orientation="left">Left Text</Divider>
    <Divider orientation="right">Right Text</Divider>
    <Divider orientation="left" plain>
      Plain Text
    </Divider>

    {/* 垂直分割 */}
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
