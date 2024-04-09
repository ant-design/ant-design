import React from 'react';
import { ConfigProvider, Popconfirm } from 'antd';

// @ts-ignore
const { _InternalPanelDoNotUseOrYouWillBeFired: InternalPopconfirm } = Popconfirm;

const App: React.FC = () => (
  <ConfigProvider theme={{ token: { wireframe: true } }}>
    <InternalPopconfirm title="Are you OK?" />
    <InternalPopconfirm title="Are you OK?" placement="bottomRight" style={{ width: 250 }} />
  </ConfigProvider>
);

export default App;
