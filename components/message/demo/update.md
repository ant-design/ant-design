---
order: 5
title:
  zh-CN: 更新消息内容
  en-US: Update Message Content
---

## zh-CN

可以通过唯一的 `key` 来更新内容。

## en-US

Update message content with unique `key`.

```jsx
import { Button, message } from 'antd';

const key = 'updatable';

const openMessage = () => {
  message.loading({ content: 'Loading...', key });
  setTimeout(() => {
    message.success({ content: 'Loaded!', key, duration: 2 });
  });
};

ReactDOM.render(
  <Button type="primary" onClick={openMessage}>
    Open the message box
  </Button>,
  mountNode,
);
```
