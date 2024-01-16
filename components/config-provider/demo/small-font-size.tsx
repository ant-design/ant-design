/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { Alert, Button, ConfigProvider, Space } from 'antd';

const App: React.FC = () => (
  <>
    {/* <ConfigProvider componentSize="small" theme={{ token: { experimentSmallFontSize: 12 } }}>
      <Button type="primary">Primary Button</Button>
      <Alert message="Success Text" description="desc" type="success" />
      <Space.Compact block>
        <Button type="primary">Button 1</Button>
        <Button type="primary">Button 2</Button>
      </Space.Compact>
    </ConfigProvider>
    <br />
    <ConfigProvider theme={{ token: { experimentSmallFontSize: 12 } }}>
      <Button type="primary">Primary Button</Button>
      <Button size="small">Small Button</Button>
      <Space.Compact block>
        <Button type="primary">Button 1</Button>
        <Button size="small">Button 2</Button>
      </Space.Compact>
    </ConfigProvider> */}
    <ConfigProvider theme={{ token: { experimentSmallFontSize: 12 } }}>
      <ConfigProvider componentSize="small">
        <Button size="small">Small Button</Button>
      </ConfigProvider>
      <ConfigProvider componentSize="middle">
        <Button type="primary">Primary Button</Button>
      </ConfigProvider>
    </ConfigProvider>

    {/* <ConfigProvider componentSize="small" theme={{ token: { experimentSmallFontSize: 12 } }}>
      <Alert description="desc" type="success" />
    </ConfigProvider>
    <ConfigProvider componentSize="small" theme={{ token: { experimentSmallFontSize: 13 } }}>
      <Alert description="desc" type="success" />
    </ConfigProvider> */}
  </>
);

export default App;
