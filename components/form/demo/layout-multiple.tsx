import React from 'react';
import { Form, Input } from 'antd';

const App: React.FC = () => (
  <>
    <Form
      name="layout-multiple-horizontal"
      layout="horizontal"
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 20 }}
    >
      <Form.Item label="horizontal" name="horizontal" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item
        layout="vertical"
        label="vertical"
        name="vertical"
        rules={[{ required: true }]}
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
      >
        <Input />
      </Form.Item>
    </Form>
    <br />
    <Form
      name="layout-multiple-vertical"
      layout="vertical"
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 20 }}
    >
      <Form.Item label="vertical" name="vertical" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item
        layout="horizontal"
        label="horizontal"
        name="horizontal"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
    </Form>
  </>
);

export default App;
