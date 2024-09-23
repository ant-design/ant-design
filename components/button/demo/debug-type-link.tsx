import React from 'react';
import { Button, ConfigProvider } from 'antd';

const App: React.FC = () => (
  <>
    <ConfigProvider theme={{ token: { colorPrimary: 'red' } }}>
      <Button type="link">Link Button</Button>
    </ConfigProvider>
    <Button type="link">Link Button</Button>
  </>
);

export default App;
