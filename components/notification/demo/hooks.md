---
order: 8
title:
  zh-CN: 通过 Hooks 获取上下文
  en-US: Get context with hooks
only: true
---

## zh-CN

通知从右上角、右下角、左下角、左上角弹出。

## en-US

A notification box can appear from the `topRight`, `bottomRight`, `bottomLeft` or `topLeft` of the viewport.

```jsx
import { Button, notification, Divider } from 'antd';
import {
  RadiusUpleftOutlined,
  RadiusUprightOutlined,
  RadiusBottomleftOutlined,
  RadiusBottomrightOutlined,
} from '@ant-design/icons';

const Demo = () => {
  const [instance, holder] = notification.useNotification();

  const openNotification = placement => {
    instance.info({
      message: `Notification ${placement}`,
      description:
        'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
      placement,
    });
  };

  return (
    <div>
      {holder}
      <Button type="primary" onClick={() => openNotification('topLeft')}>
        <RadiusUpleftOutlined />
        topLeft
      </Button>
      <Button type="primary" onClick={() => openNotification('topRight')}>
        <RadiusUprightOutlined />
        topRight
      </Button>
      <Divider />
      <Button type="primary" onClick={() => openNotification('bottomLeft')}>
        <RadiusBottomleftOutlined />
        bottomLeft
      </Button>
      <Button type="primary" onClick={() => openNotification('bottomRight')}>
        <RadiusBottomrightOutlined />
        bottomRight
      </Button>
    </div>
  );
};

ReactDOM.render(<Demo />, mountNode);
```
