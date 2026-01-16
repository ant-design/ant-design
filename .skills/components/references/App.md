# App — 包裹组件

## 功能概述

提供重置样式和提供消费上下文的默认环境。

## 应用场景

- 提供可消费 React context 的 `message.xxx`、`Modal.xxx`、`notification.xxx` 的静态方法，可以简化 useMessage 等方法需要手动植入 `contextHolder` 的问题。
- 提供基于 `.ant-app` 的默认重置样式，解决原生元素没有 antd 规范样式的问题。

## 输入字段

### App 属性

#### 必填

- 无必填属性。

#### 可选

- `component`: ComponentType | false，设置渲染元素，为 `false` 则不创建 DOM 节点，默认 div，版本 5.11.0。
- `message`: [MessageConfig](/components/message-cn/#messageconfig)，App 内 Message 的全局配置，版本 5.3.0。
- `notification`: [NotificationConfig](/components/notification-cn/#notificationconfig)，App 内 Notification 的全局配置，版本 5.3.0。

## 方法

无公开方法。

## 使用建议

使用 App 包裹应用根节点；子组件通过 useApp 获取上下文方法；避免静态方法获取不到主题配置。

## 示例代码

```tsx
import { App, Button, ConfigProvider, Space } from 'antd';

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

const AppRoot: React.FC = () => (
  <App>
    <MyPage />
  </App>
);

export default AppRoot;

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
