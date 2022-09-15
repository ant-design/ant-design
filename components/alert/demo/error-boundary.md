---
order: 8
title:
  zh-CN: React 错误处理
  en-US: ErrorBoundary
---

## zh-CN

友好的 [React 错误处理](https://reactjs.org/blog/2017/07/26/error-handling-in-react-16.html) 包裹组件。

## en-US

ErrorBoundary Component for making error handling easier in [React](https://reactjs.org/blog/2017/07/26/error-handling-in-react-16.html).

```tsx
import { Alert, Button } from 'antd';
import React, { useState } from 'react';

const { ErrorBoundary } = Alert;
const ThrowError: React.FC = () => {
  const [error, setError] = useState<Error>();
  const onClick = () => {
    setError(new Error('An Uncaught Error'));
  };

  if (error) {
    throw error;
  }
  return (
    <Button danger onClick={onClick}>
      Click me to throw a error
    </Button>
  );
};

const App: React.FC = () => (
  <ErrorBoundary>
    <ThrowError />
  </ErrorBoundary>
);

export default App;
```
