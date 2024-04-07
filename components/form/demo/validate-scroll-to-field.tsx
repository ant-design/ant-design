import React from 'react';
import { Button, Flex, Form, Input, Upload } from 'antd';
import { InboxOutlined } from '@ant-design/icons';

const App = () => {
  const [form] = Form.useForm();

  return (
    <Form
      form={form}
      scrollToFirstError
      onFinish={console.log}
      onFinishFailed={console.error}
      style={{ padding: '2rem 4rem' }}
      layout="vertical"
    >
      <Form.Item>
        <Button onClick={() => form.scrollToField('demo-form_dragger')}>Scroll to Upload</Button>
      </Form.Item>

      <Form.Item name="demo-form_foo" label="Foo" rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <Form.Item name="demo-form_bar" label="Bar">
        <Input.TextArea placeholder="Please input bar" rows={4} />
      </Form.Item>

      <Form.Item name="demo-form_baz" label="Baz" rules={[{ required: true }]}>
        <Input.TextArea placeholder="Please input baz" rows={6} />
      </Form.Item>

      <Form.Item label="Dragger">
        <Form.Item
          name="demo-form_dragger"
          valuePropName="fileList"
          getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
          noStyle
        >
          <Upload.Dragger name="files" action="/upload.do">
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">Click or drag file to this area to upload</p>
            <p className="ant-upload-hint">Support for a single or bulk upload.</p>
          </Upload.Dragger>
        </Form.Item>
      </Form.Item>

      <Form.Item>
        <Flex gap="small">
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
          <Button danger onClick={() => form.resetFields()}>
            Reset
          </Button>
        </Flex>
      </Form.Item>
    </Form>
  );
};

export default App;
