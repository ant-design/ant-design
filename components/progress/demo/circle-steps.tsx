import { Progress, Space } from 'antd';
import React from 'react';

const App: React.FC = () => (
  <Space wrap>
    <Progress
      type="dashboard"
      steps={8}
      percent={50}
      trailColor="rgba(0, 0, 0, 0.06)"
      strokeWidth={20}
    />
    <Progress
      type="circle"
      percent={100}
      steps={{
        count: 5,
        space: 12,
      }}
      trailColor="rgba(0, 0, 0, 0.06)"
      strokeWidth={20}
    />
  </Space>
);

export default App;
