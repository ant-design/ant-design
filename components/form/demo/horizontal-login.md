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

const HorizontalLoginForm = () => {
  const [, forceUpdate] = React.useState();

  // To disabled submit button at the beginning.
  React.useEffect(() => {
    forceUpdate({});
  }, []);

  const onFinish = values => {
    console.log('Finish:', values);
  };

  return (
    <Form name="horizontal_login" layout="inline" onFinish={onFinish}>
      <Form.Item
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input
          prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
          placeholder="Username"
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input
          prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item shouldUpdate={true}>
        {(_, __, { getFieldsError, isFieldsTouched }) => (
          <Button
            type="primary"
            htmlType="submit"
            disabled={
              !isFieldsTouched(true) ||
              getFieldsError().filter(({ errors }) => errors.length).length
            }
          >
            Log in
          </Button>
        )}
      </Form.Item>
    </Form>
  );
};

ReactDOM.render(<HorizontalLoginForm />, mountNode);
```
