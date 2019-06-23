---
order: 0
title:
  zh-CN: 水平登录栏
  en-US: Horizontal Login Form
---

## zh-CN

水平登录栏，常用在顶部导航栏中。

## en-US

Horizontal login form is often used in navigation bar.

```tsx
import { Form, Icon, Input, Button } from 'antd';

interface FieldProps {
  name: string;
}

const HorizontalLoginForm = () => {
  const onFinish = values => {
    console.log('Finish:', values);
  };

  return (
    <Form layout="inline" onFinish={onFinish}>
      DDDD2333
    </Form>
  );
};

ReactDOM.render(<HorizontalLoginForm />, mountNode);
```
