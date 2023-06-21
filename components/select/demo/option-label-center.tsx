import React from 'react';
import { Select, Space, Typography } from 'antd';

const App: React.FC = () => (
  <Space wrap>
    <Select
      defaultValue="long, long, long piece of text"
      style={{ width: 120 }}
      allowClear
      options={[
        { value: 'long', label: <Typography>long, long, long piece of text</Typography> },
        { value: 'short', label: <Typography>short</Typography> },
      ]}
    />
  </Space>
);

export default App;
