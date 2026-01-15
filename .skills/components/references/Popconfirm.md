# Popconfirm — 气泡确认框

## 功能概述

点击元素，弹出气泡式的确认框。目标元素的操作需要用户进一步确认时使用。

## 输入字段

### 必填

- `title`: ReactNode | () => ReactNode，确认框标题。

### 可选

- `description`: ReactNode | () => ReactNode，确认框描述（5.1.0+）。
- `open`: boolean，是否显示（受控）。
- `defaultOpen`: boolean，默认是否显示。
- `disabled`: boolean，禁用弹出。
- `placement`: string，弹出位置，可选 `top` | `left` | `right` | `bottom` | `topLeft` | `topRight` | `bottomLeft` | `bottomRight` | `leftTop` | `leftBottom` | `rightTop` | `rightBottom`，默认 `top`。
- `okText`: ReactNode，确认按钮文字，默认 `确定`。
- `cancelText`: ReactNode，取消按钮文字，默认 `取消`。
- `okType`: string，确认按钮类型，默认 `primary`。
- `okButtonProps`: ButtonProps，确认按钮属性。
- `cancelButtonProps`: ButtonProps，取消按钮属性。
- `showCancel`: boolean，显示取消按钮，默认 `true`。
- `icon`: ReactNode，自定义图标。
- `trigger`: string | string[]，触发方式，可选 `hover` | `focus` | `click` | `contextMenu`，默认 `click`。
- `arrow`: boolean | { pointAtCenter }，箭头配置。
- `overlayClassName`: string，浮层类名。
- `overlayStyle`: CSSProperties，浮层样式。
- `overlayInnerStyle`: CSSProperties，浮层内层样式。
- `getPopupContainer`: (node) => HTMLElement，浮层容器。
- `autoAdjustOverflow`: boolean，自动调整位置，默认 `true`。
- `mouseEnterDelay`: number，鼠标移入延迟（秒）。
- `mouseLeaveDelay`: number，鼠标移出延迟（秒）。
- `onConfirm`: (e) => void，确认回调。
- `onCancel`: (e) => void，取消回调。
- `onOpenChange`: (open, e) => void，显示状态变化回调。

## 使用建议

删除、重置等危险操作前使用确认；简单确认优先使用 Popconfirm 而非 Modal.confirm；异步操作配合按钮 loading 状态。

## 示例代码

```tsx
import { Button, message, Popconfirm } from 'antd';

const App: React.FC = () => {
  const confirm = () => {
    message.success('Confirmed');
  };

  const cancel = () => {
    message.error('Cancelled');
  };

  return (
    <Popconfirm
      title="Delete the task"
      description="Are you sure to delete this task?"
      onConfirm={confirm}
      onCancel={cancel}
      okText="Yes"
      cancelText="No"
    >
      <Button danger>Delete</Button>
    </Popconfirm>
  );
};
```

## 返回结果

点击目标元素时弹出气泡确认框。
