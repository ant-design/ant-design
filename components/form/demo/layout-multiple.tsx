import React from 'react';
import { Divider, Form, Input } from 'antd';

const App: React.FC = () => (
  <Form name="layout-multiple" style={{ maxWidth: 600 }} autoComplete="off" noLayout>
    <Divider orientation="left" plain>
      horizontal
    </Divider>
    <Form.Layout layout="horizontal" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
      <Form.Item label="horizontal" name="horizontal" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
    </Form.Layout>
    <Divider orientation="left" plain>
      vertical
    </Divider>
    <Form.Layout layout="vertical">
      <Form.Item label="vertical" name="vertical" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
    </Form.Layout>
    <Divider orientation="left" plain>
      inline
    </Divider>
    <Form.Layout layout="inline">
      <Form.Item label="inline" name="inline" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item label="inline2" name="inline2" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
    </Form.Layout>
  </Form>
);

export default App;
