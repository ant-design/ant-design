---
order: 4
title:
  zh-CN: 动态创建
  en-US: Create dynamically
---

## zh-CN

使用 `create()` 可以快捷地创建弹窗。onCancel/onOk 返回 promise 可以延迟关闭。

## en-US

Use `create()` to create a modal dialog dynamically. Let onCancel/onOk function return a promise object to delay closing the dialog.

```tsx
import { Button, Modal, Space, Form, Input, message } from 'antd';
import React from 'react';

type LoginPaylod = { username: string; password: string };
function loginService(data: LoginPaylod) {
  return fetch('https://httpbin.org/delay/1', {
    body: JSON.stringify(data),
    method: 'POST',
    mode: 'cors',
  });
}

const App: React.FC = () => (
  <Space wrap>
    <Button
      onClick={() => {
        Modal.create({
          title: 'Some title',
          children: 'Some descriptions',
          onOk() {
            console.log('OK');
          },
          onCancel() {
            console.log('Cancel');
          },
        });
      }}
    >
      Basic
    </Button>

    <Button
      onClick={() => {
        Modal.create<LoginPaylod>({
          title: 'Login',
          children: (
            <Form
              name="login"
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 12 }}
              initialValues={{ username: 'antd' }}
              autoComplete="off"
            >
              <Form.Item
                label="Username"
                name="username"
                rules={[{ required: true, message: 'Please input your username!' }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
              >
                <Input.Password />
              </Form.Item>
            </Form>
          ),
          async onOk(values) {
            console.log(`Logging in with:`, values);
            await loginService(values);
            message.success('Login successful');
          },
          onCancel() {
            console.log('Cancel');
          },
        });
      }}
    >
      With Form
    </Button>
  </Space>
);

export default App;
```
