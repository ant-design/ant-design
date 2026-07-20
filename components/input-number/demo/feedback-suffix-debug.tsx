import React from 'react';
import { Form, InputNumber } from 'antd';

const App: React.FC = () => (
  <Form layout="vertical" style={{ maxWidth: 320 }}>
    <Form.Item label="Suffix with feedback" validateStatus="success" hasFeedback>
      <InputNumber defaultValue={100} suffix="RMB" style={{ width: '100%' }} />
    </Form.Item>
  </Form>
);

export default App;
