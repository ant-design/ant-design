import React from 'react';
import { Progress } from 'antd';

const App: React.FC = () => (
  <>
    <Progress percent={99.9} strokeColor={{ '0%': '#108ee9', '100%': '#87d068' }} />
    <Progress percent={99.9} status="active" strokeColor={{ from: '#108ee9', to: '#87d068' }} />
    <Progress type="circle" percent={90} strokeColor={{ '0%': '#108ee9', '100%': '#87d068' }} />
    <Progress
      type="circle"
      percent={100}
      style={{ marginLeft: 8 }}
      strokeColor={{ '0%': '#108ee9', '100%': '#87d068' }}
    />
  </>
);

export default App;
