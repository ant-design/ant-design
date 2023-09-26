import React from 'react';
import { ConfigProvider, Progress, Space } from 'antd';

const App: React.FC = () => (
  <ConfigProvider
    theme={{
      token: {
        marginXXS: 20,
        fontSizeSM: 24,
      },
      components: {
        Progress: {
          defaultColor: '#bae0ff',
          remainingColor: '#f5222d',
          colorText: '#52c41a',
          circleTextColor: '#52c41a',
          lineBorderRadius: 50,
        },
      },
    }}
  >
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
  </ConfigProvider>
);

export default App;
