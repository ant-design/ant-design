# Tooltip — 文字提示

## 功能概述

简单的文字提示气泡框。鼠标移入则显示提示，移出消失。

## 输入字段

### 必填

- `title`: ReactNode | () => ReactNode，提示文字。

### 可选

- `children`: ReactNode，触发元素。
- `placement`: string，气泡框位置，可选 `top` | `left` | `right` | `bottom` | `topLeft` | `topRight` | `bottomLeft` | `bottomRight` | `leftTop` | `leftBottom` | `rightTop` | `rightBottom`，默认 `top`。
- `arrow`: boolean | { pointAtCenter }，箭头配置，默认 `true`。
- `color`: string，背景颜色。
- `open`: boolean，是否显示（受控）。
- `defaultOpen`: boolean，默认是否显示。
- `trigger`: string | string[]，触发方式，可选 `hover` | `focus` | `click` | `contextMenu`，默认 `hover`。
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

简短提示使用 Tooltip；复杂内容使用 Popover；配合 disabled 元素时需包装 span。

## 示例代码

```tsx
import { Button, Divider, Space, Tooltip } from 'antd';

const App: React.FC = () => (
  <Space direction="vertical">
    {/* 基础用法 */}
    <Tooltip title="prompt text">
      <span>Tooltip will show on mouse enter.</span>
    </Tooltip>

    {/* 位置 */}
    <div style={{ margin: 100 }}>
      <div style={{ marginBottom: 10, textAlign: 'center' }}>
        <Tooltip placement="topLeft" title="Prompt Text">
          <Button>TL</Button>
        </Tooltip>
        <Tooltip placement="top" title="Prompt Text">
          <Button>Top</Button>
        </Tooltip>
        <Tooltip placement="topRight" title="Prompt Text">
          <Button>TR</Button>
        </Tooltip>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Tooltip placement="bottomLeft" title="Prompt Text">
          <Button>BL</Button>
        </Tooltip>
        <Tooltip placement="bottom" title="Prompt Text">
          <Button>Bottom</Button>
        </Tooltip>
        <Tooltip placement="bottomRight" title="Prompt Text">
          <Button>BR</Button>
        </Tooltip>
      </div>
    </div>

    {/* 颜色 */}
    <Space>
      <Tooltip title="prompt text" color="cyan">
        <Button>Cyan</Button>
      </Tooltip>
      <Tooltip title="prompt text" color="purple">
        <Button>Purple</Button>
      </Tooltip>
      <Tooltip title="prompt text" color="#108ee9">
        <Button>Custom</Button>
      </Tooltip>
    </Space>

    {/* 禁用元素（需包装） */}
    <Tooltip title="Disabled Button">
      <span>
        <Button disabled style={{ pointerEvents: 'none' }}>
          Disabled
        </Button>
      </span>
    </Tooltip>
  </Space>
);
```

## 返回结果

渲染一个文字提示气泡框。
