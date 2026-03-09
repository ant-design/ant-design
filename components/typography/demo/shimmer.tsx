import React from 'react';
import { Space, Typography } from 'antd';

const App: React.FC = () => (
  <Space vertical>
    <Typography.Shimmer>Thinking...</Typography.Shimmer>
    <Typography.Shimmer duration={3}>Slow shimmer effect</Typography.Shimmer>
    <Typography.Shimmer duration={0.5}>Fast shimmer effect</Typography.Shimmer>
    <Typography.Shimmer disabled>Disabled shimmer (no animation)</Typography.Shimmer>
    <Typography.Shimmer component="div">Render as div</Typography.Shimmer>
  </Space>
);

export default App;