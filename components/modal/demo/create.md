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
import { Button, Modal, Space, Form, Input, message, Table } from 'antd';
import type { ColumnsType } from 'antd';
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
  const columns: ColumnsType<User> = [
    {
      title: 'Name',
      dataIndex: 'name',
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: 'Age',
      dataIndex: 'age',
    },
  ];

  const data: User[] = [
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
    {
      id: '4',
      name: 'Disabled User',
      age: 99,
    },
  ];

  const [selected, setSelected] = useState<User[]>([]);

  useImperativeHandle(ref, () => ({
    async validateFields(): Promise<User[]> {
      let msg: string | undefined;
      if (selected.length === 0) {
        msg = '至少选一个Sku';
      } else if (selected.reduce((a, c) => a + c.count, 0) <= 1) {
        msg = '总数量必须大于1';
      }
      if (msg) {
        message.error(msg);
        throw new Error(msg);
      }
      return selected;
    },
  }));
  return (
    <Table<User>
      columns={columns}
      dataSource={data}
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
        Modal.create<Row[]>({
          title: 'Select User',
          maskClosable: false,
          children: <CustomComponent />,
          async onOk(values) {
            console.log(`Selected User:`, values);
            await loginService(values);
            message.success('Submit successful');
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
