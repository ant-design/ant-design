# Drawer — 抽屉

## 功能概述

屏幕边缘滑出的浮层面板。

## 应用场景

- 抽屉从父窗体边缘滑入，覆盖住部分父窗体内容。用户在抽屉内操作时不必离开当前任务，操作完成后，可以平滑地回到原任务。
- 当需要一个附加的面板来控制父窗体内容，这个面板在需要时呼出。比如，控制界面展示样式，往界面中添加内容。
- 当需要在当前任务流中插入临时任务，创建或预览附加内容。比如展示协议条款，创建子对象。

## 输入字段

### rootClassName 属性

#### 必填

- 无必填属性。

#### 可选

- `afterOpenChange`: function(open)，切换抽屉时动画结束后的回调。
- `className`: string，Drawer 容器外层 className 设置，如果需要设置最外层，请使用 rootClassName。
- `classNames`: Record<[SemanticDOM](#semantic-dom), string> | (info: { props })=> Record<[SemanticDOM](#semantic-dom), string>，用于自定义 Drawer 组件内部各语义化结构的 class，支持对象或函数。
- `closable`: boolean | { closeIcon?: React.ReactNode; disabled?: boolean; placement?: 'start' | 'end' }，是否显示关闭按钮。可通过 `placement` 配置其位置，默认 true，版本 placement: 5.28.0。
- `~~destroyOnClose~~`: boolean，关闭时销毁 Drawer 里的子元素，默认 false。
- `destroyOnHidden`: boolean，关闭时销毁 Drawer 里的子元素，默认 false，版本 5.25.0。
- `extra`: ReactNode，抽屉右上角的操作区域，版本 4.17.0。
- `footer`: ReactNode，抽屉的页脚。
- `forceRender`: boolean，预渲染 Drawer 内元素，默认 false。
- `focusable`: `{ trap?: boolean, focusTriggerAfterClose?: boolean }`，抽屉内焦点管理的配置，版本 6.2.0。
- `getContainer`: HTMLElement | () => HTMLElement | Selectors | false，指定 Drawer 挂载的节点，**并在容器内展现**，`false` 为挂载在当前位置，默认 body。
- `~~height~~`: string | number，高度，在 `placement` 为 `top` 或 `bottom` 时使用，请使用 `size` 替换，默认 378。
- `keyboard`: boolean，是否支持键盘 esc 关闭，默认 true。
- `mask`: boolean | `{ enabled?: boolean, blur?: boolean }`，遮罩效果，默认 true。
- `maskClosable`: boolean，点击蒙层是否允许关闭，默认 true。
- `placement`: `top` | `right` | `bottom` | `left`，抽屉的方向，默认 `right`。
- `push`: boolean | { distance: string | number }，用于设置多层 Drawer 的推动行为，默认 { distance: 180 }，版本 4.5.0+。
- `resizable`: boolean | [ResizableConfig](#resizableconfig)，是否启用拖拽改变尺寸，版本 boolean: 6.1.0。
- `rootStyle`: CSSProperties，可用于设置 Drawer 最外层容器的样式，和 `style` 的区别是作用节点包括 `mask`。
- `size`: 'default' | 'large' | number | string，预设抽屉宽度（或高度），default `378px` 和 large `736px`，或自定义数字，默认 'default'，版本 4.17.0, string: 6.2.0。
- `styles`: Record<[SemanticDOM](#semantic-dom), CSSProperties> | (info: { props })=> Record<[SemanticDOM](#semantic-dom), CSSProperties>，用于自定义 Drawer 组件内部各语义化结构的行内 style，支持对象或函数。
- `title`: ReactNode，标题。
- `loading`: boolean，显示骨架屏，默认 false，版本 5.17.0。
- `open`: boolean，Drawer 是否可见。
- `~~width~~`: string | number，宽度，请使用 `size` 替换，默认 378。
- `zIndex`: number，设置 Drawer 的 `z-index`，默认 1000。
- `onClose`: function(e)，点击遮罩层或左上角叉或取消按钮的回调。
- `drawerRender`: (node: ReactNode) => ReactNode，自定义渲染抽屉，版本 5.18.0。

### ResizableConfig 属性

#### 必填

- 无必填属性。

#### 可选

- `onResizeStart`: () => void，开始拖拽调整大小时的回调，版本 6.0.0。
- `onResize`: (size: number) => void，拖拽调整大小时的回调，版本 6.0.0。
- `onResizeEnd`: () => void，结束拖拽调整大小时的回调，版本 6.0.0。

## 方法

无公开方法。

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
