# Space — 间距

## 功能概述

设置组件之间的间距。避免使用 margin 手动设置间距。

## 输入字段

### 必填

无必填属性。

### 可选

- `children`: ReactNode，子组件。
- `size`: number | `small` | `middle` | `large` | `[horizontal, vertical]`，间距大小，默认 `small`。
- `direction`: string，间距方向，可选 `vertical` | `horizontal`，默认 `horizontal`。
- `align`: string，对齐方式，可选 `start` | `end` | `center` | `baseline`。
- `wrap`: boolean，是否自动换行，默认 `false`。
- `split`: ReactNode，分隔符。
- `className`: string，类名。
- `style`: CSSProperties，样式。

### Space.Compact 属性

紧凑布局模式，用于组合按钮、输入框等：

- `children`: ReactNode，子组件。
- `size`: string，尺寸，可选 `small` | `middle` | `large`。
- `direction`: string，方向，可选 `vertical` | `horizontal`，默认 `horizontal`。
- `block`: boolean，撑满父容器宽度。

## 使用建议

按钮组使用 Space 或 Space.Compact；垂直列表使用 `direction="vertical"`；表单 inline 布局使用 Space。

## 示例代码

```tsx
import { Button, Divider, Input, Space } from 'antd';

const App: React.FC = () => (
  <>
    {/* 基础间距 */}
    <Space>
      <Button type="primary">Button</Button>
      <Button>Default</Button>
      <Button type="dashed">Dashed</Button>
    </Space>

    {/* 垂直间距 */}
    <Space direction="vertical" style={{ width: '100%' }}>
      <Button block>Button 1</Button>
      <Button block>Button 2</Button>
    </Space>

    {/* 带分隔符 */}
    <Space split={<Divider type="vertical" />}>
      <span>Text</span>
      <span>Text</span>
      <span>Text</span>
    </Space>

    {/* 紧凑布局 */}
    <Space.Compact>
      <Input placeholder="Input" style={{ width: '50%' }} />
      <Button type="primary">Submit</Button>
    </Space.Compact>
  </>
);
```

## 返回结果

渲染一组带间距的子组件。
