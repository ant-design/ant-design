import { ConfigProvider, Form, Input } from 'antd';
import React from 'react';

const App: React.FC = () => (
  <ConfigProvider
    theme={{
      components: {
        Form: {
          labelRequiredMarkColor: 'pink',
          labelColor: 'green',
          labelFontSize: 16,
          labelHeight: 34,
          labelColonMarginInlineStart: 4,
          labelColonMarginInlineEnd: 12,
          itemMarginBottom: 18,
        },
      },
    }}
  >
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
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
  </ConfigProvider>
);

export default App;
