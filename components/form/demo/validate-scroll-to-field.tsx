import React from 'react';
import { Button, Flex, Form, Input } from 'antd';

const App = () => {
  const [form] = Form.useForm();

  return (
    <Form form={form} scrollToFirstError style={{ padding: '2rem 4rem' }} layout="vertical">
      <Form.Item>
        <Button onClick={() => form.scrollToField('demo-form_baz')}>Scroll to Baz</Button>
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
