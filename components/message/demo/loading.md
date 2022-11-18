---
order: 3
title:
  zh-CN: 加载中
  en-US: Message with loading indicator
---

## zh-CN

进行全局 loading，异步自行移除。

## en-US

Display a global loading indicator, which is dismissed by itself asynchronously.

```tsx
import { Button, message, Space } from 'antd';
import React from 'react';

const success = () => {
  const hide = message.loading('Action in progress..', 0, () => {
    message.success('loading had closed');
  });
  // Dismiss manually and asynchronously
  setTimeout(hide, 2500);
};

const success2 = () => {
  message.loading('Action in progress..', 3, () => {
    message.success('loading had closed');
  });
};

const App: React.FC = () => (
  <Space>
    <Button onClick={success}>Display a loading indicator</Button>
    <Button onClick={success2}>Display a loading and auto hide</Button>
  </Space>
);

export default App;
```
