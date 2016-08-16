---
order: 4
title: 
  zh-CN: 自定义
  en-US: Custom
---

## zh-CN

自定义关闭按钮的样式和文字。

## en-US

To customize the style or font of the close button.

````jsx
import { Button, notification } from 'antd';

const close = function () {
  console.log('I am closed by the default close button.');
};

const openNotification = function () {
  const key = `open${Date.now()}`;
  const btnClick = function () {
    // to hide notification box
    notification.close(key);
  };
  const btn = (
    <Button type="primary" size="small" onClick={btnClick}>
      To speicify a function that will be called after clicking the close button
    </Button>
  );
  notification.open({
    message: 'This is the title',
    description: 'This is the content of the notification.This is the content of the notification.This is the content of the notification.',
    btn,
    key,
    onClose: close,
  });
};

ReactDOM.render(
  <div>
    <Button type="primary" onClick={openNotification}>Open the notification box</Button>
  </div>,
mountNode);
````
