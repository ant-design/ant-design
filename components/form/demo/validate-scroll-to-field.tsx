import React from 'react';
import { Button, Flex, Form, Input } from 'antd';

interface CustomInputProps {
  id?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const customInputStyle: React.CSSProperties = {
  width: '280px',
  height: '6rem',
  marginBlockEnd: '1rem',
};

/**
 * A custom input component that accepts `id`, `value` and `onChange` props.
 */
const IDPropDrillingInput = (props: CustomInputProps) => {
  const { id, value, onChange } = props;
  return <input id={id} value={value} onChange={onChange} style={customInputStyle} />;
};

/**
 * A custom input component that accepts `value` and `onChange` props, and forwards ref to the input element.
 * Support for locating ref elements through forwarding since 5.17.0
 */
const RefForwardInput = React.forwardRef<HTMLInputElement, CustomInputProps>((props, ref) => {
  const { /** omit id */ value, onChange } = props;
  return <input value={value} onChange={onChange} ref={ref} style={customInputStyle} />;
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
    >
      <Form.Item>
        <Flex gap="small">
          <Button type="primary" htmlType="submit">
            Top Submit
          </Button>
          <Button onClick={() => form.scrollToField('demo-form_baz')}>Scroll to Baz</Button>
        </Flex>
      </Form.Item>

      <Flex vertical gap={180}>
        <Form.Item name="demo-form_foo" label="Foo" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item
          name="demo-form_bar"
          label="Bar"
          rules={[{ required: true }]}
          tooltip="This input box will be located by id."
        >
          <IDPropDrillingInput />
        </Form.Item>

        <Form.Item
          name="demo-form_baz"
          label="Baz"
          rules={[{ required: true }]}
          tooltip="Slide to this input box, it will be located by ref."
        >
          <RefForwardInput />
        </Form.Item>
      </Flex>

      <Form.Item>
        <Flex gap="small">
          <Button type="primary" htmlType="submit">
            Bottom Submit
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
