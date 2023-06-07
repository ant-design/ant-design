import { DownloadOutlined } from '@ant-design/icons';
import { Button, Form } from 'antd';
import React from 'react';

const App: React.FC = () => (
  <Form.Item>
    <Button size="large" shape="round" block style={{ marginBottom: 12 }}>
      Submit
    </Button>
    <Button size="large" shape="round" icon={<DownloadOutlined />} />
  </Form.Item>
);

export default App;
