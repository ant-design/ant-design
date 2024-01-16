import React from 'react';
import { Alert, Button, ConfigProvider, Space } from 'antd';

const App: React.FC = () => (
  <>
    <ConfigProvider componentSize="small" theme={{ token: { experimentSmallFontSize: 12 } }}>
      <Button type="primary">Primary Button</Button>
      <Alert message="Success Text" description="desc" type="success" />
      <Space.Compact block>
        <Button type="primary">Button 1</Button>
        <Button type="primary">Button 2</Button>
      </Space.Compact>
    </ConfigProvider>
    <Alert message="Success Text" description="desc" type="success" />
  </>
);

export default App;
