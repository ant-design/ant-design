---
order: 4
title:
  zh-CN: 动态创建
  en-US: Create dynamically
---

## zh-CN

使用 `create()` 可以快捷地创建一次性弹窗，无需维护 loading 和 visible。 onCancel/onOk 返回 promise 可以延迟关闭。 onOk 可以拿到内容组件传递的参数。

## en-US

Use `create()` to create a one-time modal dialog dynamically without maintenance loading and visible. Let onCancel/onOk function return a promise object to delay closing the dialog. onOK takes the parameters passed by the content component.

```tsx
import { Button, Modal, Space, Form, Input, message, Table } from 'antd';
import React, { forwardRef, useImperativeHandle, useState } from 'react';

type LoginPaylod = { username: string; password: string };

function loginService(data: LoginPaylod) {
  return fetch('https://httpbin.org/delay/1', {
    body: JSON.stringify(data),
    method: 'POST',
    mode: 'cors',
  });
}

interface User {
  id: React.Key;
  name: string;
  age: number;
}

const CustomComponent = forwardRef((props: IProps, ref) => {
  const [selected, setSelected] = useState<User[]>([]);

  useImperativeHandle(ref, () => ({
    async validateFields(): Promise<User[]> {
      if (selected.length === 0) {
        throw new Error('One at least');
      } else if (selected.length > 2) {
        throw new Error('Two at most');
      }
      return selected;
    },
  }));
  return (
    <Table<User>
      columns={[
        {
          title: 'Name',
          dataIndex: 'name',
          render: (text: string) => <a>{text}</a>,
        },
        {
          title: 'Age',
          dataIndex: 'age',
        },
      ]}
      dataSource={[
        {
          id: '1',
          name: 'John Brown',
          age: 32,
        },
        {
          id: '2',
          name: 'Jim Green',
          age: 42,
        },
        {
          id: '3',
          name: 'Joe Black',
          age: 32,
        },
      ]}
      pagination={false}
      rowKey="id"
      rowSelection={{
        type: 'multiple',
        selectedRowKeys: selected.map(user => user.id),
        onChange(keys, rows) {
          setSelected(rows);
        },
      }}
    />
  );
});

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
          maskClosable: false,
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
        });
      }}
    >
      With Form
    </Button>

    <Button
      onClick={() => {
        Modal.create<User[]>({
          title: 'Select Users',
          maskClosable: false,
          /* Same as children: <CustomComponent /> */
          render: formLikeRef => <CustomComponent ref={formLikeRef} />,
          async onOk(values) {
            console.log(`Selected Users:`, values);
            await loginService(values);
            message.success('Submit successful');
          },
          onFailed(error) {
            if (error instanceof Error) {
              message.error(error.message);
            }
          },
        });
      }}
    >
      Custom Component
    </Button>
  </Space>
);

export default App;
```
