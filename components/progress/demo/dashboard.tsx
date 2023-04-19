import React from 'react';
import { Progress, Space } from 'antd';

const App = () => (
  <Space wrap>
    <Progress type="dashboard" percent={75} />
    <Progress type="dashboard" percent={75} gapDegree={30} />
  </Space>
);

export default App;
