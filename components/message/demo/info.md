---
order: 0
title:
  zh-CN: 普通提示
  en-US: Normal prompt
---

## zh-CN

信息提醒反馈。

## en-US

Normal message for information.

```tsx
import { Button, message } from 'antd';
import React from 'react';

const App: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const info = () => {
    messageApi.open({
      type: 'info',
      content: 'This is a normal message',
    });
  };
  return (
    <>
      {contextHolder}
      <Button type="primary" onClick={info}>
        Display normal message
      </Button>
    </>
  );
};

export default App;
```
