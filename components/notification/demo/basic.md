---
order: 0
title:
  zh-CN: 基本
  en-US: Basic
---

## zh-CN

最简单的用法，4.5 秒后自动关闭。

## en-US

The simplest usage that close the notification box after 4.5s.

```jsx
import { Button, notification } from 'antd';

const openNotification = () => {
  notification.info({
    message: 'Notification Title',
    onClick: () => {
      console.log('Notification Clicked!');
    },
    duration: null,
  });
};

export default () => (
  <Button type="primary" onClick={openNotification}>
    Open the notification box
  </Button>
);
```
