import React from 'react';
import {
  HomeOutlined,
  LoadingOutlined,
  SettingFilled,
  SmileOutlined,
  SyncOutlined,
} from '@ant-design/icons';
import { ConfigProvider, Space } from 'antd';

const App: React.FC = () => (
  <ConfigProvider iconPrefixCls="hitu-icon">
    <Space>
      <HomeOutlined />
      <SettingFilled />
      <SmileOutlined />
      <SyncOutlined spin />
      <SmileOutlined rotate={180} />
      <LoadingOutlined />
    </Space>
  </ConfigProvider>
);

export default App;
