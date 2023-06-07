import { Progress, Space } from 'antd';
import React from 'react';

const App: React.FC = () => (
  <Space wrap>
    <Progress type="dashboard" percent={75} />
    <Progress type="dashboard" percent={75} gapDegree={30} />
  </Space>
);

export default App;
