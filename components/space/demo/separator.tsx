import React from 'react';
import { Divider, Space, Typography } from 'antd';

const App: React.FC = () => (
  <Space separator={<Divider vertical />}>
    <Typography.Link>Link</Typography.Link>
    <Typography.Link>Link</Typography.Link>
    <Typography.Link>Link</Typography.Link>
  </Space>
);

export default App;
