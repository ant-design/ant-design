import React from 'react';
import { Divider, Form, Input } from 'antd';

const App: React.FC = () => (
  <>
    <Divider plain>input</Divider>
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
    <Divider plain>input.TextArea</Divider>
    <Form
      name="layout-multiple-horizontal-textarea"
      layout="horizontal"
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 20 }}
    >
      <Form.Item label="horizontal" name="horizontalTextArea" rules={[{ required: true }]}>
        <Input.TextArea rows={5} />
      </Form.Item>
      <Form.Item
        layout="vertical"
        label="vertical"
        name="verticalTextArea"
        rules={[{ required: true }]}
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
      >
        <Input.TextArea rows={5} />
      </Form.Item>
    </Form>
    <br />
    <Form
      name="layout-multiple-vertical-textarea"
      layout="vertical"
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 20 }}
    >
      <Form.Item label="vertical" name="verticalTextArea" rules={[{ required: true }]}>
        <Input.TextArea rows={5} />
      </Form.Item>
      <Form.Item
        layout="horizontal"
        label="horizontal"
        name="horizontalTextArea"
        rules={[{ required: true }]}
      >
        <Input.TextArea rows={5} />
      </Form.Item>
    </Form>
  </>
);

export default App;
