import React from 'react';
import { Alert, Form, Input } from 'antd';

const App: React.FC = () => (
  <Form name="trigger" style={{ maxWidth: 600 }} layout="vertical" autoComplete="off">
    <Alert message="Use 'max' rule, continue type chars to see it" />

    <Form.Item
      hasFeedback
      label="Field A"
      name="field_a"
      validateTrigger="onBlur"
      rules={[{ max: 3 }]}
    >
      <Input placeholder="Validate required onBlur" />
    </Form.Item>

    <Form.Item
      hasFeedback
      label="Field B"
      name="field_b"
      validateDebounce={1000}
      rules={[{ max: 3 }]}
    >
      <Input placeholder="Validate required debounce after 1s" />
    </Form.Item>

    <Form.Item
      hasFeedback
      label="Field C"
      name="field_c"
      validateFirst
      rules={[{ max: 6 }, { max: 3, message: 'Continue input to exceed 6 chars' }]}
    >
      <Input placeholder="Validate one by one" />
    </Form.Item>
  </Form>
);

export default App;
