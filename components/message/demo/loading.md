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
import { Button, message } from 'antd';
import React from 'react';

const success = () => {
  const hide = message.loading('Action in progress..', 0);
  // Dismiss manually and asynchronously
  setTimeout(hide, 2500);
};

const App: React.FC = () => <Button onClick={success}>Display a loading indicator</Button>;

export default App;
```
