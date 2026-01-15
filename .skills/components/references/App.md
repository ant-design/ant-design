# App — 包裹组件

## 功能概述

新的包裹组件，提供 message, notification, modal 等方法的上下文支持。

## 输入字段

### 可选

- `message`: MessageConfig，全局化配置。
- `notification`: NotificationConfig，全局化配置。
- `component`: ComponentType | false，设置渲染元素，默认 `div`。
- `className`: string，类名。
- `style`: CSSProperties，样式。

### Hooks 返回

```tsx
const { message, notification, modal } = App.useApp();
```

- `message`: 返回 message 实例方法。
- `notification`: 返回 notification 实例方法。
- `modal`: 返回 Modal.confirm 等方法。

## 使用建议

使用 App 包裹应用根节点；子组件通过 useApp 获取上下文方法；避免静态方法获取不到主题配置。

## 示例代码

```tsx
// 嵌入 ConfigProvider
import { App, Button, ConfigProvider, Space } from 'antd';

// 子组件使用 useApp
const MyPage: React.FC = () => {
  const { message, notification, modal } = App.useApp();

  const showMessage = () => {
    message.success('Success!');
  };

  const showNotification = () => {
    notification.info({
      message: 'Notification Title',
      description: 'This is the content of the notification.',
    });
  };

  const showModal = () => {
    modal.confirm({
      title: 'Confirm',
      content: 'Are you sure?',
      onOk: () => message.success('Confirmed!'),
    });
  };

  return (
    <Space>
      <Button type="primary" onClick={showMessage}>
        Message
      </Button>
      <Button onClick={showNotification}>Notification</Button>
      <Button onClick={showModal}>Modal</Button>
    </Space>
  );
};

// 应用根组件
const AppRoot: React.FC = () => (
  <App>
    <MyPage />
  </App>
);

export default AppRoot;

// 配置 message 和 notification
const AppWithConfig: React.FC = () => (
  <App message={{ maxCount: 3 }} notification={{ placement: 'topRight' }}>
    <MyPage />
  </App>
);

const AppWithTheme: React.FC = () => (
  <ConfigProvider
    theme={{
      token: { colorPrimary: '#00b96b' },
    }}
  >
    <App>
      <MyPage />
    </App>
  </ConfigProvider>
);
```

## 返回结果

提供 message, notification, modal 的上下文环境。
