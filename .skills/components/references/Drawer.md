# Drawer — 抽屉

## 功能概述

屏幕边缘滑出的浮层面板，用于承载表单或详情信息，保持用户在当前页面的操作不中断。

## 输入字段

### 必填

- `open`: boolean，抽屉是否可见（5.0+ 使用 `open` 替代 `visible`）。

### 可选

- `title`: ReactNode，抽屉标题。
- `children`: ReactNode，抽屉内容。
- `placement`: string，抽屉方向，可选 `top` | `right` | `bottom` | `left`，默认 `right`。
- `width`: string | number，宽度（placement 为 left/right 时生效），默认 `378`。
- `height`: string | number，高度（placement 为 top/bottom 时生效），默认 `378`。
- `size`: string，预设尺寸，可选 `default` | `large`。
- `closable`: boolean | { closeIcon, disabled }，显示关闭按钮，默认 `true`。
- `closeIcon`: ReactNode，自定义关闭图标。
- `mask`: boolean，显示遮罩，默认 `true`。
- `maskClosable`: boolean，点击遮罩关闭，默认 `true`。
- `keyboard`: boolean，ESC 关闭，默认 `true`。
- `extra`: ReactNode，操作区域（标题右侧）。
- `footer`: ReactNode，抽屉底部。
- `destroyOnClose`: boolean，关闭时销毁子组件，默认 `false`。
- `forceRender`: boolean，强制渲染。
- `getContainer`: HTMLElement | () => HTMLElement | false，挂载节点。
- `zIndex`: number，z-index 值。
- `push`: boolean | { distance }，多层抽屉推动效果。
- `autoFocus`: boolean，自动聚焦，默认 `true`。
- `styles`: { header, body, footer, mask, wrapper, content }，各部分样式。
- `classNames`: object，各部分类名。
- `loading`: boolean，内容区域 loading（5.17.0+）。
- `afterOpenChange`: (open) => void，打开/关闭动画完成回调。
- `onClose`: (e) => void，关闭回调。

## 使用建议

详情页或编辑表单优先使用抽屉而非弹窗；多层抽屉使用 `push` 效果；底部操作区使用 `footer`；加载状态使用 `loading`。

## 示例代码

```tsx
import { useState } from 'react';
import { Button, Drawer, Space } from 'antd';

const App: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>
        Open Drawer
      </Button>
      <Drawer
        title="Basic Drawer"
        placement="right"
        onClose={() => setOpen(false)}
        open={open}
        extra={
          <Space>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button type="primary" onClick={() => setOpen(false)}>
              OK
            </Button>
          </Space>
        }
      >
        <p>Some contents...</p>
      </Drawer>
    </>
  );
};
```

## 返回结果

渲染一个边缘滑出的抽屉面板，用于展示详情或表单。
