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

````jsx
import { Button, notification } from 'antd';

const close = () => {
  console.log('Notification was closed. Either the close button was clicked or duration time elapsed.');
};

const openNotification = () => {
  const key = `open${Date.now()}`;
  const btnClick = function () {
    // to hide notification box
    notification.close(key);
  };
  const btn = (
    <Button type="primary" size="small" onClick={btnClick}>
      我知道了
    </Button>
  );
  notification.open({
    message: '上传成功',
    description: '共 86 条有效数据，其中 0 条重复数据已自动合并。',
    btn,
    key,
    onClose: close,
  });
};

ReactDOM.render(
  <Button type="primary" onClick={openNotification}>Open the notification box</Button>
, mountNode);
````
