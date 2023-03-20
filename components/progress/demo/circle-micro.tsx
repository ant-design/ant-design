import React from 'react';
import { Progress } from 'antd';

const App: React.FC = () => (
  <>
    <Progress
      type="circle"
      trailColor="#e6f4ff"
      percent={60}
      strokeWidth={20}
      size={14}
      format={(number) => `进行中，已完成${number}%`}
    />
    <span style={{ marginLeft: 8 }}>代码发布</span>
  </>
);

export default App;
