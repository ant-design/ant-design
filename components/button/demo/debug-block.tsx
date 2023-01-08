import React from 'react';
import { Form, Button } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';

const App: React.FC = () => (
  <Form.Item>
    <Button size="large" shape="round" block style={{ marginBottom: 12 }}>
      Submit
    </Button>
    <Button size="large" shape="round" icon={<DownloadOutlined />} />
  </Form.Item>
);

export default App;
