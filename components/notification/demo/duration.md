# 自动关闭的延时

- order: 1

自定义通知框自动关闭的延时，默认`4.5s`，取消自动关闭只要将该值设为 `0` 即可。

---

````jsx
import { Button, notification } from 'antd';

const openNotification = function() {
  const args = {
    message: '这是标题',
    description: '我不会自动关闭，我不会自动关闭，我不会自动关闭，我不会自动关闭，我不会自动关闭，我不会自动关闭，我不会自动关闭',
    duration: 0
  };
  notification.open(args);
};

ReactDOM.render(
  <Button type="primary" onClick={openNotification}>打开通知提醒框</Button>
, document.getElementById('components-notification-demo-duration'));
````
