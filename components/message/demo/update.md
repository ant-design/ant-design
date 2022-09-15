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

```tsx
import { Button, message } from 'antd';
import React from 'react';

const key = 'updatable';

const openMessage = () => {
  message.loading({ content: 'Loading...', key });
  setTimeout(() => {
    message.success({ content: 'Loaded!', key, duration: 2 });
  }, 1000);
};

const App: React.FC = () => (
  <Button type="primary" onClick={openMessage}>
    Open the message box
  </Button>
);

export default App;
```
