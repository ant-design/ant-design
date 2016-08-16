---
order: 1
title: 
  zh-CN: 自动关闭的延时
  en-US: A duration to close notification box 
---

## zh-CN

自定义通知框自动关闭的延时，默认`4.5s`，取消自动关闭只要将该值设为 `0` 即可。

## en-US

To customize a duration to close notification, default value is `4.5s`, if you set the value to `0`,
the corresponding notification box will be never closed automatically.

````jsx
import { Button, notification } from 'antd';

const openNotification = function () {
  const args = {
    message: 'This is the title',
    description: 'I will be never closed automatically.I will be never closed automatically.I will be never closed automatically.',
    duration: 0,
  };
  notification.open(args);
};

ReactDOM.render(
  <Button type="primary" onClick={openNotification}>Open the notification box</Button>
, mountNode);
````
