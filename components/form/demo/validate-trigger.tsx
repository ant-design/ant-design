import React from 'react';
import { Form, Input } from 'antd';

const App: React.FC = () => (
  <Form name="trigger" style={{ maxWidth: 600 }} layout="vertical" autoComplete="off">
    <Form.Item label="Field A" name="field_a" validateTrigger="onBlur" rules={[{ required: true }]}>
      <Input placeholder="Validate required onBlur" />
    </Form.Item>

    <Form.Item label="Field B" name="field_b" validateDebounce={1000} rules={[{ required: true }]}>
      <Input placeholder="Validate required debounce after 1s" />
    </Form.Item>

    <Form.Item
      label="Field C"
      name="field_c"
      validateFirst
      rules={[
        { required: true, message: 'This message will show when failed' },
        { required: true, message: 'This message will never show' },
      ]}
    >
      <Input placeholder="Validate required one by one" />
    </Form.Item>
  </Form>
);

export default App;
