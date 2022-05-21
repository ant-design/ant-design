---
order: 3
title:
  zh-CN: 自定义按钮
  en-US: Custom close button
---

## zh-CN

自定义关闭按钮的样式和文字。

## en-US

To customize the style or font of the close button.

```tsx
import { Button, notification, Space } from 'antd';
import React from 'react';

const close = () => {
  console.log(
    'Notification was closed. Either the close button was clicked or duration time elapsed.',
  );
};

const openNotification = () => {
  const key = `open${Date.now()}`;
  const btn = (
    <Space>
      <Button type="link" size="small" onClick={() => notification.destroy()}>
        Destroy All
      </Button>
      <Button type="primary" size="small" onClick={() => notification.destroy(key)}>
        Confirm
      </Button>
    </Space>
  );
  notification.open({
    message: 'Notification Title',
    description:
      'A function will be be called after the notification is closed (automatically after the "duration" time of manually).',
    btn,
    key,
    onClose: close,
  });
};

const App: React.FC = () => (
  <Button type="primary" onClick={openNotification}>
    Open the notification box
  </Button>
);

export default App;
```
