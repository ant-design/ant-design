---
order: 5
title:
  zh-CN: 位置
  en-US: Placement
---

## zh-CN

使用 `placement` 可以配置通知从右上角、右下角、左下角、左上角弹出。

## en-US

A notification box can appear from the `topRight`, `bottomRight`, `bottomLeft` or `topLeft` of the viewport via `placement`.

```tsx
import {
  BorderBottomOutlined,
  BorderTopOutlined,
  RadiusBottomleftOutlined,
  RadiusBottomrightOutlined,
  RadiusUpleftOutlined,
  RadiusUprightOutlined,
} from '@ant-design/icons';
import { Button, Divider, notification, Space } from 'antd';
import type { NotificationPlacement } from 'antd/lib/notification';
import React from 'react';

const openNotification = (placement: NotificationPlacement) => {
  notification.info({
    message: `Notification ${placement}`,
    description:
      'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
    placement,
  });
};

const App: React.FC = () => (
  <>
    <Space>
      <Button type="primary" onClick={() => openNotification('top')} icon={<BorderTopOutlined />}>
        top
      </Button>
      <Button
        type="primary"
        onClick={() => openNotification('bottom')}
        icon={<BorderBottomOutlined />}
      >
        bottom
      </Button>
    </Space>
    <Divider />
    <Space>
      <Button
        type="primary"
        onClick={() => openNotification('topLeft')}
        icon={<RadiusUpleftOutlined />}
      >
        topLeft
      </Button>
      <Button
        type="primary"
        onClick={() => openNotification('topRight')}
        icon={<RadiusUprightOutlined />}
      >
        topRight
      </Button>
    </Space>
    <Divider />
    <Space>
      <Button
        type="primary"
        onClick={() => openNotification('bottomLeft')}
        icon={<RadiusBottomleftOutlined />}
      >
        bottomLeft
      </Button>
      <Button
        type="primary"
        onClick={() => openNotification('bottomRight')}
        icon={<RadiusBottomrightOutlined />}
      >
        bottomRight
      </Button>
    </Space>
  </>
);

export default App;
```
