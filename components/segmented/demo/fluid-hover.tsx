import React from 'react';
import { Segmented, Space } from 'antd';

const App: React.FC = () => (
  <Space direction="vertical">
    <Segmented
      hoverMotion="fluid"
      options={['Daily', 'Weekly', 'Monthly', 'Quarterly', 'Yearly']}
    />
    <Segmented
      hoverMotion="fluid"
      options={['Daily', { label: 'Weekly', value: 'Weekly', disabled: true }, 'Monthly']}
    />
    <Segmented
      hoverMotion="fluid"
      vertical
      options={['Daily', 'Weekly', 'Monthly', 'Quarterly', 'Yearly']}
    />
  </Space>
);

export default App;
