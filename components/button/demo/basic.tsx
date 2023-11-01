import React from 'react';
import { Button, Flex, ConfigProvider } from 'antd';

const App: React.FC = () => (
  <Flex gap="small" wrap="wrap">
    <Button type="primary">Primary Button</Button>
    <Button>Default Button</Button>
    <Button type="dashed">Dashed Button</Button>
    <Button type="text">Text Button</Button>
    <Button type="link">Link Button</Button>
    <ConfigProvider theme={{ cssVar: { key: 'foo' } }}>
      <Button className="button-foo">Button</Button>
    </ConfigProvider>
    <ConfigProvider theme={{ cssVar: { key: 'bar', prefix: 'bar' } }}>
      <Button className="button-bar">Button</Button>
    </ConfigProvider>
  </Flex>
);

export default App;
