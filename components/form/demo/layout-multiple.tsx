import React from 'react';
import { Divider, Form, Input } from 'antd';

const App: React.FC = () => (
  <>
    <Form name="layout-multiple-horizontal" layout="horizontal">
      <Form.Item
        label="horizontal"
        name="horizontal"
        rules={[{ required: true }]}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
      >
        <Input />
      </Form.Item>
      <Form.Item layout="vertical" label="vertical" name="vertical" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item layout="vertical" label="vertical2" name="vertical2" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
    </Form>
    <Divider />
    <Form name="layout-multiple-vertical" layout="vertical">
      <Form.Item label="vertical" name="vertical" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item label="vertical2" name="vertical2" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item
        layout="horizontal"
        label="horizontal"
        name="horizontal"
        rules={[{ required: true }]}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
      >
        <Input />
      </Form.Item>
    </Form>
  </>
);

export default App;
