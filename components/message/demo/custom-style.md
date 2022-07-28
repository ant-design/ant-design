---
order: 6
title:
  zh-CN: 自定义样式
  en-US: Customized style
---

## zh-CN

使用 `style` 和 `className` 来定义样式。

## en-US

The `style` and `className` are available to customize Message.

```tsx
import { Button, message } from 'antd';
import React from 'react';

const success = () => {
  message.success({
    content: 'This is a prompt message with custom className and style',
    className: 'custom-class',
    style: {
      marginTop: '20vh',
    },
  });
};

const App: React.FC = () => <Button onClick={success}>Customized style</Button>;

export default App;
```
