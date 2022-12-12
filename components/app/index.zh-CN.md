---
category: Components
subtitle: 包裹组件
group: 其他
title: App
cover: https://gw.alipayobjects.com/zos/bmw-prod/cc3fcbfa-bf5b-4c8c-8a3d-c3f8388c75e8.svg
demo:
  cols: 2
---

新的包裹组件，提供重置样式和提供消费上下文的默认环境。

## 何时使用

- 提供可消费 React context 的 `message.xxx`、`Modal.xxx`、`notification.xxx` 的静态方法，可以简化 useMessage 等方法需要手动植入 `contextHolder` 的问题。
- 提供基于 `.ant-app` 的默认重置样式，解决原生元素没有 antd 规范样式的问题。

## 代码演示

<!-- prettier-ignore -->
<code src="./demo/basic.tsx">basic</code>

## 如何使用

### 1. 基础用法

```tsx
import React from 'react';
import { App } from 'antd';

const MyPage: React.FC = () => {
  const { message, notification, modal } = App.useApp();
  message.success('Good!');
  notification.info({ message: 'Good' });
  modal.warning({ title: 'Good' });
  // ....
  // other message, notification, modal static function
  return <div>Hello word</div>;
};

const MyApp: React.FC = () => (
  <App>
    <MyPage />
  </App>
);

export default MyApp;
```

### 2. App 组件在能在`ConfigProvider`才能使用 token, 如果需要使用 Token,则 ConfigProvider 与 App 组件必须成对出现,不使用 token,则 App 可单独使用。

### 3. App.useApp 需要在 App 包裹内才可以使用.

### 4. 内嵌使用场景（如无必要，尽量不做嵌套）

```tsx
import React from 'react';
import { App, Button, Space } from 'antd';

const MyApp: React.FC = () => {
  const { message, modal, notification } = App.useApp();

  const showMessage = () => {
    message.success('Success!');
  };

  const showModal = () => {
    modal.warning({
      title: 'This is a warning message',
      content: 'some messages...some messages...',
    });
  };

  const showNotification = () => {
    notification.info({
      message: `Notification topLeft`,
      description: 'Hello, Ant Design!!',
      placement: 'topLeft',
    });
  };

  return (
    <App>
      <Space>
        <Button type="primary" onClick={showMessage}>
          Open message
        </Button>
        <App>
          <Button type="primary" onClick={showModal}>
            Open modal
          </Button>
          <Button type="primary" onClick={showNotification}>
            Open notification
          </Button>
        </App>
      </Space>
    </App>
  );
};
```

### 5. 全局场景（rudux 场景）

```tsx
//  store.js
import React, { useEffect } from 'react';
import { App } from 'antd';
import type { MessageInstance } from 'antd/es/message/interface';
import type { NotificationInstance } from 'antd/es/notification/interface';
import type { ModalStaticFunctions } from 'antd/es/modal/confirm';

let message: MessageInstance;
let notification: NotificationInstance;
let modal: Omit<ModalStaticFunctions, 'warn'>;

// Entry component
export default () => {
  const staticFunction = App.useApp();
  message = staticFunction.message;
  modal = staticFunction.modal;
  notification = staticFunction.notification;
  useEffect(() => {}, []);
  return null;
};

export { message, notification, modal };
```

```tsx
// sub page
import React from 'react';
import { Button, Space } from 'antd';
import { message, modal, notification } from './store';

// Sub page
export default () => {
  const showMessage = () => {
    console.log('message', message);
    console.log('modal', modal);
    message.success('Success!');
  };

  const showModal = () => {
    modal.warning({
      title: 'This is a warning message',
      content: 'some messages...some messages...',
    });
  };

  const showNotification = () => {
    notification.info({
      message: `Notification topLeft`,
      description: 'Hello, Ant Design!!',
      placement: 'topLeft',
    });
  };

  return (
    <Space>
      <Button type="primary" onClick={showMessage}>
        Open message
      </Button>
      <Button type="primary" onClick={showModal}>
        Open modal
      </Button>
      <Button type="primary" onClick={showNotification}>
        Open notification
      </Button>
    </Space>
  );
};
```
