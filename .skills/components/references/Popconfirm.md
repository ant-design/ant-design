# Popconfirm — 气泡确认框

## 功能概述

点击元素，弹出气泡式的确认框。

## 应用场景

- 目标元素的操作需要用户进一步的确认时，在目标元素附近弹出浮层提示，询问用户。
- 和 `confirm` 弹出的全屏居中模态对话框相比，交互形式更轻量。

## 输入字段

### Popconfirm 属性

#### 必填

- 无必填属性。

#### 可选

- `cancelButtonProps`: [ButtonProps](/components/button-cn#api)，cancel 按钮 props。
- `cancelText`: string，取消按钮文字，默认 `取消`。
- `disabled`: boolean，阻止点击 Popconfirm 子元素时弹出确认框，默认 false。
- `icon`: ReactNode，自定义弹出气泡 Icon 图标，默认 <ExclamationCircle />。
- `okButtonProps`: [ButtonProps](/components/button-cn#api)，ok 按钮 props。
- `okText`: string，确认按钮文字，默认 `确定`。
- `okType`: string，确认按钮类型，默认 `primary`。
- `showCancel`: boolean，是否显示取消按钮，默认 true，版本 4.18.0。
- `title`: ReactNode | () => ReactNode，确认框标题。
- `description`: ReactNode | () => ReactNode，确认内容的详细描述，版本 5.1.0。
- `onCancel`: function(e)，点击取消的回调。
- `onConfirm`: function(e)，点击确认的回调。
- `onPopupClick`: function(e)，弹出气泡点击事件，版本 5.5.0。

## 方法

无公开方法。

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
