---
order: 5
title:
  zh-CN: 信息提示
  en-US: Information modal dialog
---

## zh-CN

各种类型的信息提示，只提供一个按钮用于关闭。

## en-US

In the various types of information modal dialog, only one button to close dialog is provided.

```tsx
import { Button, Modal, Space } from 'antd';
import React from 'react';

const info = () => {
  Modal.info({
    title: 'This is a notification message',
    content: (
      <div>
        <p>some messages...some messages...</p>
        <p>some messages...some messages...</p>
      </div>
    ),
    onOk() {},
  });
};

const success = () => {
  Modal.success({
    content: 'some messages...some messages...',
  });
};

const error = () => {
  Modal.error({
    title: 'This is an error message',
    content: 'some messages...some messages...',
  });
};

const warning = () => {
  Modal.warning({
    title: 'This is a warning message',
    content: 'some messages...some messages...',
  });
};

const App: React.FC = () => (
  <Space wrap>
    <Button onClick={info}>Info</Button>
    <Button onClick={success}>Success</Button>
    <Button onClick={error}>Error</Button>
    <Button onClick={warning}>Warning</Button>
  </Space>
);

export default App;
```
