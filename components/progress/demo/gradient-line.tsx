import React from 'react';
import { Progress, Space } from 'antd';

const twoColors = { '0%': '#108ee9', '100%': '#87d068' };
const conicColors = { '0%': '#87d068', '50%': '#ffe58f', '100%': '#ffccc7' };

const App: React.FC = () => (
  <div style={{ display: 'flex', flexDirection: 'column', rowGap: 16 }}>
    <Progress percent={99.9} strokeColor={twoColors} />
    <Progress percent={99.9} status="active" strokeColor={{ from: '#108ee9', to: '#87d068' }} />
    <Space wrap>
      <Progress type="circle" percent={90} strokeColor={twoColors} />
      <Progress type="circle" percent={100} strokeColor={twoColors} />
      <Progress type="circle" percent={93} strokeColor={conicColors} />
    </Space>
    <Space wrap>
      <Progress type="dashboard" percent={90} strokeColor={twoColors} />
      <Progress type="dashboard" percent={100} strokeColor={twoColors} />
      <Progress type="dashboard" percent={93} strokeColor={conicColors} />
    </Space>
  </div>
);

export default App;
