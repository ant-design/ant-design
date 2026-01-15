# Popover — 气泡卡片

## 功能概述

点击/鼠标移入元素，弹出气泡式的卡片浮层。比 Tooltip 更复杂的弹出内容。

## 输入字段

### 必填

无必填属性。

### 可选

- `title`: ReactNode | () => ReactNode，卡片标题。
- `content`: ReactNode | () => ReactNode，卡片内容。
- `children`: ReactNode，触发元素。
- `placement`: string，气泡框位置，可选 `top` | `left` | `right` | `bottom` | `topLeft` | `topRight` | `bottomLeft` | `bottomRight` | `leftTop` | `leftBottom` | `rightTop` | `rightBottom`，默认 `top`。
- `arrow`: boolean | { pointAtCenter }，箭头配置，默认 `true`。
- `trigger`: string | string[]，触发方式，可选 `hover` | `focus` | `click` | `contextMenu`，默认 `hover`。
- `open`: boolean，是否显示（受控）。
- `defaultOpen`: boolean，默认是否显示。
- `mouseEnterDelay`: number，鼠标移入延迟（秒），默认 `0.1`。
- `mouseLeaveDelay`: number，鼠标移出延迟（秒），默认 `0.1`。
- `overlayClassName`: string，浮层类名。
- `overlayStyle`: CSSProperties，浮层样式。
- `overlayInnerStyle`: CSSProperties，浮层内层样式。
- `getPopupContainer`: (node) => HTMLElement，浮层容器。
- `autoAdjustOverflow`: boolean，自动调整位置，默认 `true`。
- `destroyTooltipOnHide`: boolean，隐藏时销毁。
- `zIndex`: number，z-index。
- `fresh`: boolean，内容是否始终保持最新（5.10.0+）。
- `onOpenChange`: (open) => void，显示状态变化回调。

## 使用建议

需要展示更多信息时使用 Popover 而非 Tooltip；需要确认操作使用 Popconfirm；点击触发的交互使用 `trigger="click"`。

## 示例代码

```tsx
import { Button, Popover, Space } from 'antd';

const content = (
  <div>
    <p>Content</p>
    <p>Content</p>
  </div>
);

const App: React.FC = () => (
  <Space>
    {/* 基础用法 */}
    <Popover content={content} title="Title">
      <Button type="primary">Hover me</Button>
    </Popover>

    {/* 点击触发 */}
    <Popover content={content} title="Title" trigger="click">
      <Button>Click me</Button>
    </Popover>

    {/* 不同位置 */}
    <Popover placement="topLeft" title="Title" content={content}>
      <Button>Top Left</Button>
    </Popover>
    <Popover placement="rightTop" title="Title" content={content}>
      <Button>Right Top</Button>
    </Popover>

    {/* 无标题 */}
    <Popover content="Content without title">
      <Button>No Title</Button>
    </Popover>

    {/* 受控 */}
    {/* 使用 open 和 onOpenChange 控制显示 */}
  </Space>
);
```

## 返回结果

渲染一个气泡卡片，用于展示更多信息。
