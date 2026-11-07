import React from 'react';
import { Button, ConfigProvider, Input, Space, theme } from 'antd';

const App: React.FC = () => (
  <ConfigProvider
    theme={{
      // 1. Use dark algorithm alone
      algorithm: theme.darkAlgorithm,

      // 2. Combine dark algorithm and compact algorithm
      // algorithm: [theme.darkAlgorithm, theme.compactAlgorithm],
    }}
  >
    <Space>
      <Input placeholder="Please Input" />
      <Button type="primary">Submit</Button>
    </Space>
  </ConfigProvider>
);

export default App;
