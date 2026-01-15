# Notification — 通知提醒框

## 功能概述

全局展示通知提醒信息。在系统四个角显示通知提醒信息，常用于较复杂的通知内容。

## 输入字段

### 静态方法

- `notification.success(config)`: 成功通知。
- `notification.error(config)`: 错误通知。
- `notification.info(config)`: 信息通知。
- `notification.warning(config)`: 警告通知。
- `notification.open(config)`: 打开通知。
- `notification.destroy(key?)`: 销毁通知。

### config 参数

- `message`: ReactNode，通知标题（必填）。
- `description`: ReactNode，通知内容。
- `duration`: number，持续时间（秒），默认 `4.5`，设为 `0` 不自动关闭。
- `placement`: string，弹出位置，可选 `topLeft` | `topRight` | `bottomLeft` | `bottomRight`，默认 `topRight`。
- `type`: string，通知类型，可选 `success` | `error` | `info` | `warning`。
- `icon`: ReactNode，自定义图标。
- `key`: string，唯一标识。
- `btn`: ReactNode，操作按钮。
- `closeIcon`: ReactNode | boolean，自定义关闭图标。
- `closable`: boolean，可关闭，默认 `true`。
- `className`: string，自定义类名。
- `style`: CSSProperties，自定义样式。
- `role`: string，ARIA role，默认 `alert`。
- `onClick`: () => void，点击回调。
- `onClose`: () => void，关闭回调。
- `props`: object，额外 HTML 属性。
- `showProgress`: boolean，显示进度条（5.18.0+）。
- `pauseOnHover`: boolean，悬停时暂停倒计时（5.18.0+）。

### notification.config(options)

全局配置：

- `top`: number，距离顶部距离，默认 `24`。
- `bottom`: number，距离底部距离，默认 `24`。
- `duration`: number，默认持续时间。
- `maxCount`: number，最大显示数量。
- `placement`: string，默认弹出位置。
- `prefixCls`: string，样式前缀。
- `getContainer`: () => HTMLElement，挂载容器。
- `rtl`: boolean，RTL 模式。

### Hooks 用法（推荐）

```tsx
const [api, contextHolder] = notification.useNotification();
```

## 使用建议

复杂通知内容优先使用 notification；简单反馈使用 message；需要操作按钮时使用 `btn` 属性。

## 示例代码

```tsx
import { Button, notification, Space } from 'antd';

const App: React.FC = () => {
  const [api, contextHolder] = notification.useNotification();

  const openNotification = (type: 'success' | 'info' | 'warning' | 'error') => {
    api[type]({
      message: 'Notification Title',
      description: 'This is the content of the notification.',
    });
  };

  const openWithBtn = () => {
    api.open({
      message: 'Notification Title',
      description: 'This is the content of the notification.',
      btn: (
        <Button type="primary" size="small" onClick={() => api.destroy()}>
          Confirm
        </Button>
      ),
    });
  };

  return (
    <>
      {contextHolder}
      <Space>
        <Button onClick={() => openNotification('success')}>Success</Button>
        <Button onClick={() => openNotification('error')}>Error</Button>
        <Button onClick={openWithBtn}>With Button</Button>
      </Space>
    </>
  );
};
```

## 返回结果

在页面角落显示通知提醒框。
