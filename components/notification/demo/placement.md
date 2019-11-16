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
import { Button, Icon, notification, Divider } from 'antd';

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
      <Icon type="radius-upleft" />
      topLeft
    </Button>
    <Button type="primary" onClick={() => openNotification('topRight')}>
      <Icon type="radius-upright" />
      topRight
    </Button>
    <Divider />
    <Button type="primary" onClick={() => openNotification('bottomLeft')}>
      <Icon type="radius-bottomleft" />
      bottomLeft
    </Button>
    <Button type="primary" onClick={() => openNotification('bottomRight')}>
      <Icon type="radius-bottomright" />
      bottomRight
    </Button>
  </div>,
  mountNode,
);
```
