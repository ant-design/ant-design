import React from 'react';
import { Button, ConfigProvider } from 'antd';

const App: React.FC = () => (
  // layout
  <ConfigProvider theme={{ token: { colorPrimary: 'red' } }}>
    {/* page */}
    <ConfigProvider
      componentSize="small"
      theme={{ nextThemeEnd: true, token: { fontSize: 12, fontSizeSM: 12 } }}
    >
      <Button type="primary">font-size 12</Button>
      {/* other */}
      <ConfigProvider componentSize="middle" theme={{ token: { colorInfo: 'blue' } }}>
        <Button type="primary">font-size 14</Button>
      </ConfigProvider>
    </ConfigProvider>
  </ConfigProvider>
);

export default App;
