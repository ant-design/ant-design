import { Progress, Space } from 'antd';
import React from 'react';

const App: React.FC = () => (
  <>
    <Space direction="vertical">
      <Progress percent={50} />
      <Progress percent={50} size="small" />
      <Progress percent={50} size={[300, 20]} />
    </Space>
    <br />
    <br />
    <Space size={30}>
      <Progress type="circle" percent={50} />
      <Progress type="circle" percent={50} size="small" />
      <Progress type="circle" percent={50} size={20} />
    </Space>
    <br />
    <br />
    <Space size={30}>
      <Progress type="dashboard" percent={50} />
      <Progress type="dashboard" percent={50} size="small" />
      <Progress type="dashboard" percent={50} size={20} />
    </Space>
    <br />
    <br />
    <Space size={30} wrap>
      <Progress steps={3} percent={50} />
      <Progress steps={3} percent={50} size="small" />
      <Progress steps={3} percent={50} size={20} />
      <Progress steps={3} percent={50} size={[20, 30]} />
    </Space>
  </>
);

export default App;
