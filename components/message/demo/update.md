---
order: 5
title:
  zh-CN: 更新消息内容
  en-US: Update Message Content
---

## zh-CN

可以通过唯一的 key 来更新内容。

## en-US

Update message content with unique key.

```jsx
import { Button, message } from 'antd';

const key = 'updatable';

const openMessage = () => {
  message.open({
    key,
    content: 'Original Title',
  });
  setTimeout(() => {
    message.open({
      key,
      content: 'New Title',
    });
  }, 1000);
};

ReactDOM.render(
  <Button type="primary" onClick={openMessage}>
    Open the message box
  </Button>,
  mountNode,
);
```
