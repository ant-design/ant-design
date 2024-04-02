import React from 'react';
import { Button, Flex, Form, Input } from 'antd';

interface CustomInputProps {
  id?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const customInputStyle = {
  width: '280px',
  height: '3rem',
  padding: '0.5rem',
  fontSize: '1.2rem',
  border: '1px solid #d9d9d9',
  marginBottom: '0.5rem',
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
const RefForwardInput = React.forwardRef(
  (props: CustomInputProps, ref: React.Ref<HTMLInputElement>) => {
    const { /** omit id */ value, onChange } = props;
    return <input value={value} onChange={onChange} ref={ref} style={customInputStyle} />;
  },
);

const App = () => (
  <Form
    scrollToFirstError
    onFinish={console.log}
    onFinishFailed={console.error}
    style={{ padding: '2rem 4rem' }}
  >
    <Form.Item>
      <Button type="primary" htmlType="submit">
        Top Submit
      </Button>
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
      <Button type="primary" htmlType="submit">
        Bottom Submit
      </Button>
    </Form.Item>
  </Form>
);

export default App;
