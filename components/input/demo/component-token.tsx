import React from 'react';
import { ConfigProvider, Input } from 'antd';

const App: React.FC = () => (
  <ConfigProvider theme={{ token: { controlHeight: 28 } }}>
    <Input placeholder="Basic usage" />
  </ConfigProvider>
);

export default App;
