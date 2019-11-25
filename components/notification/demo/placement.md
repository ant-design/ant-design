---
order: 5
title:
  zh-CN: 位置
  en-US: Placement
---

## zh-CN

通知从右上角、右下角、左下角、左上角弹出。

## en-US

A notification box can appear from the `topRight`, `bottomRight`, `bottomLeft` or `topLeft` of the viewport.

```jsx
import { Button, notification, Divider } from 'antd';
import {
  RadiusUpleft,
  RadiusUpright,
  RadiusBottomleft,
  RadiusBottomright,
} from '@ant-design/icons';

const openNotification = placement => {
  notification.info({
    message: `Notification ${placement}`,
    description:
      'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
    placement,
  });
};

ReactDOM.render(
  <div>
    <Button type="primary" onClick={() => openNotification('topLeft')}>
      <RadiusUpleft />
      topLeft
    </Button>
    <Button type="primary" onClick={() => openNotification('topRight')}>
      <RadiusUpright />
      topRight
    </Button>
    <Divider />
    <Button type="primary" onClick={() => openNotification('bottomLeft')}>
      <RadiusBottomleft />
      bottomLeft
    </Button>
    <Button type="primary" onClick={() => openNotification('bottomRight')}>
      <RadiusBottomright />
      bottomRight
    </Button>
  </div>,
  mountNode,
);
```
