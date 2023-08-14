import React from 'react';
import { Button, Form, Input } from 'antd';

const App: React.FC = () => (
  <Form
    name="wrap"
    labelCol={{ flex: '110px' }}
    labelAlign="left"
    labelWrap
    wrapperCol={{ flex: 1 }}
    colon={false}
    style={{ maxWidth: 600 }}
  >
    <Form.Item label="Normal label" name="username" rules={[{ required: true }]}>
      <Input />
    </Form.Item>

    <Form.Item label="A super long label text" name="password" rules={[{ required: true }]}>
      <Input />
    </Form.Item>

    <Form.Item label=" ">
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>
  </Form>
);

export default App;
