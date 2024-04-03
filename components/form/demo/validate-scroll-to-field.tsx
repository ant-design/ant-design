import React from 'react';
import { Button, Flex, Form, Input, Upload } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import type { TextAreaProps } from 'antd/es/input';

const IDPropDrillingTextArea = (props: Pick<TextAreaProps, 'id' | 'value' | 'onChange'>) => {
  const { id, value, onChange } = props;
  return (
    <div id={id}>
      <Input.TextArea placeholder="Please input bar" value={value} onChange={onChange} rows={8} />
    </div>
  );
};

const RefForwardTextArea = React.forwardRef<
  HTMLDivElement,
  Pick<TextAreaProps, 'value' | 'onChange'>
>((props, ref) => {
  const { value, onChange } = props;
  return (
    <div ref={ref}>
      <Input.TextArea placeholder="Please input baz" value={value} onChange={onChange} rows={8} />
    </div>
  );
});

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

      <Form.Item name="demo-form_foo" label="Foo">
        <Input />
      </Form.Item>

      <Form.Item name="demo-form_bar" label="Bar" rules={[{ required: true }]}>
        <IDPropDrillingTextArea />
      </Form.Item>

      <Form.Item name="demo-form_baz" label="Baz" rules={[{ required: true }]}>
        <RefForwardTextArea />
      </Form.Item>

      <Form.Item label="Dragger">
        <Form.Item
          name="demo-form_dragger"
          valuePropName="fileList"
          getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
          rules={[{ required: true }]}
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
