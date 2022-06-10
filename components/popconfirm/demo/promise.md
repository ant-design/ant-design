---
order: 7
version: 4.17.0
title:
  zh-CN: 基于 Promise 的异步关闭
  en-US: Asynchronously close on Promise
---

## zh-CN

点击确定后异步关闭 Popconfirm，例如提交表单。

## en-US

Asynchronously close a popconfirm when the OK button is pressed. For example, you can use this pattern when you submit a form.

```tsx
import { Button, Popconfirm } from 'antd';
import React from 'react';

const App: React.FC = () => {
  const confirm = () =>
    new Promise(resolve => {
      setTimeout(() => resolve(null), 3000);
    });

  return (
    <Popconfirm
      title="Title"
      onConfirm={confirm}
      onVisibleChange={() => console.log('visible change')}
    >
      <Button type="primary">Open Popconfirm with Promise</Button>
    </Popconfirm>
  );
};

export default App;
```
