---
order: 4
title:
  zh-CN: Promise 接口
  en-US: Promise interface
---

## zh-CN

可以通过 then 接口在关闭后运行 callback 。以上用例将在每个 message 将要结束时通过 then 显示新的 message 。

## en-US

`message` provides a promise interface for `onClose`. The above example will display a new message when the old message is about to close.

```tsx
import { Button, message } from 'antd';
import React from 'react';

const App: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const success = () => {
    messageApi
      .open({
        type: 'loading',
        content: 'Action in progress..',
        duration: 2.5,
      })
      .then(() => message.success('Loading finished', 2.5))
      .then(() => message.info('Loading finished', 2.5));
  };

  return (
    <>
      {contextHolder}
      <Button onClick={success}>Display sequential messages</Button>
    </>
  );
};

export default App;
```
